import React, { useRef, useEffect } from "react";
//gsap imports
import { TimelineMax, Power0 } from "gsap";

import "./soulStyle.css";


const Breathing = (props) => {

  let breathing = useRef(null);

  let status = props.playStatus == "PLAYING";

  console.log("STATUS", status);

  useEffect(() => {
    const b = breathing;
    const tl = new TimelineMax({ repeat: -1, repeatDelay: 2 });
    tl.to(b, 3, { opacity: 1, scale: 2.5, ease: Power0.ease, repeat: 1, yoyo: true, paused: false }); //paused: true
  }, []);


  return (
    < div >
      < div id="breathCircle" ref={el => breathing = el} style={status ? { display: "block" } : { display: "none" }}></div >
    </div >
  )

}

export default Breathing; 