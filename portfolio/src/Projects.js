import "./css/Projects.css";
import { TextSection, Section } from "./App";
import { Link } from "react-router-dom";
import React from "react";

function Projects() {
  return (
    <main className="container">
      <TextSection id="projects" />
      <Gallery />
    </main>
  );
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    fetch(process.env.PUBLIC_URL + `/content/projects/projects.json`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          list: data,
        });
      });
  }

  render() {
    const projectList = this.state.list.map((project) => {
      return <Project key={project} id={project} />;
    });

    return <Section id="projects-gallery">{projectList}</Section>;
  }
}

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch(
      process.env.PUBLIC_URL +
        `/content/projects/${this.props.id}/${this.props.id}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
        });
      });
  }

  render() {
    const project = this.state.data;

    if (!project) return null;

    return (
      <article className="project">
        <header>
          <figure>
            <Link to={`${this.props.id}`}>
              <img src={project.img} alt={project.name} />
            </Link>
          </figure>
          <h3>
            <Link to={`${this.props.id}`}>{project.name}</Link>
          </h3>
        </header>
        <p>{project.desc}</p>
      </article>
    );
  }
}

export default Projects;
