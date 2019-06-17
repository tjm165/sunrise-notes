from table import Table

class User():
    table = Table('NotesApp-Users')
    uuid = None
    tag_uuids = None

    def __init__(self, uuid):
        self.uuid = uuid
        row = self.table.get_item(uuid)
        self.tag_uuids = row['tagUUIDs']

    def get_tag_uuids(self):
        return self.tag_uuids