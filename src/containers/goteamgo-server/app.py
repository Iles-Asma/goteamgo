from flask import Flask, request, jsonify, Response, json, make_response
from models import db, User, Event, Organization
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash # Pour vérifier le mot de passe
import jwt # Pour générer un token JWT
import datetime # Pour définir l'expiration du token
from flask_migrate import Migrate

app = Flask(__name__)

app.config['SECRET_KEY'] = 'q#!0i^ik4dl2ipx5b(7=+^+l=#2krpfd^0x!5w*r83)f9428+('

CORS(app, resources={r"/*": {"origins": "http://localhost:19006", "methods": ["GET", "POST", "OPTIONS"]}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@goteamgo-db:5432/mydb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

migrate = Migrate(app, db)

with app.app_context():
    db.create_all()


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
            'nom': user.nom,
            'prenom': user.prenom,
            'email': user.email,
            'organization_code': user.organization_code
        }
    else:
        response = {
        'nom': user.nom,
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
            'date': event.date
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
    

# @app.route('/update_password', methods=['POST'])
# def update_password():
#     # Obtenez le token à partir de l'en-tête d'autorisation
#     token = request.headers.get('Authorization')

#     # Vérifiez si le token est présent
#     if not token:
#         return jsonify({'message': 'Token is missing'}), 401

#     try:
#         # Décoder le token
#         data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
#         user_id = data['user_id']
#     except:
#         return jsonify({'message': 'Token is invalid'}), 401

#     # Récupérez l'utilisateur de la base de données en utilisant l'ID utilisateur du token
#     user = User.query.filter_by(id=user_id).first()

#     # Vérifiez si l'utilisateur existe
#     if not user:
#         return jsonify({'message': 'User not found'}), 404

#     # Récupérez les données de la requête
#     data = request.get_json()
#     new_password = data.get('new_password')

#     # (Optionnel) Vous pouvez également vérifier le mot de passe actuel ici

#     # Hacher le nouveau mot de passe
#     password_hash = generate_password_hash(new_password, method='sha256')

#     # Mettre à jour le mot de passe haché dans la base de données
#     user.password_hash = password_hash
#     db.session.commit()

#     # Renvoyez une réponse indiquant que la mise à jour a réussi
#     return jsonify({'message': 'Password updated successfully'}), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)