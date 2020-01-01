import {
    GET_MAGAZINES,
    GET_FEED,
    GET_NEWSPAPERS,
} from '../Actions/ActionTypes';

import update from 'react-addons-update';

const initialState = {
    feed: [],
    sorted_feed: [],

    newspapers: [],
    sorted_newspapers: [],

    magazines: [],
    sorted_magazines: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_FEED:
            const items = [];
            console.log('get feed: ', action.feed);

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
                sorted_feed: {$set: items},
                feed: {$set: action.feed},
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
                magazines: {$set: action.magazines},
                sorted_magazines: {$set: magazine_items},
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
                newspapers: {$set: action.newspapers},
                sorted_newspapers: {$set: newspaper_items},
            });

        default:
            return state;
    }
};

export default reducer;
