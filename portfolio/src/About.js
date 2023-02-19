import "./css/About.css";
import { MainSection, ListSection } from "./App";

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
  const education = [
    { course: "What", date: "When", institution: "Where" },
    { course: "What", date: "When", institution: "Where" },
    { course: "What", date: "When", institution: "Where" },
  ];

  const qualifications = [
    "What, When",
    "What, When",
    "What, When",
    "What, When",
  ];

  return (
    <main id="right-pane">
      <MainSection id="about" header="About">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non erat
          non tellus tempus faucibus. Fusce dui dui, blandit in leo lobortis,
          aliquet maximus ex. Nam vel ultricies turpis. Praesent faucibus ante
          ut nibh lacinia, at ultrices augue eleifend. Donec gravida sapien
          ipsum, eu molestie magna auctor in. Maecenas sed turpis gravida,
          imperdiet sem quis, cursus metus. Nunc volutpat erat et tempor
          condimentum. Pellentesque at turpis efficitur urna tincidunt eleifend
          vel et dolor. Praesent lobortis justo vel tellus lacinia rhoncus.
          Maecenas consequat, metus a laoreet consectetur, nunc dolor gravida
          neque, elementum mattis risus neque ut nisi. Nulla justo tortor,
          commodo eu vulputate eu, sodales quis quam. Duis imperdiet, lorem ut
          convallis consectetur, diam mauris sollicitudin nulla, ut placerat
          nulla massa eu augue.
        </p>
      </MainSection>
      <ListSection
        id="education"
        header="Education"
        list={education}
        element={EducationItem}
      />
      <ListSection
        id="qualifications"
        header="Qualifications and Certificates"
        list={qualifications}
      />
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
