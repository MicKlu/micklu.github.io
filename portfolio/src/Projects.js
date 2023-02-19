import "./css/Projects.css";
import { MainSection, Section } from "./App";
import { Link } from "react-router-dom";

function Projects() {
  return (
    <main class="container">
      <MainSection id="projects" header="Projects">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non erat
          non tellus tempus faucibus. Fusce dui dui, blandit in leo lobortis,
          aliquet maximus ex. Nam vel ultricies turpis.
        </p>
      </MainSection>
      <Gallery />
    </main>
  );
}

function Gallery() {
  const projects = [
    {
      id: 1,
      name: "Lorem ipsum",
      img: "https://via.placeholder.com/450x250",
      shortDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nonerat non tellus tempus faucibus.",
    },
    {
      id: 2,
      name: "Lorem ipsum",
      img: "https://via.placeholder.com/450x250",
      shortDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nonerat non tellus tempus faucibus.",
    },
    {
      id: 3,
      name: "Lorem ipsum",
      img: "https://via.placeholder.com/450x250",
      shortDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nonerat non tellus tempus faucibus.",
    },
    {
      id: 4,
      name: "Lorem ipsum",
      img: "https://via.placeholder.com/450x250",
      shortDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nonerat non tellus tempus faucibus.",
    },
  ];

  const projectList = projects.map((project) => {
    return <Project key={project.id} data={project} />;
  });

  return <Section id="projects-gallery">{projectList}</Section>;
}

function Project(props) {
  const project = props.data;

  return (
    <article class="project">
      <header>
        <figure>
          <Link to={`projects/${project.id}`}>
            <img src={project.img} alt={project.name} />
          </Link>
        </figure>
        <h3>
          <Link to={`projects/${project.id}`}>{project.name}</Link>
        </h3>
      </header>
      <p>{project.shortDesc}</p>
    </article>
  );
}

export default Projects;
