from flask import Flask, request, jsonify, Response, json, make_response
from models import db, User, Event, Organization, CarShare, Reservation
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash # Pour vérifier le mot de passe
import jwt # Pour générer un token JWT
import datetime # Pour définir l'expiration du token
from flask_migrate import Migrate

app = Flask(__name__)

app.config['SECRET_KEY'] = 'q#!0i^ik4dl2ipx5b(7=+^+l=#2krpfd^0x!5w*r83)f9428+('

IP = "192.168.1.120"

CORS(app, resources={r"/*": {"origins": "http://"+IP+":19006", "methods": ["GET", "POST", "OPTIONS", "DELETE"]}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@goteamgo-db:5432/mydb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

migrate = Migrate(app, db)

with app.app_context():
    db.create_all()


@app.route('/create_carshare', methods=['POST'])
def create_carshare():
    # Obtenez le token à partir de l'en-tête d'autorisation
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token is missing or invalid'}), 401
    token = auth_header.split(' ')[1]

    # Vérifiez si le token est présent
    if not token:
        return jsonify({'message': 'Token is missing'}), 401

    try:
        # Décoder le token
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = data['user_id']
    except:
        return jsonify({'message': 'Token is invalid'}), 401
    
    # Récupération des données envoyées par le client
    data = request.get_json()

    # Vous pouvez ajouter des validations ici si nécessaire
    
    # Création d'une nouvelle annonce avec les données reçues
    new_ad = CarShare(
        user_id=user_id,
        event_id=data['event_id'],
        direction=data['direction'],
        seats_available_aller=data['seats_available_aller'],
        seats_available_retour=data['seats_available_retour']
    )

    # Ajout de l'annonce à la base de données
    db.session.add(new_ad)
    db.session.commit()

    # Retourner une réponse au client
    return jsonify({"message": "Annonce créée avec succès!"}), 200

@app.route("/list_car_share/<int:event_id>", methods=['GET'])
def list_car_share(event_id):
    # Filter car_shares by event_id
    car_shares = db.session.query(CarShare, User).join(User, CarShare.user_id == User.id).filter(CarShare.event_id == event_id).all()
    
    result = []
    
    for car_share, user in car_shares:
        car_share_data = {
            "id": car_share.id,
            "user_id": car_share.user_id,
            "user_name": f"{user.nom} {user.prenom}",
            "event_id": car_share.event_id,
            "direction": car_share.direction,
            "seats_available_aller": car_share.seats_available_aller,
            "seats_available_retour": car_share.seats_available_retour,
            "created_at": car_share.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        result.append(car_share_data)
    
    return jsonify(result)

@app.route('/seats_available/<int:carshare_id>', methods=['GET'])
def get_carshare_seats_available(carshare_id):
    carshare = CarShare.query.get(carshare_id)
    
    if carshare:
        # Récupérer le propriétaire de la voiture partagée
        owner_id = carshare.user_id

        # Vérifier si c'est un trajet aller-retour, aller simple ou retour simple et renvoyer les sièges disponibles
        if carshare.direction == 'Aller-retour':
            # Peut renvoyer soit seats_available_aller ou seats_available_retour car ils sont identiques pour Aller-retour
            return jsonify({'seats_available': carshare.seats_available_aller, 'owner_id': owner_id}), 200
        elif carshare.direction == 'Aller':
            return jsonify({'seats_available': carshare.seats_available_aller, 'owner_id': owner_id}), 200
        elif carshare.direction == 'Retour':
            return jsonify({'seats_available': carshare.seats_available_retour, 'owner_id': owner_id}), 200
        else:
            return jsonify({'message': 'Direction invalide'}), 400
    else:
        return jsonify({'message': 'CarShare not found'}), 404
    

@app.route('/get_reservations/<int:car_share_id>', methods=['GET'])
def get_reservations(car_share_id):
    # Récupérer toutes les réservations pour le car_share_id donné
    reservations = Reservation.query.filter_by(car_share_id=car_share_id).all()

    # Convertir les réservations en un format JSON sérialisable
    reservations_list = []
    for res in reservations:
        user = User.query.get(res.user_id)
        reservation_info = {
            "id": res.id,
            "user_id": res.user_id,
            "car_share_id": res.car_share_id,
            "seats_reserved_aller": res.seats_reserved_aller,
            "seats_reserved_retour": res.seats_reserved_retour,
            "nom": user.nom if user else "",
            "prenom": user.prenom if user else ""
        }
        reservations_list.append(reservation_info)

    # Renvoyer la liste des réservations sous forme JSON avec la clé 'reservations'
    return jsonify({"reservations": reservations_list}), 200

@app.route('/delete_reservation/<int:reservation_id>', methods=['DELETE'])
def delete_reservation(reservation_id):
    reservation = Reservation.query.get(reservation_id)
    
    if reservation:
        print("Réservation trouvée: ", reservation)  # Log pour vérifier si la réservation est trouvée

        try:
            # Récupérer l'objet CarShare correspondant et réincrémenter les places disponibles
            car_share = CarShare.query.get(reservation.car_share_id)
            if car_share:
                if car_share.direction == "Aller":
                    car_share.seats_available_aller += reservation.seats_reserved_aller
                elif car_share.direction == "Retour":
                    car_share.seats_available_retour += reservation.seats_reserved_retour
                elif car_share.direction == "Aller-retour":
                    car_share.seats_available_aller += reservation.seats_reserved_aller
                    car_share.seats_available_retour += reservation.seats_reserved_retour
                else:
                    db.session.rollback()
                    return jsonify({'message': 'Invalid direction'}), 400
            else:
                db.session.rollback()
                return jsonify({'message': 'CarShare not found'}), 404

            # Suppression de la réservation
            db.session.delete(reservation)
            db.session.commit()
            return jsonify({'message': 'La réservation a été supprimée avec succès'}), 200
        except Exception as e:
            print("Erreur lors de la suppression: ", str(e))  # Log en cas d'erreur
            db.session.rollback()
            return jsonify({'message': 'Une erreur est survenue lors de la suppression de la réservation', 'error': str(e)}), 500
    else:
        return jsonify({'message': 'Réservation non trouvée'}), 404



    
@app.route('/create_reservation', methods=['POST'])
def create_reservation():
    data = request.get_json()
    user_id = data.get('user_id')
    car_share_id = data.get('car_share_id')
    seats_reserved_aller = data.get('seats_reserved_aller')
    seats_reserved_retour = data.get('seats_reserved_retour')
    
    # Créer une nouvelle réservation
    new_reservation = Reservation(
        user_id=user_id,
        car_share_id=car_share_id,
        seats_reserved_aller=seats_reserved_aller,
        seats_reserved_retour=seats_reserved_retour,
    )
    
    # Ajouter la réservation à la base de données
    db.session.add(new_reservation)

    # Récupérer l'objet CarShare correspondant et décrémenter les places disponibles
    car_share = CarShare.query.get(car_share_id)
    if car_share:
        if car_share.direction == "Aller":
            if car_share.seats_available_aller is not None:
                if car_share.seats_available_aller - seats_reserved_aller >= 0:
                    car_share.seats_available_aller -= seats_reserved_aller
                else:
                    db.session.rollback()
                    return jsonify({'message': 'Not enough seats available for Aller'}), 400
            else:
                db.session.rollback()
                return jsonify({'message': 'Seats available for Aller not initialized'}), 500
        elif car_share.direction == "Retour":
            if car_share.seats_available_retour is not None:
                if car_share.seats_available_retour - seats_reserved_retour >= 0:
                    car_share.seats_available_retour -= seats_reserved_retour
                else:
                    db.session.rollback()
                    return jsonify({'message': 'Not enough seats available for Retour'}), 400
            else:
                db.session.rollback()
                return jsonify({'message': 'Seats available for Retour not initialized'}), 500
        elif car_share.direction == "Aller-retour":
            if car_share.seats_available_aller is not None and car_share.seats_available_retour is not None:
                if car_share.seats_available_aller - seats_reserved_aller >= 0 and car_share.seats_available_retour - seats_reserved_retour >= 0:
                    car_share.seats_available_aller -= seats_reserved_aller
                    car_share.seats_available_retour -= seats_reserved_retour
                else:
                    db.session.rollback()
                    return jsonify({'message': 'Not enough seats available for Aller-Retour'}), 400
            else:
                db.session.rollback()
                return jsonify({'message': 'Seats available for Aller-Retour not initialized'}), 500
        else:
            db.session.rollback()
            return jsonify({'message': 'Invalid direction'}), 400
    else:
        db.session.rollback()
        return jsonify({'message': 'CarShare not found'}), 404

    # Commit des changements dans la base de données
    db.session.commit()

    # Renvoyer une réponse de succès
    return jsonify({'message': 'Reservation created successfully'}), 201






@app.route('/user_info', methods=['GET'])
def user_info():
    # Obtenez le token à partir de l'en-tête d'autorisation
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token is missing or invalid'}), 401
    token = auth_header.split(' ')[1]

    # Vérifiez si le token est présent
    if not token:
        return jsonify({'message': 'Token is missing'}), 401

    try:
        # Décoder le token
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = data['user_id']
    except:
        return jsonify({'message': 'Token is invalid'}), 401

    # Récupérez l'utilisateur de la base de données en utilisant l'ID utilisateur du token
    user = User.query.filter_by(id=user_id).first()

    # Vérifiez si l'utilisateur existe
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Récupérez l'organisation associée, si elle existe
    organization = None
    if user.organization_code:
        organization = Organization.query.filter_by(code=user.organization_code).first()

    # Renvoyez les informations de l'utilisateur sous forme de réponse JSON
    # Remarque: Ne renvoyez pas le mot de passe haché (ou toute forme de mot de passe)

    # Ajoutez les informations d'organisation à la réponse, si elles existent
    if organization:
        response = {
            'nom_organization': organization.nom,
            'user_id': user.id,
            'nom': user.nom,
            'prenom': user.prenom,
            'email': user.email,
            'organization_code': user.organization_code
        }
    else:
        response = {
        'nom': user.nom,
        'user_id': user.id,
        'prenom': user.prenom,
        'email': user.email,
    }

    return jsonify(response), 200

@app.route('/get_events', methods=['GET'])
def get_events():
    # Récupérer tous les événements de la base de données
    events = Event.query.all()

    # Créer une liste pour stocker les données des événements
    events_data = []

    # Itérer sur chaque événement et ajouter ses données à la liste
    for event in events:
        event_data = {
            'id': event.id,
            'nom': event.nom,
            'categorie': event.categorie,
            'lieu': event.lieu,
            'date': event.date,
            'heure': event.heure
        }
        events_data.append(event_data)

    # Retourner les données des événements sous forme de réponse JSON
    return jsonify(events_data), 200

@app.route('/join_organization', methods=['POST'])
def join_organization():
    # Récupérer le token de l'en-tête d'autorisation
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token is missing or invalid'}), 401
    token = auth_header.split(' ')[1]

    # Vérifier si le token est valide
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = data['user_id']
    except:
        return jsonify({'message': 'Token is invalid'}), 401

    # Récupérer l'utilisateur par user_id
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    # Récupérer le code d'organization de la requête
    data = request.json
    organization_code = data.get('codeOrganisation')

    print(organization_code)
    
    # Mettre à jour l'organization_code de l'utilisateur
    user.organization_code = organization_code
    db.session.commit()
    db.session.refresh(user)
    
    # Retourner une réponse de succès
    return jsonify({'message': 'Organization code updated successfully', 'organization_code': user.organization_code}), 200


@app.route('/update_profile', methods=['POST'])
def update_profile():
    # Récupérer le token à partir de l'en-tête d'autorisation
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token is missing or invalid'}), 401
    token = auth_header.split(' ')[1]

    # Vérifier si le token est valide
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = data['user_id']
    except:
        return jsonify({'message': 'Token is invalid'}), 401

    # Récupérer l'utilisateur à partir de la base de données en utilisant l'ID utilisateur du token
    user = User.query.filter_by(id=user_id).first()

    # Vérifier si l'utilisateur existe
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Récupérer les données de la requête
    data = request.get_json()
    new_nom = data.get('nom')
    new_prenom = data.get('prenom')
    new_email = data.get('email')

    # Mettre à jour les informations de l'utilisateur dans la base de données
    user.nom = new_nom
    user.prenom = new_prenom
    user.email = new_email
    db.session.commit()

    # Retourner une réponse indiquant que la mise à jour a réussi
    return jsonify({'message': 'Profile updated successfully'}), 200



@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Hacher le mot de passe
    password_hash = generate_password_hash(data['password'], method='sha256')
    
    # Créer un nouvel utilisateur avec le mot de passe haché
    new_user = User(
        nom=data['nom'],
        prenom=data['prenom'],
        email=data['email'],
        password_hash=password_hash
    )
    
    # Insérer le nouvel utilisateur dans la base de données
    db.session.add(new_user)
    db.session.commit()
    
    # Retourner une réponse réussie
    return jsonify({'message': 'Inscription réussie'}), 201

@app.route('/create_event', methods=['POST'])
def create_event():
    data = request.get_json()
    
    # Créer un nouvel utilisateur avec le mot de passe haché
    new_event = Event(
        nom=data['nom'],
        categorie=data['categorie'],
        lieu=data['lieu'],
        date=data['date'],
        heure=data['heure']
    )
    
    # Insérer le nouvel utilisateur dans la base de données
    db.session.add(new_event)
    db.session.commit()
    
    # Retourner une réponse réussie
    return jsonify({'message': 'Evenement créer avec succes'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    # Trouver l'utilisateur par email
    user = User.query.filter_by(email=email).first()

    # Vérifier si l'utilisateur existe et si le mot de passe est correct
    if user and check_password_hash(user.password_hash, password):
        # L'utilisateur est authentifié avec succès
        
        # Générer un token JWT
        token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({'token': token}), 200
    else:
        # L'authentification a échoué
        return jsonify({'message': 'Email ou mot de passe incorrect'}), 401
    

@app.route('/update_password', methods=['POST'])
def update_password():
    # Récupérer le token à partir de l'en-tête d'autorisation
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token is missing or invalid'}), 401
    token = auth_header.split(' ')[1]

    # Vérifier si le token est valide
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = data['user_id']
    except:
        return jsonify({'message': 'Token is invalid'}), 401

    # Récupérez l'utilisateur de la base de données en utilisant l'ID utilisateur du token
    user = User.query.filter_by(id=user_id).first()

    # Vérifiez si l'utilisateur existe
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Récupérez les données de la requête
    data = request.get_json()
    new_password = data.get('new_password')

    # (Optionnel) Vous pouvez également vérifier le mot de passe actuel ici

    # Hacher le nouveau mot de passe
    password_hash = generate_password_hash(new_password, method='sha256')

    # Mettre à jour le mot de passe haché dans la base de données
    user.password_hash = password_hash
    db.session.commit()

    # Renvoyez une réponse indiquant que la mise à jour a réussi
    return jsonify({'message': 'Password updated successfully'}), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)