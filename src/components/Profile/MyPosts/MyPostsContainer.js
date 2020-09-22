import { MyPosts } from './MyPosts';
import { newPostActionCreator, updateTextPostActionCreator } from '../../../redux/profileReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {dispatch(updateTextPostActionCreator(text))},
    addPost: () => {dispatch(newPostActionCreator())},
  }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);