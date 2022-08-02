/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header"
import '../styles/styles.scss';


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main style={{marginLeft: 60, marginRight: 60}}
          >{children}</main>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
            marginLeft: 60,
          }}
        >
          Connect with me on <a className="link" href={`https://www.linkedin.com/in/kofi-ansong-89294016a/`}>linkedin</a>, <a className="link" href={`https://github.com/kansong99`}>github</a>, or email me at kaansong1[at]gmail[dot]com!
        </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
