import { Navigate, Outlet } from 'react-router-dom';

const UserProtectedRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserProtectedRoute;