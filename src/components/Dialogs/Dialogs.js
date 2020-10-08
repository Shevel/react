import React from "react";
import styles from "./Dialogs.module.css";
import { Dialog } from "./Dialog/Dialog";
import { Message } from "./Message/Message";
import { reduxForm, Field } from "redux-form";
import { Textarea } from "../common/FormControls/FormControls";
import { maxLengthCreator, required } from "../../utils/validators";

const maxLength300 = maxLengthCreator(300);

export const Dialogs = (props) => {
  const dialogs = props.dialogsPage.dialogsData;
  const messages = props.dialogsPage.messagesData;

  const dialogsElements = dialogs.map((dialog) => (
    <Dialog
      key={dialogs.length - dialog.id}
      name={dialog.name}
      path={dialog.id}
    />
  ));

  const messagesElements = messages.map((message) => (
    <Message key={messages.length - message.id} text={message.string} />
  ));

  const onSubmitDialogs = (dialogData) => {
    props.sendMessage(dialogData.textMessage);
  };
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages_content}>
        <div className={styles.messages}>{messagesElements}</div>
        <DialogForm onSubmit={onSubmitDialogs} />
      </div>
    </div>
  );
};

let DialogForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form className={styles.sendMessageForm} onSubmit={handleSubmit}>
      <Field
        className={styles.textarea}
        type="text"
        name="textMessage"
        component={Textarea}
        validate={[required, maxLength300]}
        placeholder="Enter message.."
      />
      <button className={styles.sendButton}>Send Message</button>
    </form>
  );
};

DialogForm = reduxForm({ form: "dialogsForm" })(DialogForm);
