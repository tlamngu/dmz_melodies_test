import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ITEM_TYPE = 'MUSIC_CARD';

const DragWrapper = ({ children, index, moveCard }) => {
    const [, ref] = useDrag({
        type: ITEM_TYPE,
        item: { index },
    });

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item) {
            if (item.index !== index) {
                moveCard(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div ref={(node) => ref(drop(node))}>
            {children}
        </div>
    );
};

export default DragWrapper;
