from flask import Flask, jsonify, request
from flask_wtf.csrf import CSRFProtect
from structlog import get_logger
from uuid import uuid4

csrf = CSRFProtect()
log = get_logger(__name__)
application = Flask(__name__)
application.config["SECRET_KEY"] = uuid4().bytes
csrf.init_app(application)

@application.route("/status", methods=["GET"])
def status():
    if (request.method == "GET"):
        log.info("Flask API accessed")
        return jsonify({"status": "online"})

if __name__ == "__main__":
    application.run(debug=True)



# #!/usr/bin/env python
# # encoding: utf-8
# from flask import Flask
# from flask_mongoengine import MongoEngine

# application = Flask(__name__)
# application.config["SECRET_KEY"] = uuid4().bytes
# application.config['MONGODB_SETTINGS'] = {
#     'db': 'your_database',
#     'host': 'localhost',
#     'port': 27017
# }
# db = MongoEngine()
# db.init_app(app)

# class User(db.Document):
#     name = db.StringField()
#     email = db.StringField()

# if __name__ == "__main__":
#     app.run(debug=True)


