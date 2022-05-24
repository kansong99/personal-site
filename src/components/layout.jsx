/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { createTheme, ThemeProvider} from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";

import Header from "./header"
import '../styles/styles.scss';

const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      pearl: '#eae0c8'
    }
  }
})

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
      <ThemeProvider theme={darkTheme}
       
      >
        <CssBaseline/>
        <main>{children}</main>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
          }}
        >
          <p>kaansong1[at]gmail[dot]com</p>
          <p>
          © {new Date().getFullYear()} &middot; Built with
          {` `}
          <a className="link" href="https://www.gatsbyjs.com">Gatsby</a>
          </p>
        </footer>
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
