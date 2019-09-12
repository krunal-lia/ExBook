import React from 'react';

import BookStack from '../BookStack/BookStack';

const allbooks = (props) => {
    return (
        <React.Fragment>
            <BookStack books={[4,5,6]} heading="latest"/>
            <BookStack books={[1,2,3]}heading="retro"/>
            <BookStack books={[3,6,4]} heading="best deals"/>
            <BookStack books={[2,5,1]} heading="latest"/>
        </React.Fragment>
    )
}


export default allbooks;