from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://lectura01:lSBpo2g5GKMB5bb@193.34.145.42:3306/HuellaCarbono'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class EdificioMes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    edificio = db.Column(db.String(100), nullable=False)
    mes = db.Column(db.String(6), nullable=False)  # YYYYMM format
    refrigerantes = db.relationship('Refrigerante', backref='edificio_mes', lazy=True)
    combustibles = db.relationship('Combustible', backref='edificio_mes', lazy=True)
    energias = db.relationship('Energia', backref='edificio_mes', lazy=True)
    aguas = db.relationship('Agua', backref='edificio_mes', lazy=True)
    papeles = db.relationship('Papel', backref='edificio_mes', lazy=True)

class Refrigerante(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    emision_fugitiva = db.Column(db.String(50))
    recarga = db.Column(db.Float)
    tipo = db.Column(db.String(50))
    area_beneficiaria = db.Column(db.String(50))
    edificio_mes_id = db.Column(db.Integer, db.ForeignKey('edificio_mes.id'), nullable=False)

class Combustible(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fuente = db.Column(db.String(50))
    suministro_petroleo = db.Column(db.Float)
    equipo_beneficiario = db.Column(db.String(50))
    edificio_mes_id = db.Column(db.Integer, db.ForeignKey('edificio_mes.id'), nullable=False)

class Energia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    kw_h = db.Column(db.Float)
    monto = db.Column(db.Float)
    area_beneficiaria = db.Column(db.String(50))
    suministro = db.Column(db.String(50))
    edificio_mes_id = db.Column(db.Integer, db.ForeignKey('edificio_mes.id'), nullable=False)

class Agua(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    m3 = db.Column(db.Float)
    monto = db.Column(db.Float)
    area_beneficiaria = db.Column(db.String(50))
    suministro = db.Column(db.String(50))
    edificio_mes_id = db.Column(db.Integer, db.ForeignKey('edificio_mes.id'), nullable=False)

class Papel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cantidad = db.Column(db.Float)
    densidad = db.Column(db.Float)
    area = db.Column(db.Float)
    edificio_mes_id = db.Column(db.Integer, db.ForeignKey('edificio_mes.id'), nullable=False)

with app.app_context():
    db.create_all()


@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.json

    edificio = data.get('edificio')
    mes = data.get('mes')

    # Crear una instancia de EdificioMes
    edificio_mes = EdificioMes(edificio=edificio, mes=mes)

    # Agregar datos de refrigerantes
    for ref in data.get('refrigerante', []):
        refrigerante_data = ref['data']
        refrigerante = Refrigerante(
            emision_fugitiva=refrigerante_data['emision_fugitiva'],
            recarga=refrigerante_data['recarga'],
            tipo=refrigerante_data['tipo'],
            area_beneficiaria=refrigerante_data['area_beneficiaria'],
            edificio_mes=edificio_mes
        )
        db.session.add(refrigerante)

    # Agregar datos de combustibles
    for com in data.get('combustible', []):
        combustible_data = com['data']
        combustible = Combustible(
            fuente=combustible_data['fuente'],
            suministro_petroleo=combustible_data['suministro_petroleo'],
            equipo_beneficiario=combustible_data['equipo_beneficiario'],
            edificio_mes=edificio_mes
        )
        db.session.add(combustible)

    # Agregar datos de energias
    for ene in data.get('energia', []):
        energia_data = ene['data']
        energia = Energia(
            kw_h=energia_data['kw_h'],
            monto=energia_data['monto'],
            area_beneficiaria=energia_data['area_beneficiaria'],
            suministro=energia_data['suministro'],
            edificio_mes=edificio_mes
        )
        db.session.add(energia)

    # Agregar datos de aguas
    for agu in data.get('agua', []):
        agua_data = agu['data']
        agua = Agua(
            m3=agua_data['m3'],
            monto=agua_data['monto'],
            area_beneficiaria=agua_data['area_beneficiaria'],
            suministro=agua_data['suministro'],
            edificio_mes=edificio_mes
        )
        db.session.add(agua)

    # Agregar datos de papeles
    for pap in data.get('papel', []):
        papel_data = pap['data']
        papel = Papel(
            cantidad=papel_data['cantidad'],
            densidad=papel_data['densidad'],
            area=papel_data['area'],
            edificio_mes=edificio_mes
        )
        db.session.add(papel)

    db.session.add(edificio_mes)
    db.session.commit()

    return jsonify({'message': 'Data inserted successfully'}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5003)
