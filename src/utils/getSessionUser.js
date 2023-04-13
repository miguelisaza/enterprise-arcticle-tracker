export const getSessionUser = () => JSON.parse(localStorage.getItem('user-info'));

export default getSessionUser;