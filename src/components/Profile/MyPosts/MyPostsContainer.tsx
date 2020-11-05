import MyPostsMemorized, { MapDispatchType, MapPropsType } from "./MyPosts";
import { actions } from "../../../redux/profileReducer";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";

const mapStateToProps = (state: AppStateType): MapPropsType => {
  return {
    postsData: state.profilePage.postsData,
  };
};

const MyPostsContainer: React.ComponentType = connect<MapPropsType, MapDispatchType, {}, AppStateType>(
  mapStateToProps,
  { addPost: actions.newPost }
)(MyPostsMemorized);

export default MyPostsContainer;