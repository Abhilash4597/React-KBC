/* eslint-disable react/prop-types */
import { useRef } from "react";

export default function Start({ setUserName }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUserName(inputRef.current.value);
  };
  return (
    <div className="start">
      <input
        placeholder="Enter Your Name"
        className="startInput"
        ref={inputRef}
      />
      <button className="startBtn" onClick={handleClick}>
        Start
      </button>
    </div>
  );
}
