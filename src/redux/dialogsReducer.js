const ENTERING_MESSAGE = 'ENTERING_MESSAGE';
const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
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
};

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messagesData: [...state.messagesData, {
          id: state.messagesData.length + 1,
          string: state.textMessage,
        }],
        textMessage: '',
      }

    case ENTERING_MESSAGE:
      return {
        ...state,
        textMessage: action.textMessage,
      }
      
    default:
      return state;
  }
}

export const enteringMessageActionCreator = (text) => { // Utils
  return { type: ENTERING_MESSAGE, textMessage: text }
}

export const sendMessageActionCreator = () => { // Utils
  return { type: SEND_MESSAGE }
}