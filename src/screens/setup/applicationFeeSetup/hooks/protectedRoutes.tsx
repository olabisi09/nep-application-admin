import { useAtomValue } from "jotai";

import { Navigate, useLocation } from "react-router-dom";
import { userAtom } from "../../../../utils/store";

interface ComponentProp {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ComponentProp) => {
  const user = useAtomValue(userAtom);
  let location = useLocation();

  if (!user || !user?.token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
