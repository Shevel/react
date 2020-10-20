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
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
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

const mapStateToProps = (state) => ({
  authorizedUserId: state.auth.id,
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    saveMainAvatar,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
