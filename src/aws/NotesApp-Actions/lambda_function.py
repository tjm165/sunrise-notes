import json
import decimal
from actions import Actions

def lambda_handler(event, context):
    action = event['action'] if 'action' in event else None
    body = event['body-json'] if 'body-json' in event else None
    params = event['params'] if 'params' in event else None
    querystring = params['querystring'] if (params != None) and ('querystring' in params) else None
    
    if (action == "tags-GET"):
        return Actions.get_tags_by_user_uuid(querystring['UUID'])
    if (action == "noteset-GET"):
        return Actions.get_noteset_by_tag_uuids(querystring['UUIDs'].split(','))
    if(action == "note-GET"):
        return Actions.get_note_by_uuid(querystring['UUID'])

    return "action not supported: " + action
    
