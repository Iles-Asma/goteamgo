from flask import Flask, request, jsonify, Response, json
from models import db, User
from flask_cors import CORS

app = Flask(__name__)

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

@app.route('/inscription', methods=['POST'])
def inscription():
    data = request.get_json()
    
    # Créer un nouvel utilisateur
    new_user = User(
        nom=data['nom'],
        prenom=data['prenom'],
        email=data['email'],
        password_hash=data['password_hash']
    )
    
    # Insérer le nouvel utilisateur dans la base de données
    db.session.add(new_user)
    db.session.commit()
    
    # Retourner une réponse réussie
    return jsonify({'message': 'Inscription réussie'}), 201

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)