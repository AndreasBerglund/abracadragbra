import { useState, DragEvent, MouseEvent } from "react";
import { nanoid } from "nanoid";
import DragBox from "./DragBox";
import Button from "./Button";
import Wand from "./Wand";
const DragField = () => {
  const [wandPosition, setWandPosition] = useState({ x: 0, y: 0 });
  const [selectedBox, setSelectedBox] = useState("");
  const [boxes, setBoxes] = useState([nanoid()]);

  const handleSelectBox = (id: string) => {
    setSelectedBox(id);
  };

  const handleAddBox = () => {
    setBoxes([...boxes, nanoid()]);
  };

  const handleDeselect = () => {
    setSelectedBox("");
  };

  const handleRemove = () => {
    if (!!selectedBox) {
      setBoxes(boxes.filter((box) => box !== selectedBox));
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    //Prevent onDrag to reset clientX, clientY on end
    event.preventDefault();
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    setWandPosition({ x: event.clientX, y: event.clientY });
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",

        display: "flex",
        flexDirection: "column",
        background: "#efefef",
      }}
      onDragOver={handleDragOver}
      onClick={handleDeselect}
      onMouseMove={handleMouseMove}
    >
      <div style={{ flex: 1, cursor: "none" }}>
        <Wand x={wandPosition.x} y={wandPosition.y} />
        {boxes.map((box) => (
          <DragBox
            numBoxes={boxes.length}
            key={box}
            id={box}
            isSelected={selectedBox === box}
            onSelect={handleSelectBox}
          />
        ))}
      </div>

      <div
        style={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          isDisabled={false}
          buttonText="ADD BOX"
          handleClick={handleAddBox}
        />

        <Button
          isDisabled={!selectedBox}
          buttonText="REMOVE BOX"
          handleClick={handleRemove}
        />
      </div>
    </div>
  );
};

export default DragField;
