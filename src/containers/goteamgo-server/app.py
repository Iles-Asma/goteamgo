from flask import Flask, request, jsonify, Response, json, make_response
from models import db, User
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash # Pour vérifier le mot de passe
import jwt # Pour générer un token JWT
import datetime # Pour définir l'expiration du token

app = Flask(__name__)

app.config['SECRET_KEY'] = 'q#!0i^ik4dl2ipx5b(7=+^+l=#2krpfd^0x!5w*r83)f9428+('

CORS(app, resources={r"/*": {"origins": "http://localhost:19006"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@goteamgo-db:5432/mydb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/')
def home():
    return 'Bienvenue sur GoTeamGo !'

@app.route('/json')
def renvoie_json():
    data = {"nom": "Dupont", "prenom": "Jean", "age": 30}
    
    json_data = json.dumps(data)

    return Response(response=json_data, status=200, mimetype='application/json')

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

# @app.route('/connexion', methods=['POST'])
# def connexion():
#     data = request.get_json()

#     # Vérifiez si l'email est fourni
#     if not data or not data.get('email') or not data.get('password'):
#         return make_response('Email ou mot de passe manquant', 401)

#     # Rechercher l'utilisateur dans la base de données
#     user = User.query.filter_by(email=data['email']).first()

#     # Vérifier si l'utilisateur existe et que le mot de passe est correct
#     if not user or not check_password_hash(user.password_hash, data['password']):
#         return make_response('Email ou mot de passe invalide', 401)

#     # Générer un token JWT
#     token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, app.config['SECRET_KEY'], algorithm='HS256')

#     # Retourner le token comme réponse
#     return jsonify({'token': token})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    print(f"Email: {email}, Password: {password}")

    # Here, you can add the logic to verify the email and password,
    # and send a response back indicating success or failure.

    return jsonify({"message": "Data received"}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)