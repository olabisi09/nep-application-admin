import { useAtomValue } from "jotai";

import { Navigate, useLocation } from "react-router-dom";
import { userAtom } from "../utils/store";
import { Spin } from "antd";
import { useValidateUser } from "./useValidateUser";

interface ComponentProp {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ComponentProp) => {
  const user = useAtomValue(userAtom);
  const location = useLocation();

  const { isLoading } = useValidateUser()

  if (isLoading) {
    return <Spin />;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
