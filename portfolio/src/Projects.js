import React, { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import "./css/Projects.css";
import { TextSection, Section, Gallery } from "./App";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { COMMON_TAGS } from "./CommonTags";

function Projects() {
  useEffect(() => {
    document.title = "Projekty";
  });

  return (
    <main className="container">
      <TextSection id="projects" />
      <ProjectGrid />
    </main>
  );
}

class ProjectGrid extends React.Component {
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
      return <ProjectItem key={project} id={project} />;
    });

    return <Section id="projects-gallery">{projectList}</Section>;
  }
}

class ProjectItem extends React.Component {
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
            <Link
              to={`${this.props.id}`}
              style={{ backgroundImage: `url("${project.img}")` }}
            />
          </figure>
          <h3>
            <Link to={`${this.props.id}`}>{project.name}</Link>
          </h3>
        </header>
        <p>{project.desc}</p>
        <footer className="tags">
          <ProjectTags tags={project.tags} />
        </footer>
      </article>
    );
  }
}

function ProjectTags(props) {
  if (!props.tags || props.tags.length === 0) return null;

  return props.tags.map((tag) => <Tag key={tag} name={tag} />);
}

export function Tag(props) {
  let name = props.name;
  let icon = faCircle;
  const commonTag = COMMON_TAGS[props.name.toLowerCase()];

  if (commonTag) {
    name = commonTag.name;
    icon = commonTag.icon;
  }

  return (
    <div className="tag">
      <span className="tag-icon">
        {commonTag ? (
          <i className={`devicon-${icon}`} />
        ) : (
          <FontAwesomeIcon icon={faCircle} />
        )}
      </span>
      <span className="tag-name">{name}</span>
    </div>
  );
}

export function Project() {
  const projectData = useLoaderData();

  useEffect(() => {
    document.title = `${projectData.name} – Projekty`;

    setTimeout(() => {
      window.scroll({ top: 0, behavior: "smooth" });
    });
  });

  const content = new DOMParser().parseFromString(
    projectData.content,
    "text/html"
  );

  if (projectData.galleries) {
    const galleries = content.querySelectorAll("gallery");
    for (const gallery of galleries) {
      const imgs = projectData.galleries[gallery.id].map((img) => {
        return {
          src: `/content/projects/${projectData.id}/${img.src}`,
          caption: img.caption,
        };
      });

      gallery.outerHTML = renderToStaticMarkup(
        <Gallery id={gallery.id} imgs={imgs} />
      );
    }
  }

  let reposList;

  if (projectData.repo) {
    if (typeof projectData.repo == "string")
      reposList = <RepoLink repo={projectData.repo} label="Repozytorium" />;
    else
      reposList = projectData.repo.map((repo) => (
        <RepoLink
          key={repo.name}
          repo={repo.name}
          label={repo.label || repo.name}
        />
      ));
  }

  return (
    <main id="project-details" className="container">
      <header>
        <h1>{projectData.name}</h1>
        {projectData.repo && reposList}
      </header>
      <article dangerouslySetInnerHTML={{ __html: content.body.innerHTML }} />
    </main>
  );
}

export async function projectLoader({ params }) {
  let projectData = {
    id: params.projectId,
  };
  const p1 = fetch(
    process.env.PUBLIC_URL +
      `/content/projects/${params.projectId}/content.html`
  )
    .then((response) => response.text())
    .then((text) => {
      projectData.content = text;
    });

  const p2 = fetch(
    process.env.PUBLIC_URL +
      `/content/projects/${params.projectId}/${params.projectId}.json`
  )
    .then((response) => response.json())
    .then((data) => {
      projectData.name = data.name;
      projectData.repo = data.repo;
      projectData.galleries = data.galleries;
    });

  await Promise.all([p1, p2]);

  return projectData;
}

function RepoLink(props) {
  return (
    <a className="repo-btn" href={`https://github.com/MicKlu/${props.repo}`}>
      <i className="devicon-github-plain" />
      {props.label}
    </a>
  );
}

export default Projects;
