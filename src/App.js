import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import routes from './routes/routes';

function App() {
  const { login } = useSelector((state) => ({ login: state.login }));
  const routing = useRoutes(routes(login));
  return <>{routing}</>;
}

export default App;
