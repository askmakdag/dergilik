import {
    GET_MAGAZINES,
    GET_FEED,
    GET_NEWSPAPERS,
} from './ActionTypes';

export const add_feed = (feed) => {
    return {
        type: GET_FEED,
        feed: feed,
    };
};

export const add_magazine = (magazines) => {
    return {
        type: GET_MAGAZINES,
        magazines: magazines,
    };
};

export const add_newspaper = (newspapers) => {
    return {
        type: GET_NEWSPAPERS,
        newspapers: newspapers,
    };
};
