import { DragEvent, MouseEvent, useState } from "react";

interface DragBoxInterface {
  id: string;
  isSelected: boolean;
  onSelect: Function;
  numBoxes: number;
}

const DragBox = ({ id, isSelected, onSelect, numBoxes }: DragBoxInterface) => {
  const [dragPoint, setDragPoint] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dimension = { width: 300, height: 300 }; //width and height in pixels
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - dimension.width / 2 + 30 * numBoxes,
    y: window.innerHeight / 2 - dimension.height / 2 - 30 * numBoxes,
  });

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    // prevent propagation to DragField ( Makes it possible to deselect! )
    event.stopPropagation();
    onSelect(id);
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    onSelect(id);
    setIsDragging(true);
    setDragPoint({
      x: Math.abs(position.x - event.clientX),
      y: Math.abs(position.y - event.clientY),
    });
    //Hide drag image
    event.dataTransfer.setDragImage(new Image(), 0, 0);
  };
  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setPosition({
      x: event.clientX - dragPoint.x,
      y: event.clientY - dragPoint.y,
    });
  };
  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    setPosition({
      x: event.clientX - dragPoint.x,
      y: event.clientY - dragPoint.y,
    });
  };
  return (
    <div
      draggable={true}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        width: dimension.width,
        height: dimension.height,
        background: "linear-gradient(45deg, #00C9FF 0%, #92FE9D 100%)",
        position: "absolute",

        overflow: "hidden",
        top: position.y,
        left: position.x,
        borderRadius: 16,
        boxShadow: isDragging ? "2px 2px 15px #333" : "none",
        border: "10px solid #333",
        zIndex: isDragging || isSelected ? 1 : 0,
      }}
    >
      <div style={{ display: "none" }}>
        <p>{id}</p>
        <p>
          {position.x}, {position.y}
        </p>
      </div>

      {isSelected && (
        <>
          <span
            style={{
              width: "100%",
              height: "10px",
              position: "absolute",
              top: "50%",
              left: "50%",
              background: "#333",
              transform: "translate(-50%,-50%) rotate(45deg)",
            }}
          ></span>
          <span
            style={{
              width: "100%",
              height: "10px",
              position: "absolute",
              top: "50%",
              left: "50%",
              background: "#333",
              transform: "translate(-50%,-50%) rotate(-45deg)",
            }}
          ></span>
        </>
      )}
    </div>
  );
};

export default DragBox;
