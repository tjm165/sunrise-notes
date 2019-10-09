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
        "https://lh3.googleusercontent.com/3y4ctAd47C_2ZjSTIxK7AREHztJdPao5BO0zvCmtyy9msXhqrgzXU1TQHTpkMC0OzP9vNLF-QdbVt495aDit3AXg-aw4aeRMaDozFyCZ-O1L4XkqmT6LOV4b_OtGbN7xbN3Wo9LaUTVODYTvgB-DcUvVfREQzY7kFqeLE8C-Su79mmkFrmrI6Zj3bfCDo8e8lf8glowIDsjB-1N6FFnN9_lX5zRMk-fP3yezFF5chpoIAhof7ezQDScIS7sIoHkRtMtyGHne0caRnTD2-NQKAO-DzDpUS_s6rMepWYr7ANYPSDU0av8sCr07HIiv3vSqGTz88Z3B2pFdId9FFG_j4pWPagGGoyQnwK7uAQzgnmoTilSYDKVPTkO7ccguZ2JsHSV-xcbnHKXzG6D7XJU2ti3z4GdLeYAT5PpIbgbaA1IOSiv07iaPcmPygp9EaApXY-60SZV6LbpeQ6_RVC_duUNL11x8aP9MgckoJLC9MQubTL98ng3NlljhEHYoL75EMhv3VzJqdvyVV5v8kmRHTYBINYxpFk4X9UmVrdDNduMUrvdyZ3fxcpru4sa_Tov7oODrNorv5OkW7knD3iDUIyZVjWtd4vGy_EAb8Mia-UOPErydb2xI0gnTLZbHWw36kCPiTUW5y1j9c7pz0ysnVzOS1xHNGwz5emiR_mnBV2WsxGZRQRnrpQ=w2550-h1780-no",
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
