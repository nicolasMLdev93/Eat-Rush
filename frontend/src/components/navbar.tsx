import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: alpha("#333333", 0.05),
  border: "1px solid #e0e0e0",
  "&:hover": {
    backgroundColor: alpha("#333333", 0.08),
    borderColor: "#bdbdbd",
  },
  marginLeft: 0,
  marginRight: theme.spacing(2),
  width: "auto",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#666666",
  cursor: "pointer",
  "&:hover": {
    color: "#D70F64",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#333333",
  flexGrow: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "380px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "480px",
    },
    "&::placeholder": {
      color: "#757575",
      opacity: 0.8,
    },
  },
}));

const MobileSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: alpha("#333333", 0.05),
  border: "1px solid #e0e0e0",
  "&:hover": {
    backgroundColor: alpha("#333333", 0.08),
    borderColor: "#bdbdbd",
  },
  width: "100%",
  margin: theme.spacing(0, 1),
  display: "flex",
  alignItems: "center",
}));

const MobileSearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#666666",
  cursor: "pointer",
  "&:hover": {
    color: "#D70F64",
  },
}));

const MobileStyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#333333",
  flexGrow: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    fontSize: "0.9rem",
    "&::placeholder": {
      color: "#757575",
      opacity: 0.8,
      fontSize: "0.9rem",
    },
  },
}));

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { total_products } = useSelector((state: any) => state.cart);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
    setDrawerOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
    setDrawerOpen(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const drawerContent = () => (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#333333" }}>
          Menú
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon sx={{ color: "#333333" }} />
        </IconButton>
      </Box>

      <List sx={{ p: 2 }}>
        <ListItem
          sx={{
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            mb: 2,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.02)",
            },
          }}
        >
          <ListItemIcon>
            <LocationOnIcon sx={{ color: "#D70F64" }} />
          </ListItemIcon>
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "#757575",
                fontSize: "0.75rem",
                display: "block",
              }}
            >
              Enviar a
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#333333",
              }}
            >
              Av. Principal 123
            </Typography>
          </Box>
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <ListItemButton
          sx={{
            borderRadius: "8px",
            mb: 2,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
          onClick={handleLoginClick}
        >
          <ListItemIcon>
            <AccountCircle sx={{ color: "#333333" }} />
          </ListItemIcon>
          <ListItemText
            primary="Iniciar Sesión"
            primaryTypographyProps={{
              fontWeight: 500,
              color: "#333333",
            }}
          />
        </ListItemButton>

        <Divider sx={{ my: 1 }} />

        <ListItem
          sx={{
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              cursor: "pointer",
            },
          }}
          onClick={handleCartClick}
        >
          <ListItemIcon>
            <Badge
              badgeContent={total_products}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#D70F64",
                  color: "white",
                  fontSize: "0.6rem",
                  fontWeight: "bold",
                },
              }}
            >
              <ShoppingCartIcon sx={{ color: "#333333" }} />
            </Badge>
          </ListItemIcon>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#333333",
              }}
            >
              Carrito de compras
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#757575",
                fontSize: "0.75rem",
              }}
            >
              {total_products} {total_products === 1 ? "ítem" : "ítems"}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#D70F64",
              color: "white",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#C00E5A",
              },
            }}
            onClick={handleCartClick}
          >
            Ver carrito
          </Button>
        </ListItem>

        <Divider sx={{ my: 3 }} />

        <List sx={{ p: 0 }}>
          {[
            { text: "Inicio", icon: <HomeIcon />, path: "/" },
            {
              text: "Restaurantes",
              icon: <RestaurantIcon />,
              path: "/restaurants",
            },
            { text: "Favoritos", icon: <FavoriteIcon />, path: "/favorites" },
            { text: "Mis pedidos", icon: <LocalMallIcon />, path: "/orders" },
            { text: "Historial", icon: <HistoryIcon />, path: "/history" },
            {
              text: "Configuración",
              icon: <SettingsIcon />,
              path: "/settings",
            },
          ].map((item) => (
            <ListItemButton
              key={item.text}
              sx={{
                borderRadius: "8px",
                mb: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                {React.cloneElement(item.icon, { sx: { color: "#D70F64" } })}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  color: "#333333",
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </List>

      <Box sx={{ mt: "auto", p: 2, borderTop: "1px solid #f0f0f0" }}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: "8px",
            borderColor: "#e0e0e0",
            color: "#333333",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              borderColor: "#bdbdbd",
              backgroundColor: "rgba(0, 0, 0, 0.02)",
            },
          }}
          startIcon={<HelpIcon />}
        >
          Ayuda y soporte
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#ffffff",
          color: "#333333",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Toolbar sx={{ padding: { xs: "0 8px", sm: "0 16px" } }}>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              minWidth: "fit-content",
              mr: { xs: 1, sm: 2 },
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
            onClick={handleLogoClick}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 800,
                fontFamily: '"Poppins", "Roboto", sans-serif',
                letterSpacing: "-0.5px",
                color: "#333333",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <span style={{ color: "#D70F64" }}>⚡</span>
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #D70F64 0%, #FF8000 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontSize: { xs: "1.1rem", sm: "1.5rem" },
                }}
              >
                EatRush
              </span>
            </Typography>
          </Box>

          <MobileSearch
            sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}
          >
            <MobileStyledInputBase
              placeholder="Buscar restaurantes .."
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <MobileSearchIconWrapper onClick={handleSearch}>
              <SearchIcon />
            </MobileSearchIconWrapper>
          </MobileSearch>

          <Search
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: { md: 1, lg: 0 },
            }}
          >
            <StyledInputBase
              placeholder="Buscar restaurantes .."
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SearchIconWrapper onClick={handleSearch}>
              <SearchIcon />
            </SearchIconWrapper>
          </Search>

          <Box sx={{ flexGrow: { xs: 0, md: 1 } }} />

          <IconButton
            size="large"
            aria-label="carrito de compras"
            onClick={handleCartClick}
            sx={{
              display: { xs: "none", md: "flex" },
              color: "#333333",
              mr: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <Badge
              badgeContent={total_products}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#D70F64",
                  color: "white",
                  fontSize: "0.6rem",
                  fontWeight: "bold",
                },
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            aria-label="carrito de compras móvil"
            onClick={handleCartClick}
            sx={{
              display: { xs: "flex", md: "none" },
              color: "#333333",
              mr: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <Badge
              badgeContent={total_products}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#D70F64",
                  color: "white",
                  fontSize: "0.6rem",
                  fontWeight: "bold",
                },
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            aria-label="abrir menú lateral en móvil"
            onClick={toggleDrawer(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              color: "#333333",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
              ml: 1,
            }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            size="large"
            aria-label="abrir menú lateral"
            onClick={toggleDrawer(true)}
            sx={{
              display: { xs: "none", md: "flex" },
              color: "#333333",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "90%",
            maxWidth: "350px",
            boxShadow: "-5px 0 25px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        {drawerContent()}
      </Drawer>
      <Toolbar />
    </>
  );
}
