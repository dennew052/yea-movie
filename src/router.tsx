import { createBrowserRouter, Navigate } from 'react-router-dom';

import { TOP_LISTS } from './constants/constants';
import Layout from './layouts/Layout';
import MovieDetail from './pages/MovieDetail';
import MoviesListTop from './pages/MoviesListTop';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="/top-popular-all" replace />,
        },
        ...TOP_LISTS.map((el) => ({
          path: el.url,
          element: <MoviesListTop />,
        })),
        {
          path: 'movie/:id',
          element: <MovieDetail />,
        },
        {
          path: '*',
          element: <h2>404 — Страница не найдена</h2>,
        },
      ],
    },
  ],
  {
    basename: '/yea-movie',
  }
);
