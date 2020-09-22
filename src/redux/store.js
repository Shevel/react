import { profileReducer } from './profileReducer';
import { dialogsReducer } from './dialogsReducer';
import { sidebarReducer } from './sidebarReducer';

export let store = {
  state: {
    profilePage: {
      postsData: [
        { id: 1, string: 'Ho-ho-ho!', likesCount: 5 },
        { id: 2, string: 'Cooooool! What\'s up?', likesCount: 7 },
        { id: 3, string: 'Yo!!', likesCount: 9 },
      ],
      newPostText: '',
    },
    dialogsPage: {
      messagesData: [
        { id: 1, string: 'Hi!' },
        { id: 2, string: 'How are you?!' },
        { id: 3, string: 'Yo!!' },
        { id: 4, string: 'LOL' },
        { id: 5, string: 'KEKIS! =^_^= ' },
      ],
      textMessage: '',
      dialogsData: [
        { id: 1, name: 'Dymych' },
        { id: 2, name: 'Alexander' },
        { id: 3, name: 'Vika' },
        { id: 4, name: 'Vasya' },
        { id: 5, name: 'Kotik' },
        { id: 6, name: 'Valeron' },
      ],
    },
    sidebar: {
    },
  },
  getState() {
    return this.state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  _callSubscriber() {
    console.log('state changed');
  },
  dispatch(action) {
    this.state.profilePage = profileReducer(this.state.profilePage, action);
    this.state.dialogsPage = dialogsReducer(this.state.dialogsPage, action);
    this.state.sidebar = sidebarReducer(this.state.sidebar, action);
    this._callSubscriber(this.state);
  }
}

window.store = store;
