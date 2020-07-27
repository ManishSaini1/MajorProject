import { UPDATE_POSTS, ADD_POST, ADD_COMMENT } from "../actions/actionTypes";

// by default we are taking  State as a state of post array
export default function posts(state = [], action) {
  console.log("IN REDUCERS", state);
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
      case ADD_POST:
        {
          return [action.post, ...state];
        }
        case ADD_COMMENT:
          const newPosts = state.map((post) => {
            if (post._id === action.postId) {
              return {
                ...post,
                comments: [action.comment, ...post.comments],
              };
            }
    
            return post;
          });
          return newPosts;
    
    default:
      return state;
  }
}
