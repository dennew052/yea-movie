import { Stack } from '@mui/material';

import MovieSearchBar from './MovieSearchBar';

function Navbar() {
  return (
    <>
      <Stack justifyContent="center" flexDirection="row" marginTop={4}>
        <MovieSearchBar></MovieSearchBar>
      </Stack>
    </>
  );
}

export default Navbar;
