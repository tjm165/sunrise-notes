from user import User
import boto3
from boto3.dynamodb.conditions import Key, Attr


def lambda_handler(event, context):
    action = event['action'] if 'action' in event else None
    body = event['body-json'] if 'body-json' in event else None
    params = event['params'] if 'params' in event else None
    querystring = params['querystring'] if (
        params != None) and ('querystring' in params) else None
    user = User(event['sunrise-user'])

    if (action == "test"):
        return "ping"

    if (action == "tags-GET"):
        return user.get_all_tags()
    if (action == "tag-POST"):
        response = user.put_tag(body['tagObject'])
        return response
    if (action == "note-set-GET"):
        tag_uuids = querystring['tagUUIDs'].split(',')
        if tag_uuids == [""]:
            tag_uuids = []
        operation = querystring['operation']

        return user.get_noteset_by_tag_uuids(tag_uuids, operation)
    if (action == "note-GET"):
        if querystring['UUID'] == "all":
            return user.get_all_notes()
        return user.get_note(querystring['UUID'])

    if (action == "tag-DELETE"):
        response = user.delete_tag(querystring['UUID'])
        return response

    if (action == "note-DELETE"):
        response = user.delete_note(querystring['UUID'])
        return response

    if (action == "note-POST"):
        response = user.put_note(body['noteObject'])
        return response

    return "action not supported: " + action
