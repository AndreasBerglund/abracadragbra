interface WandInterface {
  x: number;
  y: number;
}

const Wand = ({ x, y }: WandInterface) => {
  return (
    <div
      style={{
        width: 60,
        height: 60,

        background: "url('wand.png')",
        backgroundSize: "100%",
        position: "absolute",
        left: x - 30,
        top: y - 30,
        zIndex: 10,
        pointerEvents: "none",
      }}
    ></div>
  );
};

export default Wand;
