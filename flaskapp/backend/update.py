import os
import pandas as pd
import json
from dotenv import load_dotenv
from pymongo import MongoClient

# Load config from a .env file:
load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

# Connecting to the MongoDB cluster:
client = MongoClient(MONGODB_URI)


# CLI for mongoimport
# mongoimport --uri mongodb+srv://gdglrlr:<PASSWORD>@cluster0.2iu42zj.mongodb.net/good_drink_good --collection liquors --type csv --file GDG_TestData.csv --headerline

# Replacing csv
# mongoimport --uri mongodb+srv://gdglrlr:<PASSWORD>@cluster0.2iu42zj.mongodb.net/good_drink_good --collection liquors --type csv --file GDG_TestData.csv --headerline --drop