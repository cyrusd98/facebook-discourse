import os
# gotta make sure that the API key is securely activated

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

# setting up the API key connection
os.system("export GOOGLE_APPLICATION_CREDENTIALS=hackfb-440ec2fb67a9.json")
# print("Success!")

client = language.LanguageServiceClient()

def string_sentiment(s):
    # returns sentiment with -1 == hating something and 1 == loving something
    # the magnitude of sentiment is just the absolute value of the returned float
    if type(s) != str:
        return None
    else:
        text = s
        document = types.Document(
            content = text,
            type = enums.Document.Type.PLAIN_TEXT
            )
        sentiment = client.analyze_sentiment(document=document).document_sentiment
        return sentiment.score

def string_entity(s):
    # detects the entities in a string
    # should only be a "focal topic" if the entity detected passes some threshold salience
    # where salience is the magnitude of how much an entity matters in the context of a sentence

    #returns a tuple of tuples:
    # (ENTITY_NAME, ENTITY_TYPE, ENTITY_SALIENCE)

    if type(s) != str:
        return None
    else:
        text = s
        document = types.Document(
            content = text,
            type = enums.Document.Type.PLAIN_TEXT
        )
        entities = client.analyze_entities(document).entities
        entity_type = ('UNKNOWN', 'PERSON', 'LOCATION', 'ORGANIZATION',
                        'EVENT', 'WORK_OF_ART', 'CONSUMER_GOOD', 'OTHER')
        retval = []
        for entity in entities:
            retval.append((entity.name, entity_type[entity.type], entity.salience))
        return retval

def string_category(s):
    # returns the broad topics of a sentence and how confident the API is about it
    # will return a list of tuples of size 2:
    # (TOPIC NAME, CONFIDENCE)
    if type(s) != str:
        return None
    else:
        text = s
        document = types.Document(
            content = text,
            type = enums.Document.Type.PLAIN_TEXT)

        categories = client.classify_text(document).categories
        
        retval = []
        for category in categories:
            retval.append((category.name, category.confidence))
        return retval
