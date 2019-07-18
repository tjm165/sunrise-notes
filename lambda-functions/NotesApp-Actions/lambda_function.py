from user import User


def lambda_handler(event, context):
    action = event['action'] if 'action' in event else None
    body = event['body-json'] if 'body-json' in event else None
    params = event['params'] if 'params' in event else None
    querystring = params['querystring'] if (
        params != None) and ('querystring' in params) else None
    user = User(event['sunrise-user'])
    response = False

    if (action == "test"):
        response = user.get_all_tags()
    if (action == "tags-GET"):
        response = user.get_all_tags()
    if (action == "tag-POST"):
        response = user.put_tag(body['tagObject'])
    if (action == "note-set-GET"):
        base_tags = querystring['baseTagUUIDs'].split(',')
        req = querystring['requiredTagUUIDs'].split(',')
        opt = querystring['optionalTagUUIDs'].split(',')

        response = user.get_noteset_by_tag_uuids(base_tags, req, opt)
    if(action == "note-GET"):
        return user.get_tagged_note(querystring['UUID'])
    # if(action == "note-DELETE"):
    #     return Actions.delete_note_by_uuid(querystring['UUID'])
    # if (action == "note-POST"):
    #     return Actions.post_note(body)

    if response:
        user.save_permissions()
        return response
    return "action not supported: " + action
