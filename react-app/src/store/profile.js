const LOAD_PROFILE = 'profiles/LOAD_PROFILE';
const UPDATE_PROFILE = 'profiles/UPDATE_PROFILE';

const loadProfile = (profile) => {
    return {
        type: LOAD_PROFILE,
        profile
    };
};

const updateProfile = (profile) => {
    return {
        type: UPDATE_PROFILE,
        profile
    };
};

// GET /api/profiles/:id
export const getProfile = (profileId) => async (dispatch) => {
    const res = await fetch(`/api/profiles/${profileId}`);

    if (res.ok) {
        const profile = await res.json();
        dispatch(loadProfile(profile));
    }

    return res;
};

// PUT /api/profiles/:id
export const editProfile = (profile) => async (dispatch) => {
    const res = await fetch(`/api/profiles/${profile.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
    });

    if (res.ok) {
        const editedProfile = await res.json();
        dispatch(updateProfile(editedProfile));
        return editedProfile;
    }
};

const profiles = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PROFILE:
            newState = { ...state };
            newState[action.profile.id] = action.profile;
            return newState;
        case UPDATE_PROFILE:
            newState = { ...state };
            newState[action.profile.id] = action.profile;
            return newState;
        default:
            return state;
    }
};

export default profiles;
