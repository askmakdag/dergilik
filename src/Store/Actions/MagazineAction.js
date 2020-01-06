import {
    GET_MAGAZINES,
    GET_FEED,
    GET_NEWSPAPERS,
    SAVE,
    GET_ALL_SAVED,
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

export const save_item = (saved_item) => {
    return {
        type: SAVE,
        saved_item: saved_item,
    };
};

export const get_all_saved = (all_saved) => {
    return {
        type: GET_ALL_SAVED,
        all_saved: all_saved,
    };
};
