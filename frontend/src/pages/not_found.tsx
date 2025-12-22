import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            mb: 4,
            position: "relative",
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: 120,
              color: "#d70f64",
              opacity: 0.9,
            }}
          />
          <Typography
            variant="h1"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, 55%)",
              fontSize: 64,
              fontWeight: 900,
              color: "rgba(215, 15, 100, 0.1)",
              userSelect: "none",
            }}
          >
            404
          </Typography>
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#333333",
            mb: 2,
          }}
        >
          Página no encontrada
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#666666",
            mb: 6,
            maxWidth: 400,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Lo sentimos, no pudimos encontrar la página que buscas.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ width: "100%", maxWidth: 400 }}
        >
          <Button
            component={Link}
            to="/"
            variant="contained"
            startIcon={<HomeIcon />}
            sx={{
              backgroundColor: "#d70f64",
              color: "white",
              borderRadius: 2,
              py: 1.5,
              textTransform: "none",
              fontWeight: 500,
              flex: 1,
              "&:hover": {
                backgroundColor: "#c00e5a",
              },
            }}
          >
            Volver al inicio
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default NotFound;
