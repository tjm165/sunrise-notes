import React, { useState } from "react";
import Entry from "./Entry";

export default function List({ tags, entries }) {
  return (
    <>
      <h1>{tags}</h1>
      <Entry content="heyo" />
    </>
  );
}
