import React from 'react'

const IdShorterComponent = ({ id, model }: { id: string, model: string }) => {
    return (
        <span className="font-mono">
            {id ? `${model}-${id.slice(-3).toUpperCase()}` : "-"}
        </span>
    );
};

export default IdShorterComponent;