import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Link,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetMovieByIdQuery } from '../services/kinopoiskApi';

interface Genre {
  genre: string;
}

const MovieDetail = () => {
  const { id } = useParams();
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(id);
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);

  if (isLoading)
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />;
  if (error)
    return (
      <Typography color="error" sx={{ mt: 10, textAlign: 'center' }}>
        Ошибка загрузки
      </Typography>
    );

  const kpRating = movie.ratingKinopoisk ? movie.ratingKinopoisk / 2 : null;
  const imdbRating = movie.ratingImdb ? movie.ratingImdb / 2 : null;

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        {/* Постер */}
        <Box
          sx={{
            width: 300,
            maxHeight: 453,
            borderRadius: 2,
            boxShadow: 5,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!isPosterLoaded && (
            <Skeleton
              variant="rectangular"
              width={300}
              height={453}
              sx={{ borderRadius: 2 }}
            />
          )}
          <Box
            component="img"
            src={movie.posterUrl}
            alt={movie.nameRu || movie.nameOriginal}
            sx={{
              display: isPosterLoaded ? 'block' : 'none',
              width: 'auto',
              maxHeight: 453,
              objectFit: 'cover',
            }}
            onLoad={() => setIsPosterLoaded(true)}
            onError={() => setIsPosterLoaded(true)}
          />
        </Box>

        {/* Контент справа */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {movie.nameRu || movie.nameOriginal}
          </Typography>

          {movie.slogan && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              fontStyle="italic"
              gutterBottom
            >
              «{movie.slogan}»
            </Typography>
          )}

          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <b>Год:</b> {movie.year}
            </Typography>
            <Typography variant="body2">
              <b>Длительность:</b> {movie.filmLength} мин
            </Typography>
            <Typography variant="body2">
              <b>Возраст:</b>{' '}
              {movie.ratingAgeLimits
                ? movie.ratingAgeLimits.replace('age', '') + '+'
                : 'Нет данных'}
            </Typography>
            <Typography variant="body2">
              <b>Страны:</b>{' '}
              {movie.countries
                .map((c: { country: any }) => c.country)
                .join(', ')}
            </Typography>
          </Stack>

          <Box sx={{ mb: 2 }}>
            {movie.genres.map((g: Genre) => (
              <Chip
                key={g.genre}
                label={g.genre}
                size="small"
                variant="outlined"
                color="primary"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={4} flexWrap="wrap">
            <Box>
              <Typography fontWeight="bold">Кинопоиск</Typography>
              {kpRating ? (
                <>
                  <Rating
                    value={kpRating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2">
                    {movie.ratingKinopoisk} / 10
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {movie.ratingKinopoiskVoteCount.toLocaleString()} голосов
                  </Typography>
                </>
              ) : (
                <Typography>Нет данных</Typography>
              )}
            </Box>

            <Box>
              <Typography fontWeight="bold">IMDb</Typography>
              {imdbRating ? (
                <>
                  <Rating
                    value={imdbRating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2">
                    {movie.ratingImdb} / 10
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {movie.ratingImdbVoteCount.toLocaleString()} голосов
                  </Typography>
                </>
              ) : (
                <Typography>Нет данных</Typography>
              )}
            </Box>
          </Stack>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {movie.description ||
              movie.shortDescription ||
              'Описание отсутствует'}
          </Typography>

          <Link
            href={movie.webUrl}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ display: 'inline-block', mt: 2, fontWeight: 'bold' }}
          >
            Подробнее на Кинопоиске →
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default MovieDetail;
