import { DragEvent, MouseEvent, TouchEvent, useState } from "react";

interface DragBoxInterface {
  id: string;
  isSelected: boolean;
  onSelect: Function;
}

const DragBox = ({ id, isSelected, onSelect }: DragBoxInterface) => {
  const [dragPoint, setDragPoint] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dimension = { width: 200, height: 200 }; //width and height in pixels
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - dimension.width / 2,
    y: window.innerHeight / 2 - dimension.height / 2,
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
        background: "#ccc",
        position: "absolute",
        // padding: 20,
        top: position.y,
        left: position.x,
        boxShadow: isDragging ? "2px 2px 15px #333" : "none",
        outline: isSelected ? "5px solid #333" : "1px solid #333",
        zIndex: isDragging || isSelected ? 1 : 0,
      }}
    >
      <p>{id}</p>
      <p>
        {position.x}, {position.y}
      </p>

      <div
        style={{
          width: 10,
          height: 10,
          background: "black",
          borderRadius: 10,
          position: "absolute",
          left: dragPoint.x,
          top: dragPoint.y,
        }}
      ></div>
    </div>
  );
};

export default DragBox;
