import "./Knight.css";
import KnightSrc from "../../assets/Knight.png";
import { Draggable } from "react-beautiful-dnd";

const Knight = () => {
  return (
    <Draggable draggableId='Knight' index={0}>
      {(provided) => (
        <div
          className='knight-wrapper'
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <img
            className='knight-piece'
            src={KnightSrc}
            alt='Knight Chess piece.'
          />
        </div>
      )}
    </Draggable>
  );
};

export default Knight;
