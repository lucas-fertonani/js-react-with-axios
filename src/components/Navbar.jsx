import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>
        <Link to={`/`}>Blog</Link>
      </h2>
      <ul>
        <li>
          <Link to={`/home`} className="new-home">
            Home
          </Link>
        </li>
        <li>
          <Link to={`/new`} className="new-btn">
            NewPost
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
