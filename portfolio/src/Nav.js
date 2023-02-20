import "./css/Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul id="nav-links">
        <li>
          <Link to={"/"}>O sobie</Link>
        </li>
        <li>
          <Link to={"projects"}>Projekty</Link>
        </li>
        <li>
          <a href="https://github.com/MicKlu">GitHub</a>
        </li>
      </ul>
      <ul id="ui-links">
        {/* <li>
          <a href="#">PL</a>
        </li> */}
      </ul>
    </nav>
  );
}

export default Nav;
