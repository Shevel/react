import { ProfileType } from '../types/types';
import { profileReducer, actions } from './profileReducer';

let state = {
  postsData: [
    { id: 1, string: 'Ho-ho-ho!', likesCount: 5 },
    { id: 2, string: "Cool! What's up?", likesCount: 7 },
    { id: 3, string: 'Yo!!', likesCount: 9 },
  ],
  profile: null as ProfileType | null,
  status: '',
};

test('Length of posts should be increment', () => {
  let action = actions.newPost('it-kamasutra.com');
  let newState = profileReducer(state, action);
  expect(newState.postsData.length).toBe(4);
});

test(`Added posts should be 'it-kamasutra'`, () => {
  let action = actions.newPost('it-kamasutra.com');
  let newState = profileReducer(state, action);
  expect(newState.postsData[0].string).toBe('it-kamasutra.com');
});

test(`After deleting length of messages should be decrement`, () => {
  let action = actions.deletePost(3);
  let newState = profileReducer(state, action);
  expect(newState.postsData.length).toBe(2);
});

test(`After deleting length of messages shouldn't be decrement if id is incorrect`, () => {
  let action = actions.deletePost(1000);
  let newState = profileReducer(state, action);
  expect(newState.postsData.length).toBe(3);
});
