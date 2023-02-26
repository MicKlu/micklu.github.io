import "./css/Nav.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import React from "react";

function Nav() {
  const [collapsed, setCollapsed] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setCollapsed(true);
  }, [location]);

  const navLinks = (
    <>
      <li>
        <Link to={"/"}>O sobie</Link>
      </li>
      <li>
        <Link to={"projects"}>Projekty</Link>
      </li>
      <li>
        <a href="https://github.com/MicKlu">GitHub</a>
      </li>
    </>
  );

  const uiLinks = (
    <>
      {/* <li>
        <a href="#">PL</a>
      </li> */}
    </>
  );

  return (
    <nav>
      <ul id="nav-links">{navLinks}</ul>
      <ul id="ui-links">{uiLinks}</ul>
      <button
        className="toggle-button"
        onClick={() => {
          setCollapsed(!collapsed);
        }}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul
        id="collapsible-links"
        className={collapsed ? "collapsed" : undefined}
        style={{
          height: collapsed
            ? 0
            : `${React.Children.count(navLinks.props.children) * 4}rem`,
        }}>
        {navLinks}
      </ul>
    </nav>
  );
}

export default Nav;
