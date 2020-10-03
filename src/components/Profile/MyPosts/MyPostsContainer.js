import { MyPosts } from "./MyPosts";
import { newPost, updateTextPost } from "../../../redux/profileReducer";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      dispatch(updateTextPost(text));
    },
    addPost: () => {
      dispatch(newPost());
    },
  };
};

export const MyPostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts);
