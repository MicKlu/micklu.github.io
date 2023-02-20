import "./css/About.css";
import { TextSection, ListSection, Section } from "./App";
import { Tag } from "./Projects";
import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "O sobie";
  });

  return (
    <>
      <MainPane />
      <SidePane />
    </>
  );
}

function SidePane() {
  return (
    <div id="side-pane">
      <Technologies />
      <ListSection id="interests" />
    </div>
  );
}

function MainPane() {
  return (
    <main id="main-pane">
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
        {item.course}
        {item.title && ", " + item.title}, {item.date}
      </h3>
      <h4>{item.institution}</h4>
    </li>
  );
}

class Technologies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      tags: [],
    };
  }

  componentDidMount() {
    let header, tags;
    let p = fetch(process.env.PUBLIC_URL + `/content/headers.json`)
      .then((response) => response.json())
      .then((data) => {
        header = data["technologies"];
      });

    let p2 = fetch(process.env.PUBLIC_URL + `/content/technologies.json`)
      .then((response) => response.json())
      .then((data) => {
        tags = data;
      });

    Promise.all([p, p2]).then(() => {
      this.setState({
        header: header,
        tags: tags,
      });
    });
  }

  render() {
    const tags = this.state.tags.map((tag) => <Tag key={tag} name={tag} />);

    return (
      <Section id="technologies" header={this.state.header} h="h2">
        <div className="tags">{tags}</div>
      </Section>
    );
  }
}

export default About;
