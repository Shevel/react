const ADD_POST = 'ADD_POST';
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';

const initialState = {
  postsData: [
    { id: 1, string: 'Ho-ho-ho!', likesCount: 5 },
    { id: 2, string: 'Cooooool! What\'s up?', likesCount: 7 },
    { id: 3, string: 'Yo!!', likesCount: 9 },
  ],
  newPostText: '',
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postsData: [{
          id: state.postsData.length + 1,
          string: state.newPostText,
          likesCount: 0,
        }, ...state.postsData],
        newPostText: '',
      }

    case UPDATE_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText,
      }

    default:
      return state;
  }
}

export const newPostActionCreator = () => { // Utils
  return { type: ADD_POST }
}

export const updateTextPostActionCreator = (text) => { // Utils
  return { type: UPDATE_POST_TEXT, newText: text }
}
