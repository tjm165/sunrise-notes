import json
import decimal
from actions import Actions

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
        return Actions.post_note(body)

    return "action not supported: " + action