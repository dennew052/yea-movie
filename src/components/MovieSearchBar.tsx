import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type { RootState } from '../app/store';
import { setSearchQuery } from '../features/searchQuerySlice';
import { useGetFilmsQuery } from '../services/kinopoiskApi';

const movieTypes = {
  FILM: 'Фильм',
  VIDEO: 'Фильм',
  TV_SERIES: 'Сериал',
  MINI_SERIES: 'Мини-сериал',
  TV_SHOW: 'ТВ-Шоу',
};

function MovieSearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const { countries, genre, order, type, year, page, keyword } = useSelector(
    (state: RootState) => state.searchQuerySlice
  );
  const { data, isFetching } = useGetFilmsQuery(
    {
      countries,
      genre,
      order,
      type,
      year,
      page,
      keyword,
    },
    { skip: keyword.length < 3 }
  );

  interface Film {
    filmId: number;
    nameRu: string;
    nameEn?: string;
    year: string;
    type: keyof typeof movieTypes;
    rating?: string | null;
    posterUrlPreview?: string;
  }

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: inputValue }));
    }, 400);
    return () => clearTimeout(setTimeoutId);
  }, [inputValue]);
  return (
    <>
      <Autocomplete<Film | string, false, false, true>
        freeSolo
        getOptionLabel={(option) =>
          typeof option === 'string'
            ? option
            : `${option.nameRu} - ${movieTypes[option.type] || ''} (${option.year})`
        }
        options={data ? data.films || '' : []}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Поиск"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isFetching ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        onInputChange={(_, value) => {
          setInputValue(value);
        }}
        onChange={(_, value) => {
          if (typeof value !== 'string' && value?.filmId) {
            navigate(`/movie/${value.filmId}`, { state: { film: value } });
          }
        }}
      />
    </>
  );
}

export default MovieSearchBar;
