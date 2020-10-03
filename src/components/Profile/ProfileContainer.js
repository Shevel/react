import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";
import { usersAPI } from "../../api/api";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    usersAPI.getProfile(userId)
      .then((response) => {
        this.props.setUserProfile(response.data);
      });
  }

  render() {
    return (
      <>
        <Profile {...this.props} profile={this.props.profile} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

const WithUrlDataProfileComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(
  WithUrlDataProfileComponent
);
