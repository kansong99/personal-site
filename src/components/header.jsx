import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import '../styles/styles.scss';

function Header({ siteTitle }) {
  return (
    <header>
      <div className="header_logo">
        <h3>
          <Link
            className="link"
            to="/"
          >
            {siteTitle}
          </Link>
        </h3>
      </div>
      <nav>
        {/* <Link className="link" to="/blog">Blog</Link> */}
        <Link className="link" to="/projects">Projects</Link>
        <Link className="link" to="/media">Media</Link>
        <Link className="link" to="/blog">Blog</Link>
        <Link className="link" to="/podcast">Podcast</Link>
      </nav>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
