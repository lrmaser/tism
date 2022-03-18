const LOAD_POSTS = 'posts/LOAD_POSTS';
const ADD_POST = 'posts/ADD_POST';
const LOAD_POST = 'posts/LOAD_POST';
const UPDATE_POST = 'posts/UPDATE_POST';
const REMOVE_POST = 'posts/REMOVE_POST';

const loadPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        posts
    };
};

const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    };
};

const loadPost = (post) => {
    return {
        type: LOAD_POST,
        post
    };
};

const updatePost = (post) => {
    return {
        type: UPDATE_POST,
        post
    };
};

const removePost = (postId) => {
    return {
        type: REMOVE_POST,
        postId
    };
};

// GET /api/posts
export const getPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts');

    if (res.ok) {
        const posts = await res.json();
        dispatch(loadPosts(posts.posts));
    }

    return res;
};

// POST /api/posts
export const createPost = (newPost) => async (dispatch) => {
    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    });

    if (res.ok) {
        const post = await res.json();
        dispatch(addPost(post));
    }

    return res;
};

// GET /api/posts/:id
export const getPost = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`);

    if (res.ok) {
        const post = await res.json();
        dispatch(loadPost(post));
    }

    return res;
};

// PUT /api/posts/:id
export const editPost = (post) => async (dispatch) => {
    const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });

    if (res.ok) {
        const editedPost = await res.json();
        dispatch(updatePost(editedPost));
        return editedPost;
    }
};

// DELETE /api/posts/:id
export const deletePost = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        await dispatch(removePost(postId))
    }

    return res;
};

const posts = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_POSTS:
            newState = { ...state };
            action.posts.forEach(post => {
                newState[post.id] = post;
            });
            return newState;
        case ADD_POST:
            newState = { ...state };
            newState[action.post.id] = action.post;
            return newState;
        case LOAD_POST:
            newState = { ...state };
            newState[action.post.id] = action.post;
            return newState;
        case UPDATE_POST:
            newState = { ...state };
            newState[action.post.id] = action.post;
            return newState;
        case REMOVE_POST:
            newState = { ...state };
            delete newState[action.postId]
            return newState;
        default:
            return state;
    }
};

export default posts;
