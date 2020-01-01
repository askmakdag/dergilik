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
            const items = [];

            for (let i = 0; i < action.feed.length; i++) {
                if (i % 2 === 0) {
                    if (typeof action.feed[i + 1] !== 'undefined') {
                        items.push([action.feed[i], action.feed[i + 1]]);
                    } else {
                        items.push([action.feed[i]]);
                    }
                }
            }

            return update(state, {
                feed: {$push: [items]},
            });

        case GET_MAGAZINES:
            const magazine_items = [];

            for (let i = 0; i < action.magazines.length; i++) {
                if (i % 2 === 0) {
                    if (typeof action.magazines[i + 1] !== 'undefined') {
                        magazine_items.push([action.magazines[i], action.magazines[i + 1]]);
                    } else {
                        magazine_items.push([action.magazines[i]]);
                    }
                }
            }

            return update(state, {
                magazines: {$push: [magazine_items]},
            });

        case GET_NEWSPAPERS:
            const newspaper_items = [];

            for (let i = 0; i < action.newspapers.length; i++) {
                if (i % 2 === 0) {
                    if (typeof action.newspapers[i + 1] !== 'undefined') {
                        newspaper_items.push([action.newspapers[i], action.newspapers[i + 1]]);
                    } else {
                        newspaper_items.push([action.newspapers[i]]);
                    }
                }
            }

            return update(state, {
                newspapers: {$push: [newspaper_items]},
            });

        default:
            return state;
    }
};

export default reducer;
