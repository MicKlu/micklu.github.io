import "./css/App.css";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <div class="main-container">
        <Outlet />
      </div>
    </div>
  );
}

export function Section(props) {
  return <section id={`${props.id}-section`}>{props.children}</section>;
}

export function MainSection(props) {
  return (
    <Section id={props.id}>
      <h1>{props.header}</h1>
      {props.children}
    </Section>
  );
}

export function ListSection(props) {
  let list;

  if (props.element) {
    const ListItem = props.element;
    list = props.list.map((item, index) => {
      return <ListItem key={index} item={item} />;
    });
  } else {
    list = props.list.map((item, index) => {
      return <li key={index}>{item.toString()}</li>;
    });
  }

  return (
    <Section id={props.id}>
      <h2>{props.header}</h2>
      <ul>{list}</ul>
    </Section>
  );
}

export default App;
