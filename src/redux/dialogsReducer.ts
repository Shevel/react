import { InferActionsType } from './redux-store';
export type MessageType = {
  id: number;
  string: string;
};
export type DialogType = {
  id: number;
  name: string;
};
const initialState = {
  messagesData: [
    { id: 1, string: 'Hi!' },
    { id: 2, string: 'How are you?!' },
    { id: 3, string: 'Yo!!' },
    { id: 4, string: 'LOL' },
    { id: 5, string: 'KEKIS! =^_^= ' },
  ] as Array<MessageType>,
  dialogsData: [
    { id: 1, name: 'Dymych' },
    { id: 2, name: 'Alexander' },
    { id: 3, name: 'Vika' },
    { id: 4, name: 'Vasya' },
    { id: 5, name: 'Kotik' },
    { id: 6, name: 'Valeron' },
  ] as Array<DialogType>,
};
export type initialStateType = typeof initialState;

type AcctionsType = InferActionsType<typeof actions>;

export const dialogsReducer = (
  state = initialState,
  action: AcctionsType
): initialStateType => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          {
            id: state.messagesData.length + 1,
            string: action.textMessage,
          },
        ],
      };

    default:
      return state;
  }
};

export const actions = {
  sendMessage: (textMessage: string) => {
    return { type: 'SEND_MESSAGE', textMessage } as const;
  },
};
