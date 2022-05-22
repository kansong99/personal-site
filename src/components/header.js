import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header>
    <div className="header_logo">
      <h1>
      <Link
      to="/">
      {siteTitle}
    </Link>
      </h1>
    </div>
    <nav>
      <Link to="/blog">Blog</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/media">My media</Link>
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
