import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import {
  getUserProfile,
  getStatus,
  updateStatus,
  saveMainAvatar,
  saveProfile
} from "../../redux/profileReducer";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { ProfileType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapDispatchPtopsType = {
  getUserProfile: (userId: number) => Promise<void>
  getStatus: (userId: number) => Promise<void>
  updateStatus: (status: string) => Promise<void>
  saveMainAvatar: (file: File) => Promise<void>
  saveProfile: (profile: ProfileType) => Promise<void>
}
type PathParamsType = {
  userId: string
}
type PropsType = MapPropsType & MapDispatchPtopsType & RouteComponentProps<PathParamsType>;
class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) { this.props.history.push('/login'); }
    }
    this.props.getUserProfile(userId as number);
    this.props.getStatus(userId as number);
  }
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        saveMainAvatar={this.props.saveMainAvatar}
      />
    );
  }
}
type MapPropsType = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: AppStateType) => ({
  authorizedUserId: state.auth.id,
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    saveMainAvatar,
    saveProfile,
  }),
  withRouter, // connecting to url parameter
  withAuthRedirect
)(ProfileContainer);
