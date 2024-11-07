import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import configureRoutes from './config/configureRoutes';
import useAuthStore from './store/Auth/authStore';

function App() {
  const role = useAuthStore((state) => state.role);

  const router = createBrowserRouter(configureRoutes(role));

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
