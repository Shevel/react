import { Dialogs } from './Dialogs';
import { actions } from '../../redux/dialogsReducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { MessageType, DialogType } from '../../redux/dialogsReducer'

type MapStateToPropsType = {
  messages: Array<MessageType>
  dialogs: Array<DialogType>
}
type MapDispatchToPropsType = {
  sendMessage: (textMessage: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    messages: state.dialogsPage.messagesData,
    dialogs: state.dialogsPage.dialogsData,
  }
}

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
  return {
    sendMessage: (textMessage) => { dispatch(actions.sendMessageActionCreator(textMessage)) },
  }
}

const DialogsContainer = compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);

export default DialogsContainer;