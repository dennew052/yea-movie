import { Pagination, Stack } from '@mui/material';

import MovieCard from './MovieCard/MovieCard';

interface Movie {
  kinopoiskId: number;
  posterUrlPreview: string;
  nameRu?: string;
  nameEn?: string;
  ratingKinopoisk?: number;
}

interface MoviesListProps {
  movies: Movie[];
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

function MoviesList({ movies, totalPages, page, setPage }: MoviesListProps) {
  return (
    <>
      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {movies.map((movie) => (
          <MovieCard key={movie.kinopoiskId} movie={movie} />
        ))}
      </Stack>
      <Stack alignItems="center" mt={5}>
        <Pagination
          count={totalPages}
          page={page}
          color="primary"
          size="large"
          onChange={(_, value) => setPage(value)}
        />
      </Stack>
    </>
  );
}

export default MoviesList;
