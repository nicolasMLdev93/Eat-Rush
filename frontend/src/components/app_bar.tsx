import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Estilo para la barra de búsqueda
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: alpha("#333333", 0.05), // Gris muy claro
  border: "1px solid #e0e0e0",
  "&:hover": {
    backgroundColor: alpha("#333333", 0.08),
    borderColor: "#bdbdbd",
  },
  marginLeft: 0,
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#666666", // Gris medio
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#333333", // Gris oscuro
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "500px",
    },
    "&::placeholder": {
      color: "#757575", // Gris para placeholder
      opacity: 0.8,
    },
  },
}));

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems] = useState(3);

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchTerm.trim()) {
      console.log("Buscando:", searchTerm);
      alert(`Buscando: ${searchTerm}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#ffffff", // Fondo blanco
          color: "#333333", // Texto gris oscuro
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)", // Sombra sutil
          borderBottom: "1px solid #f0f0f0", // Borde sutil inferior
        }}
      >
        <Toolbar>
          {/* Menú hamburguesa */}
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{
              mr: 2,
              display: { xs: "block", md: "none" },
              color: "#333333", // Gris oscuro
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
              "&:focus": { outline: "none" },
              "&:focus-visible": { outline: "none" },
              "&.Mui-focusVisible": { boxShadow: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo/Nombre */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: { xs: 1, md: 0 },
              fontWeight: 800,
              fontFamily: '"Poppins", "Roboto", sans-serif',
              letterSpacing: "-0.5px",
              color: "#333333", // Gris oscuro
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <span style={{ color: "#D70F64" }}>⚡</span> {/* Rayo en color */}
            <span style={{ 
              background: "linear-gradient(135deg, #D70F64 0%, #FF8000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              EatRush
            </span>
          </Typography>

          {/* Selector de ubicación */}
          <Button
            startIcon={<LocationOnIcon sx={{ color: "#D70F64" }} />} // Icono en color
            sx={{
              display: { xs: "none", md: "flex" },
              ml: 3,
              mr: 1,
              color: "#333333", // Texto gris oscuro
              backgroundColor: "rgba(0, 0, 0, 0.02)", // Fondo gris muy claro
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                borderColor: "#bdbdbd",
              },
              "&:focus": { outline: "none", boxShadow: "none" },
              "&:focus-visible": { outline: "none", boxShadow: "none" },
              "&.Mui-focusVisible": { boxShadow: "none" },
            }}
          >
            <Box sx={{ textAlign: "left" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#757575", // Gris medio
                  fontSize: "0.6rem",
                  display: "block",
                  lineHeight: 1,
                }}
              >
                Enviar a
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  color: "#333333", // Gris oscuro
                  lineHeight: 1.2,
                }}
              >
                Av. Principal 123
              </Typography>
            </Box>
          </Button>

          {/* Barra de búsqueda */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar restaurantes, comidas..."
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
            />
          </Search>

          {/* Espacio flexible */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Carrito */}
          <IconButton
            size="large"
            aria-label="carrito de compras"
            sx={{
              mr: 1,
              color: "#333333", // Gris oscuro
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
              "&:focus": { outline: "none" },
              "&:focus-visible": { outline: "none" },
              "&.Mui-focusVisible": { boxShadow: "none" },
            }}
          >
            <Badge 
              badgeContent={cartItems} 
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#D70F64", // Color rojo de la marca
                  color: "white",
                  fontSize: "0.6rem",
                  fontWeight: "bold",
                },
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Botón Login */}
          <Button
            startIcon={<AccountCircle sx={{ color: "#333333" }} />}
            sx={{
              display: { xs: "none", sm: "flex" },
              color: "#333333", // Gris oscuro
              backgroundColor: "rgba(0, 0, 0, 0.02)", // Fondo gris muy claro
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                borderColor: "#bdbdbd",
              },
              "&:focus": { outline: "none", boxShadow: "none" },
              "&:focus-visible": { outline: "none", boxShadow: "none" },
              "&.Mui-focusVisible": { boxShadow: "none" },
            }}
          >
            Iniciar Sesión
          </Button>

          {/* Versión móvil para login */}
          <IconButton
            aria-label="login"
            sx={{
              display: { xs: "flex", sm: "none" },
              color: "#333333",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
              "&:focus": { outline: "none" },
              "&:focus-visible": { outline: "none" },
              "&.Mui-focusVisible": { boxShadow: "none" },
            }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Espacio para evitar que el contenido quede detrás de la navbar */}
      <Toolbar />
    </Box>
  );
}