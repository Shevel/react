let subscribers = [] as SubscriberType[];

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

let socket: WebSocket;

type SubscriberType = (messages: ChatMessageType[]) => void;

const closeHandler = () => {
  setTimeout(createWsChannel, 3000);
};

function createWsChannel() {
  socket?.removeEventListener('close', closeHandler);
  socket?.close();
  socket = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
  );
  socket.addEventListener('close', closeHandler);
  socket.addEventListener('message', messageHandler);
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers?.forEach((s) => s(newMessages));
};

export const chat_api = {
  subscribe: (callback: SubscriberType) => {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter((s) => s !== callback);
    };
  },
  unsubscribe: (callback: SubscriberType) => {
    subscribers = subscribers.filter((s) => s !== callback);
  },
  send: (message: string) => {
    socket?.send(message);
  },
  start: () => {
    createWsChannel();
  },
  stop: () => {
    subscribers = [];
    socket.removeEventListener('close', closeHandler);
    socket.removeEventListener('message', messageHandler);
    socket?.close();
  }
};
