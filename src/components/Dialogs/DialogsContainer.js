import { Dialogs } from './Dialogs';
import { sendMessageActionCreator } from '../../redux/dialogsReducer';
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
    sendMessage: (textMessage) => { dispatch(sendMessageActionCreator(textMessage)) },
  }
}

const DialogsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);

export default DialogsContainer;