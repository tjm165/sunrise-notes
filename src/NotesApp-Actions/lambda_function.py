import json
import decimal
from actions import Actions

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)
        
class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            # if the obj is uuid, we simply return the value of uuid
            return obj.hex
        return json.JSONEncoder.default(self, obj)

#decides what action to call
def lambda_handler(event, context):
    action = event['action'] if 'action' in event else None
    body = event['body-json'] if 'body-json' in event else None
    params = event['params'] if 'params' in event else None
    querystring = params['querystring'] if (params != None) and ('querystring' in params) else None
    
    if (action == "get_tags"):
        return Actions.get_tags_by_userUUID(querystring['UUID'])
    if (action == "note-set-GET"):
        return Actions.get_noteset_by_tagUUIDs(querystring['UUIDs'].split(","))
    if (action == "notes-POST"):
        return Actions.put_note(body)

    return "action not supported: " + action