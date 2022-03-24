const LOAD_STIM_AIDS = 'stim_aids/LOAD_STIM_AIDS';
const ADD_STIM_AID = 'stim_aids/ADD_STIM_AID';
const LOAD_STIM_AID = 'stim_aids/LOAD_STIM_AID';
const UPDATE_STIM_AID = 'stim_aids/UPDATE_STIM_AID';
const REMOVE_STIM_AID = 'stim_aids/REMOVE_STIM_AID';

const loadStimAids = (stimAids) => {
    return {
        type: LOAD_STIM_AIDS,
        stimAids
    };
};

const addStimAid = (stimAid) => {
    return {
        type: ADD_STIM_AID,
        stimAid
    };
};

const loadStimAid = (stimAid) => {
    return {
        type: LOAD_STIM_AID,
        stimAid
    };
};

const updateStimAid = (stimAid) => {
    return {
        type: UPDATE_STIM_AID,
        stimAid
    };
};

const removeStimAid = (stimAidId) => {
    return {
        type: REMOVE_STIM_AID,
        stimAidId
    };
};

// GET /api/stim_aids
export const getStimAids = () => async (dispatch) => {
    const res = await fetch('/api/stim_aids');

    if (res.ok) {
        const stimAids = await res.json();
        dispatch(loadStimAids(stimAids.stim_aids));
    }

    return res;
};

// POST /api/stim_aids
export const createStimAid = (newStimAid) => async (dispatch) => {
    const res = await fetch('/api/stim_aids', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStimAid)
    });

    if (res.ok) {
        const stimAid = await res.json();
        dispatch(addStimAid(stimAid));
    }

    return res;
};

// GET /api/stim_aids/:id ???
export const getStimAid = (stimAidId) => async (dispatch) => {
    const res = await fetch(`/api/stim_aids/${stimAidId}`);

    if (res.ok) {
        const stimAid = await res.json();
        dispatch(loadStimAid(stimAid));
    }

    return res;
};

// PUT /api/stim_aids/:id
export const editStimAid = (stimAid) => async (dispatch) => {
    const res = await fetch(`/api/stim_aids/${stimAid.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stimAid)
    });

    if (res.ok) {
        const editedStimAid = await res.json();
        dispatch(updateStimAid(editedStimAid));
        return editedStimAid;
    }
};

// DELETE /api/stim_aids/:id
export const deleteStimAid = (stimAidId) => async (dispatch) => {
    const res = await fetch(`/api/stim_aids/${stimAidId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        await dispatch(removeStimAid(stimAidId));
    }

    return res;
};

const stimAids = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_STIM_AIDS:
            newState = { ...state };
            action.stimAids.forEach(stimAid => {
                newState[stimAid.id] = stimAid;
            });
            return newState;
        case ADD_STIM_AID:
            newState = { ...state };
            newState[action.stimAid.id] = action.stimAid;
            return newState;
        case LOAD_STIM_AID:
            newState = { ...state };
            newState[action.stimAid.id] = action.stimAid;
            return newState;
        case UPDATE_STIM_AID:
            newState = { ...state };
            newState[action.stimAid.id] = action.stimAid;
            return newState;
        case REMOVE_STIM_AID:
            newState = { ...state };
            delete newState[action.stimAidId]
            return newState;
        default:
            return state;
    }
};

export default stimAids;
