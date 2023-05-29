import Board from "./board";

export default function Home() {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-[600px] h-[600px]">
        <Board />
      </div>
    </div>
  );
}
