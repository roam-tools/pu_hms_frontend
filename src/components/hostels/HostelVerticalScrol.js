import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import useDrag from "../../hooks/useDrag";
import { Hostel } from "../hostel/Hostel";
import "./hostels.css";
export const HostelVerticalScrol = ({ hostels, title }) => {
  const { dragStart, dragStop, dragMove } = useDrag();
  const handleDrag = (scrollContainer) => (ev) =>
    dragMove(ev, (posDiff) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += posDiff;
      }
    });

  return (
    <div className="container p-0">
      <h1 className="intro-y puc-hostels-header">{title || "Featured"}</h1>

      <div onMouseLeave={dragStop} className="puc-hostels-vertical">
        <ScrollMenu
          onWheel={onWheel}
          onMouseDown={() => dragStart}
          onMouseUp={() => dragStop}
          onMouseMove={handleDrag}
        >
          {hostels?.map((hostel, index) => (
            <Hostel key={index} hostel={hostel} />
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
};

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
