import { createReducer, on } from '@ngrx/store';
import {
  addedPostAction,
  deletedPostAction,
  loadedPosts,
  updatedPostAction,
} from './posts.actions';
import { initialState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(addedPostAction, (state, action) => {
    let post = { ...action.post };
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatedPostAction, (state, action) => {
    let updatedPosts = state.posts.map((p) =>
      p.id === action.post.id ? action.post : p
    );
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(deletedPostAction, (state, action) => {
    let updatedPosts = state.posts.filter((p) => p.id !== action.id);
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(loadedPosts, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  })
);

export function postsReducer(state, action) {
  return _postsReducer(state, action);
}
