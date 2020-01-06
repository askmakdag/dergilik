import {
    GET_MAGAZINES,
    GET_FEED,
    GET_NEWSPAPERS,
    SAVE,
    GET_ALL_SAVED,
} from '../Actions/ActionTypes';

import update from 'react-addons-update';

const initialState = {
    feed: [],

    newspapers: [],

    magazines: [],

    saved: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_FEED:
            return update(state, {
                feed: {$set: action.feed},
            });

        case GET_MAGAZINES:
            return update(state, {
                magazines: {$set: action.magazines},
            });

        case GET_NEWSPAPERS:
            return update(state, {
                newspapers: {$set: action.newspapers},
            });

        case SAVE:
            return update(state, {
                saved: {$push: [action.saved_item]},
            });

        case GET_ALL_SAVED:
            return update(state, {
                saved: {$set: action.all_saved},
            });

        default:
            return state;
    }
};

export default reducer;
