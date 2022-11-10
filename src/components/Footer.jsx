import { Box, Grid, Typography, Stack, Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 3,
        mt: "10%",
        background: "#90E0EF",
      }}
    >
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={6} md={3}>
            <Stack spacing={2}>
              <Typography variant="h6">SOBRE NOSOTROS</Typography>
              <a>
                Somos <a href="/">Figurita Repetida &reg;</a> el primer
                ecommerce en vender figuritas del mundial de 2022 en Argentina y
                Uruguay
              </a>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Stack spacing={2}>
              <Typography variant="caption" href="#">
                Logo
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Stack spacing={2}>
              <Typography variant="h6">NAVEGA POR NUESTRA PAGINA</Typography>
              <Link href="/register" color="inherit">
                <Typography>Registrate</Typography>
              </Link>
              <Link href="/login" color="inherit">
                <Typography>Inicia sesion</Typography>
              </Link>
              <Link href="/" color="inherit">
                <Typography>Inicio</Typography>
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={5} md={3}>
            <Stack spacing={1}>
              <Typography variant="h6">NUESTRAS REDES SOCIALES</Typography>
              <Link
                href="https://es-la.facebook.com/"
                underline="none"
                color="inherit"
                target="_blank"
              >
                <Typography>
                  <FacebookIcon sx={{ fontSize: 35 }}> </FacebookIcon>
                  FACEBOOK
                </Typography>
              </Link>
              <Link
                href="https://github.com/FranciscoAlvarezRaineri/FiguritaRepetida"
                underline="none"
                color="inherit"
                target="_blank"
              >
                <Typography>
                  <GitHubIcon sx={{ fontSize: 35 }}></GitHubIcon>
                  GITHUB
                </Typography>
              </Link>
              <Link
                href="https://www.instagram.com/"
                underline="none"
                color="inherit"
                target="_blank"
              >
                <Typography>
                  <InstagramIcon sx={{ fontSize: 35 }}></InstagramIcon>{" "}
                  INSTAGRAM
                </Typography>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box
        textAlign="center"
        pl={{ xs: 10, sm: 1 }}
        pb={{ xs: 10, sm: 1 }}
        mt="20px"
      >
        Figurita Repetida &reg; {new Date().getFullYear()}
      </Box>
    </Box>
  );
};

export default Footer;