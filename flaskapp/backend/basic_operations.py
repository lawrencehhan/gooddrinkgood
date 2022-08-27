import datetime
import os

from dotenv import load_dotenv
from pymongo import MongoClient
from pprint import pprint

# Load config from a .env file:
load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

# Connecting to the MongoDB cluster:
client = MongoClient(MONGODB_URI)

# # List all the databases in the cluster:
# for db_info in client.list_database_names():
#    print(db_info)

# Get a reference to the 'sample_mflix' database:
db = client['good_drink_good']

# List all the collections in 'good_drink_good':
collections = db.list_collection_names()
for collection in collections:
   print(collection)

# Print out specific item in collection
collection_liquors = db['liquors']
pprint(collection_liquors.find_one({'DRINK_NAME':'Hibiki'}))