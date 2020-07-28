import { FETCH_SEARCH_RESULT_SUCCESS } from "./actionTypes"
import { APIUrls } from "../helpers/urls"
import { getAuthTokenFromLocalStorage } from "../helpers/utils";

export function searchUsers(searchText) {
    return (dispatch)=>{
        const url=APIUrls.userSearch(searchText);
        fetch(url,
            {
                method:"GET",
                headers:
                {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
                },
            })
            .then((response)=>  response.json())
            .then((data)=>{
                console.log("Searched Data", data);
                if(data.success)
                {
                    dispatch(searchResultsuccess(data.data.users));
                }
                else{
                    dispatch(searchResultsuccess(data.data.users));
 
                }
            });
    }
  }
export function searchResultsuccess(users)
{
    return {
    type: FETCH_SEARCH_RESULT_SUCCESS,
    users
    }
}