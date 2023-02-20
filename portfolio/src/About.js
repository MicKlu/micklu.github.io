import "./css/About.css";
import { TextSection, ListSection } from "./App";
import React from "react";

function About() {
  return (
    <>
      <LeftPane />
      <RightPane />
    </>
  );
}

function LeftPane() {
  return (
    <div id="left-pane">
      <h2>First Last</h2>
      <h3>dsa</h3>
    </div>
  );
}

function RightPane() {
  return (
    <main id="right-pane">
      <TextSection id="about" />
      <ListSection id="education" element={EducationItem} />
      <ListSection id="qualifications" />
    </main>
  );
}

function EducationItem(props) {
  const item = props.item;
  return (
    <li>
      <h3>
        {item.course}, {item.date}
      </h3>
      <h4>{item.institution}</h4>
    </li>
  );
}

export default About;
