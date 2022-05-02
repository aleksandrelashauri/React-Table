import React from 'react';
import { Navigate } from 'react-router-dom';
import MainItems from '../components/main/MainItems';
import SignIn from '../components/main/SignIn';
import SignUp from '../components/main/SignUp';
import { WrongUrl } from './wrongUrl';

const routes = (login) => [
  {
    path: '/',
    element: !login ? <SignIn /> : <Navigate to="table" />,
  },
  {
    path: 'table',
    element: login ? <MainItems /> : <Navigate to="/" />,
  },
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: 'sign-up',
    element: <SignUp />,
  },
  {
    path: '*',
    element: <WrongUrl />,
  },
];

export default routes;
