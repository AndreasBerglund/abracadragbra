import { useState, DragEvent } from "react";
import { nanoid } from "nanoid";
import DragBox from "./DragBox";
import Button from "./Button";

const DragField = () => {
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

  return (
    <div
      style={{
        width: "100%",
        height: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: "#efefef",
      }}
      onDragOver={handleDragOver}
      onClick={handleDeselect}
    >
      {boxes.map((box) => (
        <DragBox
          key={box}
          id={box}
          isSelected={selectedBox === box}
          onSelect={handleSelectBox}
        />
      ))}
      {/* <div style={{ flex: 1, background: "red" }}>
      </div> */}

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
          buttonText="ADD A CARD"
          handleClick={handleAddBox}
        />

        <Button
          isDisabled={!selectedBox}
          buttonText="REMOVE A CARD"
          handleClick={handleRemove}
        />
      </div>
    </div>
  );
};

export default DragField;
