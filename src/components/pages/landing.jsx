import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {
  Button,
  Icon,
  Grid,
  Header,
  Image,
  Container,
} from "semantic-ui-react";
import { SignupComponent } from "../pages/Authorization";
import { Desktop, Paragraph, Heading, Divider } from "../../components";

const HomepageHeading = () => (
  <Heading
    h1="Best Note Taking App Ever"
    h2="You've never used note-taking like this before."
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

const LandingPageLayout = (props) => (
  <Desktop activeItem="Home" heading={<HomepageHeading />}>
    <Paragraph headerText="How It Works">
      <Grid columns="equal">
        <Grid.Column textAlign="center">
          <Container>
            <Image centered size="small" src="/images/create_note.png" />
            <Header>Create it</Header>
            Take notes, write memos, or create checklists. All in one place.
          </Container>
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Container>
            <Image centered size="small" src="/images/tag.png" />
            <Header>Tag it</Header>
            Tag your documents so that their easier to find later.
          </Container>
        </Grid.Column>
        <Grid.Column centered textAlign="center">
          <Container>
            <Image size="small" src="/images/search.png" />
            <Header>Search it</Header>
            Take advantage of multi-tag search to find what you want, when you
            want
          </Container>
        </Grid.Column>
      </Grid>
    </Paragraph>

    <Paragraph headerText="Unique Features" text="">
      <Header>Multi-tag Search</Header>
      <Grid columns="equal">
        <Grid.Column>
          Ordinary note taking applications limit you to searching by one tag at
          a time. With Sunrise Notes, you can take control of your searches
        </Grid.Column>
        <Grid.Column>
          <Image size="medium" src="/images/multi_tag_search.png" />
        </Grid.Column>
      </Grid>
      <Divider />
      <Header>Smart Color</Header>
      <Grid columns="equal">
        <Grid.Column>
          <Image size="medium" src="/images/smart_color.png" />
        </Grid.Column>
        <Grid.Column>
          Color coding helps us stay organized. Sunrise notes handles the
          coloring so that you can take care of what really matters!
        </Grid.Column>
      </Grid>
    </Paragraph>

    <Paragraph headerText="What's next?">
      <Grid columns="equal">
        <Grid.Column>
          Stay tuned for new feautes! Here's what you can look forward to:
          <ul>
            <li>iOS App</li>
            <li>Sync with Google Drive</li>
            <li>Handwriting Recognition</li>
            <li>Deep Tags</li>
            <li>Create Notes Through SMS</li>
          </ul>
          Interested in contributing?
          <br />
          <Button positive onClick={() => props.history.push("/contribute")}>
            Learn More
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Image size="medium" src="/images/future.png" />
        </Grid.Column>
      </Grid>
    </Paragraph>
    <Paragraph headerText="We're Glad To Have You Joining Us!">
      <SignupComponent horizontal />
    </Paragraph>
  </Desktop>
);
export default withRouter(LandingPageLayout);
