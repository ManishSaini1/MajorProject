import {UPDATE_POSTS} from './actionTypes';
export function fetchPosts()
{
    return(dispatch)=>{
        const url='http://localhost:8000/api/v1/posts/?page=1&limit=6';
        fetch(url)
        .then((response)=>
        {
            // console.log(response);
            return response.json();
           
        })
        .then((data)=>
        {
            console.log(data.post);
            dispatch(updatePosts(data.post));
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