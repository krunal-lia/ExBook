import React from 'react';

const fullBookDisplay = (props) => {
    return (
        <div>
            <h1>{props.match.params.id}</h1>
        </div>
    )
}

export default fullBookDisplay;