import express from "express";
import cors from "cors";
import { Chess } from "chess.js";
import { getBestBlackMove } from "./utils/minimax";

const app: express.Application = express();

const port: number = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "TypeScript With Express" });
});

app.post("/best_black_move", (req, res) => {
  let fen: string = req.body["fen"];
  console.log(`Recieved request:${fen}`);
  let game: Chess = new Chess(fen);
  const move = getBestBlackMove(game, 3);
  console.log(move);
  res.json(move);
});

app.listen(port, () => {
  console.log(`Express server running on port ${port}/`);
});
