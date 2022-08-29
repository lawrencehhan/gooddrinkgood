import os

from dotenv import load_dotenv
from pymongo import MongoClient
from pprint import pprint

from .s3_access import get_aws_image

# Load config from a .env file:
load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

# Connecting to the MongoDB cluster:
client = MongoClient(MONGODB_URI)
db = client['good_drink_good']

# List all the databases in the cluster:
def get_db_list():
   for db_info in client.list_database_names():
      print(db_info)

# List all the collections in 'good_drink_good':
def get_collection_list():
   collections = db.list_collection_names()
   for collection in collections:
      print(collection)

# Print out specific item in collection
def get_object_list():
   collection_liquors = db['liquors']
   for obj in collection_liquors.find({}):
      print(type(obj))
      pprint(obj)
   # pprint(collection_liquors.find_one({'DRINK_NAME':'Hibiki'}))
   print(type(collection_liquors.find({})))

## Returns pymongo cursor class containing all objects in collection
def get_all_liquors():
   db = client['good_drink_good']
   collection_liquors = db['liquors']
   cursor = collection_liquors.find({})
   data = cursor_to_dict(cursor)
   return data

# Converts a boto3 cursor to a [dicts] for json conversion
def cursor_to_dict(cursor):
   data = []
   for obj in cursor:
      dataDict = {
         'id': str(obj['_id']),
         'drinkid': obj['drinkid'],
         'category1': obj['category1'],
         'category2': obj['category2'],
         'category3': obj['category3'],
         'category4': obj['category4'],
         'category5': obj['category5'],
         'country': obj['country'],
         'drink_name': obj['drink_name'],
         'parent1': obj['parent1'],
         'parent2': obj['parent2'],
         'parent3': obj['parent3'],
         'brand': obj['brand'],
         'keywords': obj['keywords'],
         'description_long': obj['description_long'],
         'description_short': obj['description_short'],
         'image_key': obj['image_key'],
         'isindie': obj['isindie'],
         'iscelebrity': obj['iscelebrity'],
         'image_url': get_aws_image(obj['image_key'])
      }
      data.append(dataDict)
   return data
   