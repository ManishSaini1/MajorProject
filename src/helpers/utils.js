export function getFormBody(params) {
  let formBody = [];
  for (let property in params) {
    let encodeKey = encodeURIComponent(property);
    let encodeValue = encodeURIComponent(params[property]);
    formBody.push(encodeKey + "=" + encodeValue);
  }
  return formBody.join("&");
}
 export function  getAuthTokenFromLocalStorage()
{
  return localStorage.getItem('token');
  
}