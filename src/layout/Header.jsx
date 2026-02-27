import statusImage from "@/assets/images/statusbar.png";

export default function Header({ scale = 1 }) {
  return (
    <div
      className="flex justify-between items-center px-[20px] shrink-0"
      style={{ width: `${265 * scale}px`, height: `${20 * scale}px` }}
    >
      <div
        className="flex items-center justify-center text-white font-bold tracking-[1px]"
        style={{
          width: `${54 * scale}px`,
          height: `${13 * scale}px`,
          lineHeight: "100%",
          fontSize: `${10 * scale}px`,
        }}
      >
        9:41
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 bg-black flex items-center justify-end"
        style={{
          width: `${70 * scale}px`,
          height: `${20 * scale}px`,
          borderBottomLeftRadius: `${10 * scale}px`,
          borderBottomRightRadius: `${10 * scale}px`,
          borderTopLeftRadius: `${10 * scale}px`,
          borderTopRightRadius: `${10 * scale}px`,
        }}
      >
        <div
          className="bg-zinc-800 rounded-full"
          style={{
            width: `${12 * scale}px`,
            height: `${12 * scale}px`,
            marginRight: `${8 * scale}px`,
          }}
        />
      </div>

      <div
        className="flex justify-end items-center"
        style={{ width: `${54 * scale}px`, height: `${15 * scale}px` }}
      >
        <img
          src={statusImage}
          alt="status"
          style={{
            width: `${54 * scale}px`,
            height: `${15 * scale}px`,
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}
