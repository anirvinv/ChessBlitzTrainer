# Chess Blitz Trainer

A mediocre chess engine that is bad at openings and better at middle and endgames.

![gif didnt load](https://media.giphy.com/media/ZAfU27v5pqyS8Vr6Sn/giphy.gif)

(The bot is black)

## Features:
- Uses the minimax algorithm with alpha beta pruning to search for moves
- Depending on the board evaluations and number of possible moves, the depth of the search tree is dynamically increased
  - Reason: When there are not many moves to choose from, search tree is narrow. Thus, the depth can be increased to dramatically improve performance
  - Could improve results for endgames 
- Currently, the max guaranteed search depth is 3 ignoring the dynamic adjustments


## Build/Run
1. Clone the repo 
2. ```npm install``` in both directories
3. Run two processes:
   1. ```npm run dev``` in chessbot-frontend/
   2. ```npm start``` in move-service/

## Todo:
- Add timed games functionality
