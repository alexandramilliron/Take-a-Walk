"""Script to seed database."""

import os
import json
from datetime import datetime

import crud 
import model
import server

os.system('dropdb takeawalk')
os.system('createdb takeawalk')

model.connect_to_db(server.app)
model.db.create_all()

