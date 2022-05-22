import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title=""/>
    <div className="index">
      <div className="index__photo">
        <StaticImage
        src="../images/site_photo.jpeg"
        loading="eager"
        width={230}
        quality={95}
        alt=""
        deaggable={true}/>
      </div>
      <div className="index__blurb">
        <p>
       Hello, my name is Kofi Ansong. I am 23 years old, and currently work as a software engineer at  <a href={`https://www.promise-pay.com/`}>Promise-Pay</a>.</p>
       <p>Outside of work, I like exercising, roller skating, and writing. </p>
      </div>

    </div>
  </Layout>
)


export default IndexPage
