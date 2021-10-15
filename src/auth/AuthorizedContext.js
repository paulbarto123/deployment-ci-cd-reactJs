import React from "react";

const AuthorizedDefaultValue = {
  isLoggedIn: false,
  setAuthorizedValue: () => {},
};

const AuthorizedContext = React.createContext(AuthorizedDefaultValue);

const AuthorizedContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const setAuthorizedValue = React.useCallback(
    (loginStatus) => {
      setIsLoggedIn(loginStatus);
    },
    [setIsLoggedIn]
  );

  return (
    <AuthorizedContext.Provider
      value={{ isLoggedIn, setAuthorizedValue }}
    >
      {props.children}
    </AuthorizedContext.Provider>
  );
};

const useAuthorizedContext = () => {
  const { isLoggedIn, setAuthorizedValue } =
    React.useContext(AuthorizedContext);

  return { isLoggedIn, setAuthorizedValue };
};

export { AuthorizedContextProvider, useAuthorizedContext };
