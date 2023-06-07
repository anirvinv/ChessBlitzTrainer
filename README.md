# Chess Blitz Trainer

A mediocre chess engine that is bad at openings and better at middle and endgames.

![gif didnt load](https://media.giphy.com/media/ZAfU27v5pqyS8Vr6Sn/giphy.gif)

Try it out [here](https://main.d25p17b19pzykd.amplifyapp.com/)

(The bot is black)

## Features:
- Uses the minimax algorithm with alpha beta pruning to search for moves
- Depending on the board evaluations and number of possible moves, the depth of the search tree is dynamically increased
  - Reason: When there are not many moves to choose from, search tree is narrow. Thus, the depth can be increased to dramatically improve performance
  - Could improve results for endgames 
- Currently, the max guaranteed search depth is 3 ignoring the dynamic adjustments

## Todo:
- Add timed games functionality
