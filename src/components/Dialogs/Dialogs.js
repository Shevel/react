import React from 'react';
import s from './Dialogs.module.css';
import { Dialog } from './Dialog/Dialog';
import { Message } from './Message/Message';

export const Dialogs = (props) => {
  const dialogs = props.dialogsPage.dialogsData;
  const messages = props.dialogsPage.messagesData;

  const dialogsElements = dialogs
    .map(dialog => <Dialog key={dialogs.length - dialog.id} name={dialog.name} path={dialog.id} />);

  const messagesElements = messages
    .map(message => <Message key={messages.length - message.id} text={message.string} />);

  const createNewMessage = () => {
    props.sendMessage();
  }
  const onEnteringMessage = (e) => {
    const messageText = e.target.value;
    props.enteringMessage(messageText);
  }
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messagesElements}
      </div>
      <div className={s.sendMessageBlock}>
        <textarea
          className={s.textarea}
          type='text'
          value={props.dialogsPage.textMessage}
          placeholder='Enter message..'
          onChange={onEnteringMessage}
        />
        <button className={s.sendButton} onClick={createNewMessage}>Send Message</button>
      </div>
    </div>
  )
}