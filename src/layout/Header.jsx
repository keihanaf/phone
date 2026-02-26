import statusImage from "@/assets/images/statusbar.png";

export default function Header() {
  return (
    <div
      className="flex justify-between items-center px-[20px] shrink-0"
      style={{ width: "265px", height: "20px" }}
    >
      <div
        className="flex items-center justify-center text-white text-[10px] font-bold tracking-[1px]"
        style={{ width: "54px", height: "13px", lineHeight: "100%" }}
      >
        9:41
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 bg-black flex items-center justify-end"
        style={{
          width: "70px",
          height: "20px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <div
          className="bg-zinc-800 rounded-full mr-2"
          style={{ width: "12px", height: "12px" }}
        />
      </div>

      <div
        className="flex justify-end items-center"
        style={{ width: "54px", height: "15px" }}
      >
        <img
          src={statusImage}
          alt="status"
          style={{ width: "54px", height: "15px", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
