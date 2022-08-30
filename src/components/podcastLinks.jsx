import React from "react";

import PodcastSpotify from "../assets/podcastSpotify.svg";

import Pocketcasts from "../assets/pocketcasts.png";
import Itunes from "../assets/itunes.png";
import GooglePodcast from "../assets/google_podcasts.svg";
import Rss from "../assets/rss.svg";
import Overcast from "../assets/overcast.png";

function PodcastLinks() {
  return (
    <div className="follow-us">
      {/* <a className="btn-social btn-spotify" target="_blank" rel="noreferrer" href="https://open.spotify.com/">
        <img alt="spotify button" src={PodcastSpotify} />
        <span>Spotify</span>
      </a>
      <a className="btn-social btn-pocketcasts" target="_blank" rel="noreferrer" href="https://pca.st">
        <img alt="pocket casts button" src={Pocketcasts} />
        <span>Pocketcasts</span>
      </a>
      <a className="btn-social btn-itunes" target="_blank" rel="noreferrer" href="https://podcasts.apple.com/">
        <img alt="itunes button" src={Itunes} />
        <span>iTunes</span>
      </a>
      <a className="btn-social btn-googlepodcasts" target="_blank" rel="noreferrer" href="https://podcasts.google.com/">
        <img alt="google podcast button" src={GooglePodcast} />
        <span>Google Podcast</span>
      </a>
      <a className="btn-social btn-overcasts" target="_blank" rel="noreferrer" href="https://overcast.fm/">
        <img alt="overcast button" src={Overcast} />
        <span>Overcast</span>
      </a> */}
      <a className="btn-social btn-rss" target="_blank" rel="noreferrer" href="https://kofiansong.com/rss.xml">
        <img alt="rss button" src={Rss} />
        <span>RSS</span>
      </a>
    </div>
  );
}

export default PodcastLinks;
