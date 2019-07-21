import React, { Component } from "react";
import { Responsive, Segment, Visibility, Container } from "semantic-ui-react";
import Footer from "./Footer";
import NavBar from "./NavBar";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

export default class Desktop extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children, fixed, activeItem } = this.props;
    const {} = this.state;
    const height = this.props.heading ? 700 : 0;

    return (
      <Responsive
        getWidth={getWidth}
        minWidth={Responsive.onlyTablet.minWidth}
        className="gradient"
      >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment textAlign="center" style={{ minHeight: height }} vertical>
            <NavBar fixed={fixed} fixed={fixed} activeItem={activeItem} />
            {this.props.heading}
          </Segment>
        </Visibility>
        <Segment
          style={{ padding: "8em 0em", backgroundColor: "white" }}
          vertical
        >
          <Container text style={{ backgroundColor: "white" }}>
            {children}
          </Container>
        </Segment>

        {this.props.hideFooter || <Footer />}
      </Responsive>
    );
  }
}
