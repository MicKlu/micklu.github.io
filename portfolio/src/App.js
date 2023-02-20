import "./css/App.css";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="main-container">
          <Outlet />
        </div>
      </div>
    );
  }
}

export function Section(props) {
  let Heading = "h1";
  if (props.h) Heading = props.h;

  return (
    <section id={`${props.id}-section`}>
      {props.header && <Heading>{props.header}</Heading>}
      {props.children}
    </section>
  );
}

export class TextSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      text: "",
    };
  }

  componentDidMount() {
    let header, text;
    let p = fetch(process.env.PUBLIC_URL + `/content/headers.json`)
      .then((response) => response.json())
      .then((data) => {
        header = data[this.props.id];
      });

    let p2 = fetch(process.env.PUBLIC_URL + `/content/${this.props.id}.txt`)
      .then((response) => response.text())
      .then((value) => {
        text = value;
      });

    Promise.all([p, p2]).then(() => {
      this.setState({
        header: header,
        text: text,
      });
    });
  }

  render() {
    return (
      <Section {...this.props} id={this.props.id} header={this.state.header}>
        <p>{this.state.text}</p>
      </Section>
    );
  }
}

export class ListSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      list: [],
    };
  }

  componentDidMount() {
    let header, list;
    let p = fetch(process.env.PUBLIC_URL + `/content/headers.json`)
      .then((response) => response.json())
      .then((data) => {
        header = data[this.props.id];
      });

    let p2 = fetch(process.env.PUBLIC_URL + `/content/${this.props.id}.json`)
      .then((response) => response.json())
      .then((value) => {
        list = value;
      });

    Promise.all([p, p2]).then(() => {
      this.setState({
        header: header,
        list: list,
      });
    });
  }

  render() {
    let list;

    if (this.props.element) {
      const ListItem = this.props.element;
      list = this.state.list.map((item, index) => {
        return <ListItem key={index} item={item} />;
      });
    } else {
      list = this.state.list.map((item, index) => {
        return <li key={index}>{item.toString()}</li>;
      });
    }

    return (
      <Section {...this.props} header={this.state.header} h="h2">
        <ul>{list}</ul>
      </Section>
    );
  }
}

export function Gallery(props) {
  const images = props.imgs.map((img, index) => (
    <figure key={index}>
      <a href={img.src} target="_blank" rel="noreferrer">
        <img src={img.src} alt={img.caption} />
      </a>
      <figcaption>{img.caption}</figcaption>
    </figure>
  ));

  return (
    <div id={`gallery-${props.id}`} className="article-gallery">
      {images}
    </div>
  );
}

export default App;
