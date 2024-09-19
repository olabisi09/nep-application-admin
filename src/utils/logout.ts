export const logout = () => {
  localStorage.removeItem("student-info");
  window.location.href = "/";
};
