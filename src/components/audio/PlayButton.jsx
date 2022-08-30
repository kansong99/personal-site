import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format"; // plugin used on momentJS to give it `format` methods
import playSvg from "../../assets/play.svg";
import pauseSvg from "../../assets/pause.svg";

momentDurationFormatSetup(moment);

function formatDuration(duration) {
  return moment.duration(duration, "seconds").format("mm:ss", { trim: false });
}

export default function PlayButton({
  playing,
  curTime,
  duration,
  toggleAudio,
}) {
  return (
    <div
      className="cc-play p-3 noselect"
      onClick={() => toggleAudio()}
    >
      <div className="cc-play_button">
        <img src={playing ? pauseSvg : playSvg} alt="play button" />
      </div>
      <div className="duration-ratio">
        <span>{formatDuration(curTime)}</span>
        {" "}
        /

        <span>{formatDuration(duration)}</span>
      </div>
    </div>
  );
}
