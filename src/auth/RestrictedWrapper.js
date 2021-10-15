import React from "react";
import { useHistory } from "react-router-dom";
import { useAuthorizedContext } from "./AuthorizedContext";

const RestrictedWrapper = (props) => {
  const { isLoggedIn } = useAuthorizedContext();
  const history = useHistory();
  const target = props.target
  React.useEffect(() => {
    if (isLoggedIn) {
      history.push(target);
    }
  }, [isLoggedIn, history,target]);

  return isLoggedIn ? null : props.children;
};

export default RestrictedWrapper;
