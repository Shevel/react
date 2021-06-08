import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { reduxForm } from 'redux-form';

import s from './Chat.module.css';
import noava from '../../assets/image/noavatar.jpg';
import { createField, Input } from '../common/FormControls/FormControls';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening
} from '../../redux/chatReducer';
import { AppStateType } from '../../redux/redux-store';

type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, [dispatch]);

  return (
    <>
      <div style={{ maxHeight: 800, overflowY: 'auto' }}>
        <Messages />
      </div>
      <AddMessagesReduxForm />
    </>
  );
};

export default Chat;

const Messages: React.FC<{}> = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  return (
    <div>
      {messages.map((m, index) => {
        return <Message message={m} key={index} />;
      })}
    </div>
  );
};

const AddMessagesForm: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  // const [socketStatus, setSocketStatus] =
  //   useState<'pending' | 'ready'>('pending');

  const handleSubmit = () => {
    if (!message.trim()) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {createField('Enter message', 'message', [], Input, {
        type: 'text',
        className: s.addChatMessageInput,
        onChange: (e: {
          currentTarget: { value: React.SetStateAction<string> };
        }) => setMessage(e.currentTarget.value),
        value: message
      })}
      <Button
        // disabled={ws !== null && socketStatus !== 'ready'}
        onClick={handleSubmit}
        type='default'
        size='large'
        style={{ maxHeight: 41 }}
      >
        Send
      </Button>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 15
      }}
    >
      <div
        style={{
          marginRight: '15px'
        }}
      >
        <img
          style={{ borderRadius: '50%' }}
          src={message.photo ? message.photo : noava}
          width={50}
          alt='avatar'
        />
      </div>
      <div>
        <b>
          <span>{message.userName}</span>
        </b>
        <p
          style={{
            padding: '5px 0',
            borderRadius: '5px'
          }}
        >
          {message.message}
        </p>
      </div>
    </div>
  );
};

const AddMessagesReduxForm = reduxForm<any, any>({
  form: 'chatForm'
})(AddMessagesForm);
