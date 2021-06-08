import React, { Dispatch } from "react";
import styles from "./Dialogs.module.css";
import '../../assets/styles/buttons.css';
import { Dialog } from "./Dialog/Dialog";
import { Message } from "./Message/Message";
import { reduxForm, InjectedFormProps } from "redux-form";
import { createField, Textarea } from "../common/FormControls/FormControls";
import { maxLengthCreator } from "../../utils/validators";
import { MessageType, DialogType } from '../../redux/dialogsReducer';
import { Button } from "antd";

type DialogsPropsType = {
  messages: Array<MessageType>
  dialogs: Array<DialogType>
  sendMessage: (messageText: string) => void
}
type NewMessageFormType = {
  textMessage: string
}
const maxLength300 = maxLengthCreator(300);

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
  const dialogsElements = props.dialogs.map((dialog) => (
    <Dialog
      key={props.dialogs.length - dialog.id}
      name={dialog.name}
      path={dialog.id}
    />
  ));

  const messagesElements = props.messages.map((message) => (
    <Message key={props.messages.length - message.id} text={message.string} />
  ));

  const handleSubmit = (dialogData: NewMessageFormType) => {
    props.sendMessage(dialogData.textMessage);
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages_content}>
        <div className={styles.messages}>{messagesElements}</div>
        <DialogFormContainer onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export interface IFormData {
  textMessage: string;
}

export interface IOwnProps {
  onSubmit: any;
}

export interface IDispatchProps {
  onSubmit: (data: IFormData, dispatch: Dispatch<any>, props: IOwnProps) => void;
}
type AllSampleFormProps = IOwnProps & IDispatchProps & InjectedFormProps<IFormData, IOwnProps>;
type NewMessageFromValuesKeysType = Extract<keyof NewMessageFormType, string>
const DialogForm: React.FC<AllSampleFormProps> = ({ handleSubmit }) => {
  return (
    <form className={styles.sendMessageForm} onSubmit={handleSubmit}>
      <div className={styles.textarea}>
        {createField<NewMessageFromValuesKeysType>('Enter message', 'textMessage', [maxLength300], Textarea, { type: 'text', className: styles.enterMessage, rows: 1 })}
      </div>

      <Button type='primary' onClick={handleSubmit}>Send</Button>
    </form>
  );
};

const DialogFormContainer = reduxForm<IFormData, IOwnProps>({ form: "dialogsForm" })(DialogForm);
