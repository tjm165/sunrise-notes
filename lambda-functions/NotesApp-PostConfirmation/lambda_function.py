from table import Table
import json


def lambda_handler(event, context):
    user_table = Table('SunriseNotes-Users')
    uuid = event['request']['userAttributes']['sub']
    # email = event['request']['userAttributes']['email']
    user = {"UUID": uuid}
    user_table.put_item(user)

    return event
