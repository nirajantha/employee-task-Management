import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const AuthHook = () => {
  return useContext(AuthContext);
};

export default AuthHook;
