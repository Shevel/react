import { Dialogs } from './Dialogs';
import { enteringMessageActionCreator, sendMessageActionCreator } from '../../redux/dialogsReducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

const AuthRedirectComponent = withAuthRedirect(Dialogs);

const mapDispatchToProps = (dispatch) => {
  return {
    enteringMessage: (messageText) => { dispatch(enteringMessageActionCreator(messageText)) },
    sendMessage: () => { dispatch(sendMessageActionCreator()) },
  }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);