import { InferActionsType, BaseThunkType } from './redux-store';
import { ChatMessageType, chat_api, StatusType } from '../api/chat-api';
import { Dispatch } from 'redux';

type InitialStateType = {
  messages: ChatMessageType[];
  status: StatusType;
};

type ActionTypes = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes>;

const initialState: InitialStateType = {
  messages: [],
  status: 'pending'
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
    case 'ERASE_OLD_MESSAGES':
      return {
        ...state,
        messages: []
      };
    case 'STATUS_CHANGED':
      return {
        ...state,
        status: action.payload
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
  },
  statusChanged: (status: StatusType) => {
    return {
      type: 'STATUS_CHANGED',
      payload: status
    } as const;
  },
  eraseOldMessages: () => {
    return {
      type: 'ERASE_OLD_MESSAGES',
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

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler == null) {
    _statusChangedHandler = (status: StatusType) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chat_api.start();
  chat_api.subscribe('messagesRecieved', newMassageHandlerCreator(dispatch));
  chat_api.subscribe('statusChanged', statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chat_api.unsubscribe('messagesRecieved', newMassageHandlerCreator(dispatch));
  chat_api.unsubscribe('statusChanged', statusChangedHandlerCreator(dispatch));
  chat_api.stop();
  dispatch(actions.eraseOldMessages());
};

export const sendMessage =
  (message: string): ThunkType =>
  async () => {
    chat_api.send(message);
  };
