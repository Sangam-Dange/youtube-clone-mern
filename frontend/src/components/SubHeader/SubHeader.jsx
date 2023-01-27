import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./SubHeader.scss";

const data = [
  "All",
  "Gaming",
  "GTA-V",
  "Kapil Sharma",
  "Comedy",
  "Music",
  "Legos",
  "Mixes",
  "Programming",
  "Scene",
  "Live",
  "Stealth games",
  "SuperHeroes",
  "Sculpture",
  "Street Food",
  "Racing video games",
  "Live",
  "Stealth games",
  "SuperHeroes",
  "Sculpture",
];

function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

const SubHeader = () => {
  const scrollRef = useHorizontalScroll();
  const [currTab, setCurrTab] = useState("All");

  return (
    <div className="sub__wrapper " ref={scrollRef}>
      {data.map((x, i) => {
        return (
          <div
            className={currTab === x ? `toggleSelect` : " "}
            key={i}
            onClick={() => setCurrTab(x)}
          >
            <p>{x}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SubHeader;
