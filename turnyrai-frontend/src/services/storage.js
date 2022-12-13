export const saveUserInfo = (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return null;
};