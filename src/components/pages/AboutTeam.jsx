import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { Image, Button, Card } from "semantic-ui-react";
import Desktop from "../implementations/Layout/Desktop";
import Paragraph from "../implementations/Layout/Paragraph";

function ContactLink({ label, link, username }) {
  return (
    <a target="_blank" href={link}>
      {label}: {username}
    </a>
  );
}

function MemberCard({ name, imgSrc, title, contacts, description }) {
  return (
    <Card fluid>
      <Card.Content>
        <Image floated="left" size="small" src={imgSrc} />
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          {title}
          {description && <Card.Description>{description}</Card.Description>}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        {contacts.map((contact, i) => (
          <>
            <ContactLink {...contact} />
            {i !== contacts.size && <br />}
          </>
        ))}
      </Card.Content>
    </Card>
  );
}
function AboutTeam({ history }) {
  const teamMembers = [
    {
      name: "Tommy M",
      description:
        "Passionate about designing software while keeping users in mind. Known for being a positive and organized co-op and RA.",
      imgSrc:
        "https://media.licdn.com/dms/image/C4E03AQFBnrrNJec94Q/profile-displayphoto-shrink_200_200/0?e=1570060800&v=beta&t=89rglocPy-tBoI-L3qp6fAKuODvULgGTJHexqG264d0",
      title: "Owner/Creator",
      contacts: [
        {
          label: "Email",
          username: "tjm165@case.edu"
        },
        {
          label: "GitHub",
          username: "tjm165",
          link: "https://github.com/tjm165"
        },
        {
          label: "LinkedIn",
          username: "Thomas Moawad",
          link: "https://www.linkedin.com/in/thomas-moawad-58785b17b/"
        }
      ]
    }
  ];

  return (
    <Desktop hideFooter activeItem="AboutTeam">
      <Paragraph headerText="Meet The Team">
        <Card.Group>
          {teamMembers.map((member, i) => (
            <MemberCard key={i} {...member} />
          ))}
        </Card.Group>
      </Paragraph>
      <Paragraph headerText="Interested In Joining the Team?">
        We'd definetly love to collaborate with you! We want to make it as easy
        as possible for you to work with us.
        <br />
        <Button positive onClick={() => history.push("/contribute")}>
          Learn More
        </Button>
      </Paragraph>
    </Desktop>
  );
}

export default withRouter(AboutTeam);
