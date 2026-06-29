from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask import send_from_directory

from models import db
from routes.auth import auth_bp
from routes.clips import clips_bp


app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///clutch.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["MAX_CONTENT_LENGTH"] = 50 * 1024 * 1024

db.init_app(app)
bcrypt = Bcrypt(app)

app.register_blueprint(auth_bp)
app.register_blueprint(clips_bp)

with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return {"message": "ClutchApp backend is running"}


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

if __name__ == "__main__":
    app.run(debug=True)