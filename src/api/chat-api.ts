const subscribers = {
  messagesRecieved: [] as MessagesRecievedSubscriberType[],
  statusChanged: [] as StatusChangedSubscriberType[]
};

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

export type StatusType = 'pending' | 'ready' | 'error';

type EventsName = 'messagesRecieved' | 'statusChanged';

let socket: WebSocket;

type MessagesRecievedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

const closeHandler = () => {
  console.log('ws has down!');
  notifyAboutStatus('pending');
  setTimeout(createWsChannel, 3000);
};

const cleanUp = () => {
  socket?.removeEventListener('close', closeHandler);
  socket?.removeEventListener('message', messageHandler);
  socket?.removeEventListener('open', openHandler);
  socket?.removeEventListener('error', errorHandler);
};

const notifyAboutStatus = (status: StatusType) => {
  subscribers.statusChanged.forEach((s) => s(status));
};

function createWsChannel() {
  cleanUp();
  socket?.close();
  socket = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
  );
  notifyAboutStatus('pending');
  socket.addEventListener('close', closeHandler);
  socket.addEventListener('message', messageHandler);
  socket.addEventListener('open', openHandler);
  socket.addEventListener('error', errorHandler);
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers?.messagesRecieved.forEach((s) => s(newMessages));
};

const openHandler = () => {
  notifyAboutStatus('ready');
};

const errorHandler = () => {
  notifyAboutStatus('error');
};

export const chat_api = {
  subscribe: (
    eventName: EventsName,
    callback: MessagesRecievedSubscriberType | StatusChangedSubscriberType
  ) => {
    // @ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(
        // @ts-ignore
        (s) => s !== callback
      );
    };
  },
  unsubscribe: (
    eventName: EventsName,
    callback: MessagesRecievedSubscriberType | StatusChangedSubscriberType
  ) => {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      // @ts-ignore
      (s) => s !== callback
    );
  },
  send: (message: string) => {
    socket?.send(message);
  },
  start: () => {
    createWsChannel();
  },
  stop: () => {
    subscribers.messagesRecieved = [];
    subscribers.statusChanged = [];
    cleanUp();
    socket?.close();
  }
};
