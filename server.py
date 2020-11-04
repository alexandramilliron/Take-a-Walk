from flask import (Flask, render_template, request, flash, session,
                   redirect)
from model import connect_to_db
import os 

app = Flask(__name__)
app.secret_key = ""
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True

API_KEY = os.environ['']








if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)