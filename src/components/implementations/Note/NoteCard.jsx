import React, { useState } from "react";
import { Icon, Card, Popup, Grid, Button } from "semantic-ui-react";

function NoteCard({ note, onEdit, onDelete }) {
  const title = note.title;
  const content = note.content;
  const rgb = note.rgb;
  const rgbstring = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2`;
  const [shouldHideOptions, hideOptions] = useState(true);

  return (
    <Card
      style={{ backgroundColor: rgbstring }}
      onMouseOver={() => hideOptions(false)}
      onMouseOut={() => hideOptions(true)}
    >
      <Card.Content>
        <Card.Header>
          <Grid>
            <Grid.Column floated="left" width={13}>
              {title}
            </Grid.Column>

            <Grid.Column floated="right" width={3} />
          </Grid>
        </Card.Header>

        <Card.Description>{content}</Card.Description>
      </Card.Content>
      <Card.Content extra hidden={!shouldHideOptions}>
        {" "}
      </Card.Content>
      <Card.Content extra hidden={shouldHideOptions}>
        <Popup
          size="mini"
          inverted
          position="bottom left"
          content="Edit"
          trigger={<Icon link name="pencil" onClick={() => onEdit()} />}
        />
        <Popup
          size="mini"
          inverted
          position="bottom left"
          content="Delete"
          trigger={<Icon link name="trash" onClick={() => onDelete()} />}
        />
      </Card.Content>
    </Card>
  );
}
export default NoteCard;
