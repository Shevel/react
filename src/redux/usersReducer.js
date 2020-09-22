const SET_USERS = 'SET_USERS';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

const initialState = {
  users: [
    //   {
    //     id: 1,
    //     avatarImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Dmitry_Nagiev_2017_3.jpg',
    //     name: 'Dmitry',
    //     status: 'I am a boss',
    //     followed: true,
    //     location: {
    //       city: 'Minsk',
    //       country: 'Belarus',
    //     }
    //   },
    //   {
    //     id: 2,
    //     avatarImage: 'https://cs7.pikabu.ru/post_img/big/2019/08/23/5/1566544814170395336.png',
    //     name: 'Lena',
    //     status: 'I like watch movies!!!',
    //     followed: false,
    //     location: {
    //       city: 'Okolica',
    //       country: 'Belarus',
    //     }
    //   },
    //   {
    //     id: 3,
    //     avatarImage: 'https://www.esquireme.com/public/styles/600px_600px_square/public/images/2019/09/30/darth-vader-helmet.jpg?itok=yK61eOnV',
    //     name: 'Darth Vader',
    //     status: 'Welcome to the Dark Side! Ha-ha-ha',
    //     followed: true,
    //     location: {
    //       city: 'Star Killer',
    //       country: 'Far-far Galaxy',
    //     }
    //   },
  ]
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return {
              ...user,
              followed: true,
            }
          }
          return user;
        })
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return {
              ...user,
              followed: false,
            }
          }
          return user;
        })
      }
    case SET_USERS:
      return {
        ...state,
        users: [...state.users, ...action.users],
      }
    default:
      return state;
  }
}

export const followActionCreator = (userID) => { // Utils
  return { type: FOLLOW, userID }
}

export const unfollowActionCreator = (userID) => { // Utils
  return { type: UNFOLLOW, userID }
}

export const setUsers = (users) => { // Utils
  return { type: SET_USERS, users }
}