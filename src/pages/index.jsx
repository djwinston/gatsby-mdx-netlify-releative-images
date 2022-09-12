import * as React from "react"
import { StaticImage, getImage, GatsbyImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  img: {
    width: "50%",
  },
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: "#663399",
}
const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

const hr = {
  border: 0,
  clear: "both",
  width: "96%",
  backgroundColor: "red",
  height: "1px",
}

// markup
const IndexPage = ({ data }) => {
  console.log(`TCL>>> ~ data`, data)
  const images = data.allMdx.nodes[0].frontmatter
  const image1 = getImage(images.featuredImage)
  const image2 = getImage(images.mainPostImage)
  const image3 = getImage(images.postImage)
  const pageBody = data.allMdx.nodes[0].body
  // console.log(`TCL>>> ~ pageBody`, pageBody)
  // console.log(`TCL>>> ~ images`, images)
  const myParagraph = (props) => <p style={{ backgroundColor: "yellow" }} {...props} />
  const myImg = (props) => {
    console.log("img props", props.src)
    // const src = props.src
    // const pathSrc = "../../static/img/mahsa-gholami-4x8liUBelKo-unsplash.jpg"
    //<StaticImage /* src={src} alt={props.alt} */ {...props} />
    return (
      <>
        <img style={{ width: "100%" }} {...props} alt="random props" />
      </>
    )
  }
  const components = {
    p: myParagraph,
    img: myImg,
  }
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        Congratulations
        <br />
        <span style={headingAccentStyles}>— you just made a Gatsby site! </span>
        <span role="img" aria-label="Party popper emojis">
          🎉🎉🎉
        </span>
      </h1>
      <p style={paragraphStyles}>
        Edit <code style={codeStyles}>src/pages/index.js</code> to see this page update in real-time.{" "}
        <span role="img" aria-label="Sunglasses smiley emoji">
          😎
        </span>
      </p>
      <img
        alt="Gatsby G Logo"
        src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <StaticImage width={1000} quality="100" src="../images/moncell-allen-NJP21VtDrZQ-unsplash.jpg" alt="sexy" />
        <div>
          <StaticImage width={500} quality="100" src="../images/roman-khripkov-HxIJP-yFLyQ-unsplash.jpg" alt="sexy" />
          <StaticImage width={500} quality="100" src="../images/garin-chadwick-XNf_s_upjso-unsplash.jpg" alt="sexy" />
          <StaticImage width={500} quality="100" src="../images/dave-goudreau-MJ2zd_OfxSw-unsplash.jpg" alt="sexy" />
        </div>
      </div>
      <hr style={hr} />
      <div style={{ textAlign: "center" }}>DYNAMIC IMAGES</div>
      <hr style={hr} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <GatsbyImage image={image1} alt="page image1" />
        <GatsbyImage image={image2} alt="page image2" />
        <GatsbyImage image={image3} alt="page image3" />
      </div>
      <hr style={hr} />
      <div style={{ textAlign: "center" }}>PAGE MDX CONTENT</div>
      <hr style={hr} />
      <div style={{ width: "100%" }}>
        <MDXProvider components={components}>
          <MDXRenderer data={data}>{pageBody}</MDXRenderer>
        </MDXProvider>
      </div>
    </main>
  )
}

export default IndexPage

export const query = graphql`
  query HomePageQuery {
    allMdx(filter: { frontmatter: { templateKey: { eq: "mdx-content" } } }) {
      nodes {
        frontmatter {
          featuredPost
          featuredImage {
            publicURL
            absolutePath
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                webpOptions: { quality: 95 }
                quality: 95
                breakpoints: [360, 768, 1024]
              )
            }
            relativePath
          }
          mainPostImage {
            publicURL
            absolutePath
            relativePath
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                webpOptions: { quality: 95 }
                quality: 95
                breakpoints: [360, 768, 1024]
              )
            }
          }
          postImage {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                webpOptions: { quality: 95 }
                quality: 95
                breakpoints: [360, 768, 1024]
              )
            }
          }
        }
        fileAbsolutePath
        internal {
          type
        }
        body
      }
    }
  }
`
