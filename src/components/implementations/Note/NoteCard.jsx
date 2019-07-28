import React, { useState } from "react";
import { Icon, Card, Popup, Grid } from "semantic-ui-react";

function NoteCard({ note, onClick }) {
  const title = note.title;
  const content = note.content;
  const rgb = note.rgb;
  const rgbstring = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2`;
  const [shouldHideOptions, hideOptions] = useState(true);

  return (
    <Card
      onClick={onClick}
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

      <Card.Content extra hidden={shouldHideOptions}>
        <Popup
          size="mini"
          inverted
          position="bottom left"
          content="Edit"
          trigger={<Icon name="pencil" />}
        />
        <Popup
          size="mini"
          inverted
          position="bottom left"
          content="Delete"
          trigger={<Icon name="trash" />}
        />
      </Card.Content>
    </Card>
  );
}
export default NoteCard;
