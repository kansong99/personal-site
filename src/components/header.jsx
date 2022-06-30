import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import '../styles/styles.scss';

const Header = ({ siteTitle }) => (
  <header>
    <div className="header_logo">
      <h3>
      <Link className="link"
      to="/">
      {siteTitle}
    </Link>
      </h3>
    </div>
    <nav>
      <Link className="link" to="/blog">Blog</Link>
      <Link className="link" to="/projects">Projects</Link>
      <Link className="link" to="/media">My media</Link>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
