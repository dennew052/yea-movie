import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { TOP_LISTS } from './constants/constants';
import Layout from './layouts/Layout';
import MovieDetail from './pages/MovieDetail';
import MoviesListTop from './pages/MoviesListTop';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="top-popular-all" replace />} />
          {TOP_LISTS.map((el) => (
            <Route key={el.url} path={el.url} element={<MoviesListTop />} />
          ))}
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="*" element={<h2>404 — Страница не найдена</h2>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;