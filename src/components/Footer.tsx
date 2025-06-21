import { Stack, Typography } from '@mui/material';

function Footer() {
  return (
    <Stack
      component="footer"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: { xs: 'center', sm: 'space-between' },
        alignItems: 'center',
        gap: 2,
        marginTop: 'auto'
      }}
    >
      <Typography>
        &copy; {new Date().getFullYear()} &laquo;YeaMovie&raquo;
      </Typography>
      <Typography variant="h4" color="primary.main">
        YeaMovie
      </Typography>
    </Stack>
  );
}

export default Footer;
