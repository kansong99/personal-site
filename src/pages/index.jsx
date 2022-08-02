import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" keywords={[`Kofi`, `Ansong`, `blog`, `projects`, `media`,]}/>
    <div className="index">
      {/* <div className="index__photo">
        <StaticImage
        src="../images/site_photo.jpeg"
        loading="eager"
        width={230}
        quality={95}
        alt=""
        draggable={true}/>
      </div> */}
      <div className="index__blurb">
        <p>
       Hello, my name is Kofi Ansong, and I am a web developer based in San Francisco. I am currently building tools to help people pay debts owed to the govenrment at <a className="link" href={`https://www.promise-pay.com/`}>Promise-Pay</a>.</p>
       <p>Outside of work, I like exercising, roller skating, and writing. </p>
      </div>

    </div>
  </Layout>
)


export default IndexPage
