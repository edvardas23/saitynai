export const saveUserInfo = (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const removeUserInfo = () =>{
    localStorage.removeItem("userInfo");
}

export const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return null;
};

  
export const parseJwt = (token) => {
    var base64Url = token.accessToken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const data = JSON.parse(jsonPayload);
    const ret = {
        "roles" : data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        "userId" : data['sub']
    };
    return ret;
  }