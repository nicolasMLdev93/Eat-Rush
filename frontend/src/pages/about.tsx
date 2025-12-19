import React from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import ApiIcon from "@mui/icons-material/Api";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

const AboutContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: "#f8f9fa",
  minHeight: "60vh",
  display: "flex",
  alignItems: "center",
}));

const TechChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "#ffffff",
  color: "#D70F64",
  border: "2px solid #D70F64",
  fontWeight: 600,
  padding: theme.spacing(1),
  "&:hover": {
    backgroundColor: "#D70F64",
    color: "#ffffff",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
}));

const About = () => {
  const technologies = [
    { name: "React", icon: <CodeIcon />, color: "#61DAFB" },
    { name: "TypeScript", icon: <CodeIcon />, color: "#3178C6" },
    { name: "Node.js", icon: <ApiIcon />, color: "#339933" },
    { name: "Express", icon: <ApiIcon />, color: "#000000" },
    { name: "MySQL", icon: <StorageIcon />, color: "#4479A1" },
    { name: "Material-UI", icon: <DesignServicesIcon />, color: "#007FFF" },
  ];

  return (
    <AboutContainer id="about">
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #D70F64 0%, #FF8000 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sobre este Proyecto
            </span>
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "#666666", mb: 4, fontWeight: 400 }}
          >
            Una aplicación de comida rápida desarrollada con tecnologías
            modernas
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="body1"
            sx={{
              color: "#666666",
              mb: 3,
              lineHeight: 1.8,
              fontSize: "1.1rem",
            }}
          >
            <strong>EatRush</strong> es un proyecto full-stack que desarrollé
            para practicar y demostrar mis habilidades en el desarrollo web
            moderno. Combina las mejores tecnologías del ecosistema JavaScript.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#666666",
              mb: 4,
              lineHeight: 1.8,
              fontSize: "1.1rem",
            }}
          >
            El objetivo fue crear una aplicación completa y funcional que simule
            un servicio real de delivery de comida, desde el frontend hasta la
            base de datos.
          </Typography>

          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" sx={{ color: "#999999", px: 2 }}>
              Tecnologías Utilizadas
            </Typography>
          </Divider>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ mb: 4 }}
          >
            {technologies.map((tech) => (
              <TechChip
                key={tech.name}
                icon={React.cloneElement(tech.icon, {
                  style: { color: tech.color },
                })}
                label={tech.name}
                variant="outlined"
                sx={{
                  borderColor: tech.color,
                  color: tech.color,
                  "&:hover": {
                    backgroundColor: tech.color,
                    color: "#ffffff",
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: 4,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 3, color: "#333333" }}
          >
            ✨ Características Implementadas
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="body1" sx={{ color: "#666666", mb: 2 }}>
                <strong>Frontend:</strong>
              </Typography>
              <ul style={{ color: "#666666", paddingLeft: "20px", margin: 0 }}>
                <li>Interfaz responsive con Material-UI</li>
                <li>Estado manejado con React Hooks</li>
                <li>Tipado estático con TypeScript</li>
                <li>Routing con React Router</li>
                <li>Carruseles interactivos con Swiper</li>
              </ul>
            </Box>

            <Box>
              <Typography variant="body1" sx={{ color: "#666666", mb: 2 }}>
                <strong>Backend:</strong>
              </Typography>
              <ul style={{ color: "#666666", paddingLeft: "20px", margin: 0 }}>
                <li>API REST con Node.js y Express</li>
                <li>Base de datos MySQL relacional</li>
                <li>Autenticación con JWT</li>
                <li>Manejo de sesiones</li>
                <li>Validación de datos</li>
              </ul>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{ color: "#888888", fontStyle: "italic" }}
          >
            💻 Este es un proyecto de práctica que muestra mi capacidad para
            desarrollar aplicaciones web completas usando las tecnologías más
            demandadas del mercado.
          </Typography>
        </Box>
      </Container>
    </AboutContainer>
  );
};

export default About;
