import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, userLogout } from '../redux/action'

function Button({ handleClick }) {
  const user = useSelector((reduxState) => reduxState.userLogin);
  const firstName = useSelector((reduxState) => reduxState.firstName);
  const lastName = useSelector((reduxState) => reduxState.lastName);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(userLogin);
  };

  const handleLogout = () => {
      dispatch(userLogout);
  }

  return (
    <div>
      <button onClick={handleClick}>Login</button>
    </div>
  );
}
export default memo(Button)
