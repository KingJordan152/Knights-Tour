import { useEffect, useState } from "react";
import "./Board.modules.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

/* interface BoardProps {
  
} */

const Board = () => {
  /* interface Square {
    hasKnight: Boolean;
  } */

  const [squares, setSquares] = useState<String[][]>([]);
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
      let tempSquares: String[][] = [...squares];

      for (let row: number = 0; row < ROWS; row++) {
        tempSquares.push([]); // Push a new row.
        for (let col: number = 0; col < COLUMNS; col++) {
          let colLetter: String = String.fromCharCode(col + 65); // Determines the letter that corresponds to the column index.
          tempSquares[row].push(`${colLetter}${row + 1}`); // Push a new column with this letter-number naming convention.
        }
      }

      setSquares(tempSquares);
    }
  }, [squares]);

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

  return (
    <DragDropContext onDragEnd={() => console.log("balls")}>
      <div>
        <div className='board-container'>
          {squares.map((rowItem, row) => {
            return rowItem.map((square, col) => (
              <Droppable key={row + col} droppableId={`${square}`}>
                {(provided) => (
                  <div
                    style={{
                      backgroundColor: `${handleSquareColor(row, col)}`,
                    }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  ></div>
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
