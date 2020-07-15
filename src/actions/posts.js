import {UPDATE_POSTS} from './actionTypes';
import { APIUrls } from '../helpers/urls';
export function fetchPosts()
{
    return(dispatch)=>{
        const url= APIUrls.fetchPosts();
        console.log("In Fetching posts",url);
        fetch(url)
        .then((response)=>
        {
            // console.log(response);
            return response.json();
           
        })
        .then((data)=>
        {
            console.log("Post dddd....",data);
            dispatch(updatePosts(data.data.posts));
        })
        .catch((error)=>
        {
                console.log(" IN fetching posts",error);
        });
    };
}
export function updatePosts(posts)
{
    return{
        type: UPDATE_POSTS,
        posts
    }
}