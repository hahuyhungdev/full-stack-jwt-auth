const JWTManager = () => {
  let inMemoryToken: string | null = null;
  const setToken = (token: string) => {
    inMemoryToken = token;
  };
  const getToken = () => {
    return inMemoryToken;
  };
  return {
    setToken,
    getToken,
  };
};
export default JWTManager();
