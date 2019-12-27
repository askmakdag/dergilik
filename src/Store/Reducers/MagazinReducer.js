import {
    GET_MAGAZINS,
} from '../Actions/ActionTypes';

import update from 'react-addons-update';

const initialState = {

    /*** Kullanıcının şu anda ziyaret ettiği profilin bilgileri ... */
    magazins: [],

};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_MAGAZINS:
            return update(state, {
                magazins: {$push: [action.magazins]},
            });

        default:
            return state;
    }
};

export default reducer;
