const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    };
};

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    };
};

const updateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    };
};

const removeComment = (commentId) => {
    return {
        type: REMOVE_COMMENT,
        commentId
    };
};

// GET /api/comments
export const getComments = () => async (dispatch) => {
    const res = await fetch('/api/comments');

    if (res.ok) {
        const comments = await res.json();
        dispatch(loadComments(comments.comments));
    }

    return res;
};

// POST /api/comments
export const createComment = (newComment) => async (dispatch) => {
    const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    });

    if (res.ok) {
        const comment = await res.json();
        dispatch(addComment(comment));
    }

    return res;
};

// PUT /api/comments/:id
export const editComment = (comment) => async (dispatch) => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    if (res.ok) {
        const editedComment = await res.json();
        dispatch(updateComment(editedComment));
        return editedComment;
    }
};

// DELETE /api/comments/:id
export const deleteComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        await dispatch(removeComment(commentId));
    }

    return res;
};

const comments = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_COMMENTS:
            newState = { ...state };
            action.comments.forEach(comment => {
                newState[comment.id] = comment;
            });
            return newState;
        case ADD_COMMENT:
            newState = { ...state };
            newState[action.comment.id] = action.comment;
            return newState;
        case UPDATE_COMMENT:
            newState = { ...state };
            newState[action.comment.id] = action.comment;
            return newState;
        case REMOVE_COMMENT:
            newState = { ...state };
            delete newState[action.commentId]
            return newState;
        default:
            return state;
    }
};

export default comments;
