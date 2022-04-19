const LOAD_FAVE_STIM_AIDS = 'fave_stim_aids/LOAD_FAVE_STIM_AIDS';
const ADD_FAVE_STIM_AID = 'fave_stim_aids/ADD_FAVE_STIM_AID';
const REMOVE_FAVE_STIM_AID = 'fave_stim_aids/REMOVE_FAVE_STIM_AID';

const loadFaveStimAids = (favoriteStimAids) => {
    return {
        type: LOAD_FAVE_STIM_AIDS,
        favoriteStimAids
    };
};

const addFaveStimAid = (favoriteStimAid) => {
    return {
        type: ADD_FAVE_STIM_AID,
        favoriteStimAid
    };
};

const removeFaveStimAid = (favoriteId) => {
    return {
        type: REMOVE_FAVE_STIM_AID,
        favoriteId
    };
};

// GET /api/favorite_stim_aids
export const getFaveStimAids = () => async (dispatch) => {
    const res = await fetch('/api/favorite_stim_aids');

    if (res.ok) {
        const faveStimAids = await res.json();
        dispatch(loadFaveStimAids(faveStimAids.favorite_stim_aids));
    }

    return res;
};

// POST /api/favorite_stim_aids
export const favoriteAStimAid = (stimAid) => async (dispatch) => {
    const res = await fetch('/api/favorite_stim_aids', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stimAid)
    });

    if (res.ok) {
        const faveStimAid = await res.json();
        dispatch(addFaveStimAid(faveStimAid));
    }

    return res;
};

// DELETE /api/favorite_stim_aids/:id
export const unfavoriteAStimAid = (favoriteId) => async (dispatch) => {
    const res = await fetch(`/api/favorite_stim_aids/${favoriteId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        await dispatch(removeFaveStimAid(favoriteId));
    }

    return res;
};

const faveStimAids = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_FAVE_STIM_AIDS:
            newState = { ...state };
            action.favoriteStimAids.forEach(stimAid => {
                newState[stimAid.id] = stimAid;
            });
            return newState;
        case ADD_FAVE_STIM_AID:
            newState = { ...state };
            newState[action.favoriteStimAid.id] = action.favoriteStimAid;
            return newState;
        case REMOVE_FAVE_STIM_AID:
            newState = { ...state };
            delete newState[action.favoriteId];
            return newState;
        default:
            return state;
    }
};

export default faveStimAids;
