import React from "react";
import { Link } from "gatsby";
import moment from "moment";
import podcastImg from "../images/kofi_dolapo_podcast_art.png";

function PostListing(props) {
  const getPostList = () => {
    const postList = [];
    props.postEdges.forEach((postEdge) => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
        shortDescription: postEdge.node.frontmatter.shortDescription,
        episodeNumber: postEdge.node.frontmatter.episodeNumber,
        description: postEdge.node.fields.description,
      });
    });
    return postList;
  };
  const postList = getPostList();
  return (
    <section className="cc-container post-listing-container">
      <div className="cc-podcast-wrapper">
        {postList.map((post, index) => {
          let formattedEpisodeNumber;
          if (post.episodeNumber < 10) {
            formattedEpisodeNumber = `00${post.episodeNumber}`;
          } else if (post.episodeNumber < 100) {
            formattedEpisodeNumber = `0${post.episodeNumber}`;
          }
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`podcast-${index}`} className="podcast-wrapper cc-card mb-7">
              <Link to={post.path} className="podcast-episode">
                <div className="podcast-number">
                  {formattedEpisodeNumber}
                </div>
                <div className="cc-padding">
                  <svg>
                    <rect />
                  </svg>
                  <div className="podcast-inner-card">
                    <div className="podcast-image-left">
                      <div className="portrait-hat">
                        <img className="portrait-img" src={podcastImg} alt="kofi and dolapo" />
                      </div>
                    </div>
                    <div className="podcast-content-right">
                      <div className="podcast-title">{post.title}</div>
                      <p>{moment(post.date).format("ll")}</p>
                      <p className="mt-0 short description">{post.shortDescription}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default PostListing;
