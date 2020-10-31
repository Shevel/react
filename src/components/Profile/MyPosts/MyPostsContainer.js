import { MyPosts } from "./MyPosts";
import { actions } from "../../../redux/profileReducer";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (postMessage) => {
      dispatch(actions.newPost(postMessage));
    },
  };
};

export const MyPostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts);
