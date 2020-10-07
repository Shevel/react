import { MyPosts } from "./MyPosts";
import { newPost } from "../../../redux/profileReducer";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (postMessage) => {
      dispatch(newPost(postMessage));
    },
  };
};

export const MyPostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts);
