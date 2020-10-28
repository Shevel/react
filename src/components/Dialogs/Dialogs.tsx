import React, { Dispatch } from "react";
import styles from "./Dialogs.module.css";
import '../../assets/styles/buttons.css';
import { Dialog } from "./Dialog/Dialog";
import { Message } from "./Message/Message";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { Textarea } from "../common/FormControls/FormControls";
import { maxLengthCreator } from "../../utils/validators";
import { MessageType, DialogType } from '../../redux/dialogsReducer';

type DialogsPropsType = {
  messages: Array<MessageType>
  dialogs: Array<DialogType>
  sendMessage: any
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

  const handleSubmit = (dialogData: any) => {
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

const DialogForm: React.FC<AllSampleFormProps> = ({ handleSubmit }) => {
  return (
    <form className={styles.sendMessageForm} onSubmit={handleSubmit}>
      <Field
        className={styles.textarea}
        type="text"
        name="textMessage"
        component={Textarea}
        validate={[maxLength300]}
        placeholder="Enter message.."
      />
      <button className='btn'>Send Message</button>
    </form>
  );
};

const DialogFormContainer = reduxForm<IFormData, IOwnProps>({ form: "dialogsForm" })(DialogForm);
