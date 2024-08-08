import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export default function IsAdminPagePrivate() {
  const { currentUser } = useSelector((state) => state.user);
  return  currentUser?.isAdmin === true ? <Outlet /> : <Navigate to="/" />;
}
