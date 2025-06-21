import { CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import MoviesList from '../components/MoviesList';
import { TOP_LISTS } from '../constants/constants';
import { useGetFilmsTopQuery } from '../services/kinopoiskApi';

function MoviesListTop() {
  const location = useLocation();
  const [page, setPage] = useState(1);

  const movieType = TOP_LISTS.find((el) => el.url === location.pathname);
  if (!movieType) {
    return <p>Invalid movie type</p>;
  }
  const { data, error, isLoading } = useGetFilmsTopQuery({
    type: movieType.value,
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [location.pathname]);

  if (error) return <p>Some error</p>;
  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" sx={{ mt: 5 }}>
        <CircularProgress />
      </Stack>
    );
  }
  return (
    <>
      <Stack flexDirection="row" justifyContent="center" sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" sx={{ alignContent: 'center' }}>
          {movieType.title}
        </Typography>
      </Stack>
      <MoviesList
        movies={data.items}
        totalPages={data.totalPages}
        page={page}
        setPage={setPage}
      ></MoviesList>
    </>
  );
}

export default MoviesListTop;
