import { useEffect, useState, useCallback } from "react";
import "./Board.css";
import Knight from "../Knight/Knight";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board = () => {
  /**
   * Data pertaining to each square on the chess board.
   */
  interface Square {
    /** Unique identifier for each square (i.e. "E5" or "A1"). */
    id: string;
    /** Signifies whether the knight is positioned at the square. */
    hasKnight: Boolean;
  }

  const [squares, setSquares] = useState<Square[][]>([]);
  const ROWS = 8;
  const COLUMNS = 8;
  const lightSquareColor: String = "#FBD5A6";
  const darkSquareColor: String = "#D3AA73";

  /**
   * When the component initially mounts, populate the squares 2D array with the appropriate
   * number of indices, as indicated by the ROWS and COLUMNS constants.
   */
  useEffect((): void => {
    if (squares.length === 0) {
      let tempSquares: Square[][] = [...squares]; // Temporary copy of the squares state.
      const randRow: number = getRandomInt(0, ROWS - 1); // Used for placing the knight in a random location.
      const randCol: number = getRandomInt(0, COLUMNS - 1); // Used for placing the knight in a random location.

      for (let row: number = 0; row < ROWS; row++) {
        tempSquares.push([]); // Push a new row.
        for (let col: number = 0; col < COLUMNS; col++) {
          let colLetter: String = String.fromCharCode(col + 65); // Determines the letter that corresponds to the column index.
          tempSquares[row].push({
            id: `${colLetter}${ROWS - row}`,
            hasKnight: row === randRow && col === randCol,
          }); // Push a new column to the array.
        }
      }

      setSquares(tempSquares);
    }
  }, [squares]);

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
   * Gives the board its alternating color pallet for each square.
   * @param {number} row The row number the square belongs to.
   * @param {number} col The column number the square belongs to.
   * @returns The appropriate color the given square should have.
   */
  const handleSquareColor = (row: number, col: number): String => {
    if (row % 2 === 0) {
      return col % 2 === 0 ? lightSquareColor : darkSquareColor;
    } else {
      return col % 2 === 1 ? lightSquareColor : darkSquareColor;
    }
  };

  /**
   * Updates the position of the knight within the squares array whenever it is
   * moved to a different position. This is accomplished by changing the "hasKnight"
   * field of the square.
   */
  const handleKnightDragEnd = useCallback(
    (result: any) => {
      let tempSquares: Square[][] = [...squares]; // Temporary copy of the squares state.
      const destination: string = result.destination?.droppableId; // Square where the knight was placed.
      const source: string = result.source?.droppableId; // Square that the knight came from.

      // Must iterate through the entire array to find the square the knight was repositioned to.
      // Should technically be O(1) since the 2D array should almost always be 8x8 (or at least known).
      for (let row of tempSquares) {
        for (let col of row) {
          /* 
            Before changing the placement of the knight, ensure that:
            1) The destination is not the same as the source.
            2) The destination is not outside the board (i.e. invalid square).
            3) The source is not outside the board (i.e. invalid square).
            Failure to meet any of these conditions will cause the knight to disappear and become unusable.
          */
          if (destination !== source && destination && source) {
            if (col.id === destination) {
              col.hasKnight = true;
            }

            if (col.id === source) {
              col.hasKnight = false;
            }
          }
        }
      }

      setSquares(tempSquares);
    },
    [squares]
  );

  return (
    <DragDropContext onDragEnd={handleKnightDragEnd}>
      <div>
        <div className='board-container'>
          {squares.map((rowItem, row) => {
            return rowItem.map((square, col) => (
              <Droppable key={row + col} droppableId={square.id}>
                {(provided) => (
                  <div
                    className='square'
                    style={{
                      backgroundColor: `${handleSquareColor(row, col)}`,
                    }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {square.hasKnight && <Knight />}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ));
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

/* const Board = () => {
  return (
    <div className='board-container'>
      <DragDropContext onDragEnd={() => console.log("balls")}>
        <Droppable droppableId='col1'>
          
          {(provided) => (
            <div
              className='col'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Draggable key='Hello' draggableId='Hello' index={0}>
                {(provided) => (
                  <p
                    className='item'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    Hello
                  </p>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId='col2'>
          {(provided) => (
            <div
              className='col'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Draggable key='World' draggableId='World' index={0}>
                {(provided) => (
                  <p
                    className='item'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    World
                  </p>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}; */

export default Board;
