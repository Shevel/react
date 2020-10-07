import React from 'react';
import styles from './Dialogs.module.css';
import { Dialog } from './Dialog/Dialog';
import { Message } from './Message/Message';
import { Field, reduxForm } from 'redux-form';

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
  const onSubmitDialogs = (dialogData) => {
    console.log(dialogData)
  }
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={styles.messages_content}>
        <div className={styles.messages}>
          {messagesElements}
        </div>
        <DialogForm
          textMessage={props.dialogsPage.textMessage}
          onEnteringMessage={onEnteringMessage}
          createNewMessage={createNewMessage}
          onSubmit={onSubmitDialogs}
        />
      </div>
    </div>
  )
}

let DialogForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form
      className={styles.sendMessageForm}
      onSubmit={handleSubmit}
    >
      <Field
        className={styles.textarea}
        type='text'
        name='textMessage'
        component='textarea'
        value={props.textMessage}
        placeholder='Enter message..'
        onChange={props.onEnteringMessage}
      />
      <button className={styles.sendButton} onClick={props.createNewMessage}>Send Message</button>
    </form>
  )
}

DialogForm = reduxForm({ form: 'dialogs' })(DialogForm);
