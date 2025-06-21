import {
  AutoAwesome,
  Bloodtype,
  Book,
  BugReport,
  ChildCare,
  EmojiEvents,
  FamilyRestroom,
  Favorite,
  LocalMovies,
  Movie,
  ReportProblem,
  Tv,
  Upcoming,
  Whatshot,
} from '@mui/icons-material';
import { Box, Button, Container, Stack } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { TOP_LISTS } from '../constants/constants';

const iconMap = {
  AutoAwesome: <AutoAwesome />,
  Movie: <Movie />,
  Tv: <Tv />,
  LocalMovies: <LocalMovies />,
  Bloodtype: <Bloodtype />,
  EmojiEvents: <EmojiEvents />,
  Favorite: <Favorite />,
  BugReport: <BugReport />,
  ReportProblem: <ReportProblem />,
  ChildCare: <ChildCare />,
  Whatshot: <Whatshot />,
  Upcoming: <Upcoming />,
  FamilyRestroom: <FamilyRestroom />,
  ComicBook: <Book />,
} as const;

function Layout() {
  return (
    <Container
      fixed
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Box sx={{ p: 2, backgroundColor: '#f0f0f0' }}>
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1}>
          {TOP_LISTS.map(({ title, url, icon, value }) => (
            <Button
              key={value}
              component={RouterLink}
              to={url}
              startIcon={iconMap[icon as keyof typeof iconMap]|| null}
              variant="contained"
              color="primary"
              sx={{
                textTransform: 'none',
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#115293' },
                borderRadius: 2,
                minWidth: 250,
              }}
            >
              {title}
            </Button>
          ))}
        </Stack>
      </Box>
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
}

export default Layout;
