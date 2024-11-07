import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: FC = () => {
  return (
    <div className="auth__layout">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
