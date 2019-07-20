import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon } from "semantic-ui-react";
import Heading from "../implementations/Layout/Heading";
import Desktop from "../implementations/Layout/Desktop";
import Divider from "../implementations/Layout/Divider";
import Paragraph from "../implementations/Layout/Paragraph";

const HomepageHeading = ({ mobile }) => (
  <Heading
    h1="You've Never Seen Note-Taking Like This Before."
    h2="Created by students for students"
    misc={
      <Link to="/signup">
        <Button primary size="huge">
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Link>
    }
  />
);

const LandingPageLayout = () => (
  <Desktop heading={<HomepageHeading />}>
    <Paragraph
      headerText="Breaking The Grid, Grabs Your Attention"
      text="Instead of focusing on content creation and hard work, we have learned
        how to master the art of doing nothing by providing massive amounts of
        whitespace and generic content that can seem massive, monolithic and
        worth your attention."
    >
      <Button as="a" size="large">
        Read More
      </Button>
    </Paragraph>

    <Divider />

    <Paragraph
      headerText="Did We Tell You About Our Bananas?"
      text="Yes I know you probably disregarded the earlier boasts as non-sequitur
        filler content, but it's really true. It took years of gene splicing and
        combinatory DNA research, but our bananas can really dance."
    >
      <Button as="a" size="large">
        Read More
      </Button>
    </Paragraph>
  </Desktop>
);
export default LandingPageLayout;
