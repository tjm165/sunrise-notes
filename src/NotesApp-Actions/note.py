from table import Table

class Note():
    table = Table('NotesApp-Notes')
    uuid = None
    tag_uuids = None
    content = None
    title = None

    def __init__(self, uuid):
        self.uuid = uuid
        row = self.table.get_item(uuid)
        self.tag_uuids = row['tagUUIDs']
        self.content = row['content']
        self.title = row['title']


    def get_tag_uuids(self):
        return self.tag_uuids

    def getRGB(self):
        return self.rgb

    def get_title(self):
        return self.title