import { Dialogs } from './Dialogs';
import { enteringMessageActionCreator, sendMessageActionCreator } from '../../redux/dialogsReducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

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

export const DialogsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);