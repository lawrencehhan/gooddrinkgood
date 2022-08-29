import boto3
from PIL import Image
from io import BytesIO
import os
from dotenv import load_dotenv

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_ACCESS_KEY_SECRET = os.getenv('AWS_ACCESS_KEY_SECRET')
AWS_REGION = os.getenv('AWS_REGION')
AWS_BUCKET_NAME= os.getenv('AWS_BUCKET_NAME')

# Returns presigned URLs for specified images in S3 bucket
def get_aws_image(image_key: str):
    try:
        s3 = boto3.client(
            service_name='s3',
            region_name=AWS_REGION,
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_ACCESS_KEY_SECRET
        )
        available_images = [content['Key'] for content in s3.list_objects(Bucket=AWS_BUCKET_NAME)['Contents']]
        print(available_images)
        print(image_key)
        if image_key in available_images:
            presigned_url = s3.generate_presigned_url('get_object', Params = {
                'Bucket': AWS_BUCKET_NAME,
                'Key': image_key
            }, ExpiresIn = 100)
            return presigned_url  
        else:
            presigned_url = s3.generate_presigned_url('get_object', Params = {
                'Bucket': AWS_BUCKET_NAME,
                'Key': 'blank_example.png'
            }, ExpiresIn = 100)
            return presigned_url   
    except:
        return 'Image Unavailable'

# Print out bucket names
# s3 = boto3.client(
#     service_name='s3',
#     region_name=AWS_REGION,
#     aws_access_key_id=AWS_ACCESS_KEY_ID,
#     aws_secret_access_key=AWS_ACCESS_KEY_SECRET
# )
# # for bucket in s3.buckets.all():
# #     print(bucket.name)

# # for obj in s3.Bucket('gooddrinkgood').objects.all():
# #     print(obj)
# for content in s3.list_objects(Bucket=AWS_BUCKET_NAME)['Contents']:
#     print(content['Key'])