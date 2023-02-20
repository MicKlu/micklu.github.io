import "./css/Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul id="nav-links">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"projects"}>Projects</Link>
        </li>
        <li>
          <a href="https://github.com/MGRINZ">GitHub</a>
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
