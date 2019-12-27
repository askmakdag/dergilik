import {
    GET_MAGAZINS,
} from './ActionTypes';

export const add_magazin = (magazins) => {
    return {
        type: GET_MAGAZINS,
        magazins: magazins,
    };
};
