import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

export const logout = () => {
  localStorage.removeItem("student-info");
  window.location.href = "/";
};
