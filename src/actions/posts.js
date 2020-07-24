import { UPDATE_POSTS, ADD_POST } from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getAuthTokenFromLocalStorage, getFormBody } from "../helpers/utils";
export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    console.log("In Fetching posts", url);
    fetch(url)
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("Post dddd....", data);
        dispatch(updatePosts(data.data.posts));
      })
      .catch((error) => {
        console.log(" IN fetching posts", error);
      });
  };
}
export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}
export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();
    fetch(url, {
        method:'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body :getFormBody({content}),
    })
    .then(response => response.json())
    .then(data=>   {
        console.log("data", data);
        if(data.success)
        {
            dispatch(addPost(data.data.post));
        }
    } )
  };
}
