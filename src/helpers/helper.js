const getToken = () => {
  const tokenString = sessionStorage.getItem("token");
  const token = JSON.parse(tokenString);
  return token?.access_token;
};

export { getToken };
