from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import db
from routes.auth import auth_bp

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///clutch.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["UPLOAD_FOLDER"] = "uploads"

db.init_app(app)
bcrypt = Bcrypt(app)

app.register_blueprint(auth_bp)

with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return {"message": "ClutchApp backend is running"}


if __name__ == "__main__":
    app.run(debug=True)