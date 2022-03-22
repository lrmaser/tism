const LOAD_SPECIAL_INTERESTS = 'special_interests/LOAD_SPECIAL_INTERESTS';
const ADD_SPECIAL_INTEREST = 'special_interests/ADD_SPECIAL_INTEREST';
const UPDATE_SPECIAL_INTEREST = 'special_interests/UPDATE_SPECIAL_INTEREST';
const REMOVE_SPECIAL_INTEREST = 'special_interests/REMOVE_SPECIAL_INTEREST';

const loadSpecialInterests = (specialInterests) => {
    return {
        type: LOAD_SPECIAL_INTERESTS,
        specialInterests
    };
};

const addSpecialInterest = (specialInterest) => {
    return {
        type: ADD_SPECIAL_INTEREST,
        specialInterest
    };
};

const updateSpecialInterest = (specialInterest) => {
    return {
        type: UPDATE_SPECIAL_INTEREST,
        specialInterest
    };
};

const removeSpecialInterest = (specialInterestId) => {
    return {
        type: REMOVE_SPECIAL_INTEREST,
        specialInterestId
    };
};

// GET /api/special_interests
export const getSpecialInterests = () => async (dispatch) => {
    const res = await fetch('/api/special_interests');

    if (res.ok) {
        const special_interests = await res.json();
        dispatch(loadSpecialInterests(special_interests.special_interests));
    }

    return res;
};

// POST /api/special_interests
export const createSpecialInterest = (newSpecialInterest) => async (dispatch) => {
    const res = await fetch('/api/special_interests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSpecialInterest)
    });

    if (res.ok) {
        const specialInterest = await res.json();
        dispatch(addSpecialInterest(specialInterest));
    }

    return res;
};

// PUT /api/special_interests/:id
export const editSpecialInterest = (specialInterest) => async (dispatch) => {
    const res = await fetch(`/api/special_interests/${specialInterest.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(specialInterest)
    });

    if (res.ok) {
        const editedSpecialInterest = await res.json();
        dispatch(updateSpecialInterest(editedSpecialInterest));
        return editedSpecialInterest;
    }
};

// DELETE /api/special_interests/:id
export const deleteSpecialInterest = (specialInterestId) => async (dispatch) => {
    const res = await fetch(`/api/special_interests/${specialInterestId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        await dispatch(removeSpecialInterest(specialInterestId));
    }

    return res;
};

const specialInterests = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPECIAL_INTERESTS:
            newState = { ...state };
            action.specialInterests.forEach(specialInterest => {
                newState[specialInterest.id] = specialInterest;
            });
            return newState;
        case ADD_SPECIAL_INTEREST:
            newState = { ...state };
            newState[action.specialInterest.id] = action.specialInterest;
            return newState;
        case UPDATE_SPECIAL_INTEREST:
            newState = { ...state };
            newState[action.specialInterest.id] = action.specialInterest;
            return newState;
        case REMOVE_SPECIAL_INTEREST:
            newState = { ...state };
            delete newState[action.specialInterestId]
            return newState;
        default:
            return state;
    }
};

export default specialInterests;
