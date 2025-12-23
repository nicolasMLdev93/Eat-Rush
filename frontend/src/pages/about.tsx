import React from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { technology_icons } from "../data/images";
import type { Technology } from "../interfaces/interfaces";
import "../styles/about.css";

const About: React.FC = () => {
  const technologies: Technology[] = [
    { name: "React", image: technology_icons[0]?.image, color: "#61DAFB" },
    { name: "TypeScript", image: technology_icons[1]?.image, color: "#3178C6" },
    { name: "Node.js", image: technology_icons[2]?.image, color: "#339933" },
    { name: "Express", image: technology_icons[3]?.image, color: "#000000" },
    { name: "MySQL", image: technology_icons[4]?.image, color: "#4479A1" },
    {
      name: "Material-UI",
      image: technology_icons[5]?.image,
      color: "#007FFF",
    },
  ];

  return (
    <Box className="about-container" id="about">
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
            <span className="project-title">Sobre este Proyecto</span>
          </Typography>

          <Typography variant="h6" className="subtitle">
            Una aplicación de comida rápida desarrollada con tecnologías
            modernas
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="body1" className="description">
            <strong>EatRush</strong> es un proyecto full-stack que desarrollé
            para practicar y demostrar mis habilidades en el desarrollo web
            moderno. Combina las mejores tecnologías del ecosistema JavaScript.
          </Typography>

          <Typography variant="body1" className="description">
            El objetivo fue crear una aplicación completa y funcional que simule
            un servicio real de delivery de comida, desde el frontend hasta la
            base de datos.
          </Typography>

          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" className="tech-stack-title">
              Tecnologías Utilizadas
            </Typography>
          </Divider>

          <Box className="tech-stack-container">
            {technologies.map((tech) => (
              <img className="tech_icon" src={tech.image} alt="tech_img" />
            ))}
          </Box>
        </Box>

        <Box className="features-container">
          <Typography variant="h6" className="features-title">
            ✨ Características Implementadas
          </Typography>

          <Box className="features-grid">
            <Box className="features-list">
              <Typography variant="body1">
                <strong>Frontend:</strong>
              </Typography>
              <ul>
                <li>Interfaz responsive con Material-UI</li>
                <li>Estado manejado con React Hooks</li>
                <li>Tipado estático con TypeScript</li>
                <li>Routing con React Router</li>
                <li>Carruseles interactivos con Swiper</li>
              </ul>
            </Box>

            <Box className="features-list">
              <Typography variant="body1">
                <strong>Backend:</strong>
              </Typography>
              <ul>
                <li>API REST con Node.js y Express</li>
                <li>Base de datos MySQL relacional</li>
                <li>Autenticación con JWT</li>
                <li>Manejo de sesiones</li>
                <li>Validación de datos</li>
              </ul>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="body2" className="footer-text">
            💻 Este es un proyecto de práctica que muestra mi capacidad para
            desarrollar aplicaciones web completas usando las tecnologías más
            demandadas del mercado.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
