import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import "../styles/footer.css";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  color: "#333333",
  padding: theme.spacing(4, 0),
  borderTop: "1px solid #f0f0f0",
  marginTop: "auto",
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontFamily: '"Poppins", sans-serif',
  fontSize: "1.5rem",
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#666666",
  textDecoration: "none",
  display: "block",
  marginBottom: theme.spacing(1),
  transition: "all 0.2s ease",
  fontSize: "0.9rem",
  "&:hover": {
    color: "#D70F64",
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: "#666666",
  backgroundColor: "#f5f5f5",
  marginRight: theme.spacing(1),
  "&:hover": {
    backgroundColor: "#D70F64",
    color: "#ffffff",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
}));

const AppButton = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f8f9fa",
  borderRadius: "12px",
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  cursor: "pointer",
  transition: "all 0.3s ease",
  border: "1px solid #e0e0e0",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderColor: "#D70F64",
  },
}));

const Footer = () => {
  return (
    <FooterContainer component="footer">
      <Container maxWidth="lg">
        <Box sx={{
          display: "flex",
          flexWrap: "wrap",
          mb: 4,
          "& > div": {
            padding: "0 16px",
            marginBottom: { xs: 3, md: 0 },
            width: { xs: "100%", md: "33.333%" },
            "&:first-of-type": {
              paddingLeft: 0,
            },
            "&:last-of-type": {
              paddingRight: 0,
            }
          }
        }}>
          <Box>
            <LogoText>
              <span style={{ color: "#D70F64" }}>⚡</span>
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #D70F64 0%, #FF8000 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                EatRush
              </span>
            </LogoText>
            <Typography
              variant="body2"
              sx={{ color: "#666666", mb: 3, lineHeight: 1.6 }}
            >
              Tu comida favorita entregada en minutos.
            </Typography>

            <Box sx={{ display: "flex" }}>
              <SocialButton size="small" aria-label="Facebook">
                <FacebookIcon fontSize="small" />
              </SocialButton>
              <SocialButton size="small" aria-label="Instagram">
                <InstagramIcon fontSize="small" />
              </SocialButton>
              <SocialButton size="small" aria-label="Twitter">
                <TwitterIcon fontSize="small" />
              </SocialButton>
            </Box>
          </Box>

    
          <Box sx={{
            width: { xs: "50%", sm: "25%", md: "16.666%" },
            padding: "0 16px",
          }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 2, color: "#333333" }}
            >
              Comer
            </Typography>
            <Box>
              <FooterLink href="#" underline="none">
                Restaurantes
              </FooterLink>
              <FooterLink href="#" underline="none">
                Categorías
              </FooterLink>
              <FooterLink href="#" underline="none">
                Ofertas
              </FooterLink>
              <FooterLink href="#" underline="none">
                Pedidos
              </FooterLink>
            </Box>
          </Box>

  
          <Box sx={{
            width: { xs: "50%", sm: "25%", md: "16.666%" },
            padding: "0 16px",
          }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 2, color: "#333333" }}
            >
              Ayuda
            </Typography>
            <Box>
              <FooterLink href="#" underline="none">
                Centro de Ayuda
              </FooterLink>
              <FooterLink href="#" underline="none">
                Contáctanos
              </FooterLink>
              <FooterLink href="#" underline="none">
                Políticas
              </FooterLink>
              <FooterLink href="#" underline="none">
                FAQs
              </FooterLink>
            </Box>
          </Box>
          <Box sx={{
            width: { xs: "100%", sm: "50%", md: "33.333%" },
            padding: "0 16px",
          }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 2, color: "#333333" }}
            >
              Descarga la App
            </Typography>
            <Typography variant="body2" sx={{ color: "#666666", mb: 2 }}>
              Ordena más rápido desde tu celular
            </Typography>

            <AppButton>
              <AppleIcon sx={{ fontSize: 28, mr: 2, color: "#333333" }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#666666", display: "block" }}
                >
                  Disponible en
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  App Store
                </Typography>
              </Box>
            </AppButton>

            <AppButton>
              <AndroidIcon sx={{ fontSize: 28, mr: 2, color: "#333333" }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#666666", display: "block" }}
                >
                  Disponible en
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Google Play
                </Typography>
              </Box>
            </AppButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "#666666" }}>
            © 2026 EatRush. Todos los derechos reservados.
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            <FooterLink href="#" underline="none" sx={{ margin: 0 }}>
              Términos
            </FooterLink>
            <FooterLink href="#" underline="none" sx={{ margin: 0 }}>
              Privacidad
            </FooterLink>
            <FooterLink href="#" underline="none" sx={{ margin: 0 }}>
              Cookies
            </FooterLink>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;