import { Button } from 'antd';
import { FC } from 'react';
import useAuthStore from '../../../store/Auth/authStore';
import { ProfileEntityType } from '../../../types/entity/profile';
import { useNavigate } from 'react-router-dom';

const OptionsRolePage: FC = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    const profile: ProfileEntityType = {
      lastName: 'Tri',
      firstName: 'Nguyen Minh',
      email: 'nguyenminhtri1808t@gmail.com',
      username: 'minhtri',
      role: 'challengeManager',
    };

    login(profile);
    navigate('/');
    return;
  };
  return (
    <div>
      <div>this is options role page</div>
      <Button onClick={handleLogin} type="primary">
        Login
      </Button>
    </div>
  );
};

export default OptionsRolePage;
