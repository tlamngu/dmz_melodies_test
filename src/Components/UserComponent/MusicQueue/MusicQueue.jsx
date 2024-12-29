import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './MusicQueue.css';
import DragWrapper from '../DragWrapper/DragWrapper';

const MusicQueue = ({ initialQueue = [], children }) => {
    const [queue, setQueue] = useState(initialQueue);

    const moveCard = (dragIndex, hoverIndex) => {
        const dragItem = queue[dragIndex];
        const updatedQueue = [...queue];
        updatedQueue.splice(dragIndex, 1);
        updatedQueue.splice(hoverIndex, 0, dragItem);
        setQueue(updatedQueue);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="music-queue">
                {queue.map((track, index) => (
                    <DragWrapper key={track.id} index={index} moveCard={moveCard}>
                        {React.cloneElement(children, { ...track })}
                    </DragWrapper>
                ))}
            </div>
        </DndProvider>
    );
};

export default MusicQueue;
