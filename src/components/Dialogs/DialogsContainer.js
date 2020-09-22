import { Dialogs } from './Dialogs';
import { enteringMessageActionCreator, sendMessageActionCreator } from '../../redux/dialogsReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    enteringMessage: (messageText) => { dispatch(enteringMessageActionCreator(messageText)) },
    sendMessage: () => { dispatch(sendMessageActionCreator()) },
  }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);