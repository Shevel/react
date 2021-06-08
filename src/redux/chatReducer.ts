import { InferActionsType, BaseThunkType } from './redux-store';
import { ChatMessageType, chat_api } from '../api/chat-api';
import { Dispatch } from 'redux';

type InitialStateType = {
  messages: ChatMessageType[];
};

type ActionTypes = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes>;

const initialState: InitialStateType = {
  messages: []
};

export const chatReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'MESSAGES_RECIEVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload]
      };
    default:
      return state;
  }
};

const actions = {
  messagesRecieved: (messages: ChatMessageType[]) => {
    return {
      type: 'MESSAGES_RECIEVED',
      payload: messages
    } as const;
  }
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMassageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler == null) {
    _newMessageHandler = (messages: ChatMessageType[]) => {
      dispatch(actions.messagesRecieved(messages));
    };
  }
  return _newMessageHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chat_api.start();
  chat_api.subscribe(newMassageHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chat_api.unsubscribe(newMassageHandlerCreator(dispatch));
  chat_api.stop();
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chat_api.send(message);
};
