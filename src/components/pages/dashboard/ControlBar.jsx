import React from "react";
import { Button, Container, Menu, Segment } from "semantic-ui-react";

export default function ControlBar({ fixed, activeItem, history }) {
  return (
    <Menu secondary={!fixed}>
      <Menu.Item>Sunrise Notes</Menu.Item>
    </Menu>
  );
}
