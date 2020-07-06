import { UPDATE_POSTS } from "../actions/actionTypes";

// by default we are taking  State as a state of post array
export default function posts(state = [], action) {
  console.log("IN REDUCERS", state);
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    default:
      return state;
  }
}
