import {
    GET_MAGAZINES,
    GET_FEED,
    GET_NEWSPAPERS,
} from '../Actions/ActionTypes';

import update from 'react-addons-update';

const initialState = {
    feed: [],
    newspapers: [],
    magazines: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_FEED:
            return update(state, {
                feed: {$push: [action.feed]},
            });
        case GET_MAGAZINES:
            return update(state, {
                magazines: {$push: [action.magazines]},
            });
        case GET_NEWSPAPERS:
            return update(state, {
                newspapers: {$push: [action.newspapers]},
            });
        default:
            return state;
    }
};

export default reducer;
