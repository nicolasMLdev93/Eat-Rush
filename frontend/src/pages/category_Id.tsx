import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import Footer from "../components/footer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import get_categoriesById from "../services/get_categorieID";
import get_productsByCat from "../services/get_productsCat";
import { products_images, category_images } from "../data/images";
import type { CategoryApi, ProductApi } from "../interfaces/interfaces";
import "../styles/cat_detail.css";
import { useDispatch } from "react-redux";
import { add_product } from "../cart/slice";

const CategoryDetail_ID: React.FC = () => {
  const { id_cat } = useParams();
  const [category, setCategory] = useState<CategoryApi | null>(null);
  const [products, setProducts] = useState<ProductApi[]>([]);
  const [loadingCat, setLoadingCat] = useState<boolean>(true);
  const [loadingProd, setLoadingProd] = useState<boolean>(true);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    setLoadingCat(true);
    if (id_cat) {
      get_categoriesById(id_cat)
        .then((response) => {
          if (!response) {
            window.location.replace("/");
          } else {
            setCategory(response);
          }
        })
        .catch((err) => {
          console.log("Error getting category by id", err);
          window.location.replace("/");
        })
        .finally(() => {
          setLoadingCat(false);
        });
    }
  }, [id_cat]);

  useEffect(() => {
    setLoadingProd(true);
    if (id_cat) {
      get_productsByCat(id_cat)
        .then((response) => {
          if (response) {
            setProducts(response);
          }
        })
        .catch((err) => {
          console.log("Error getting products by category", err);
        })
        .finally(() => {
          setLoadingProd(false);
        });
    }
  }, [id_cat]);

  const getCatIcon = (id: number) => {
    const icon = category_images.find((cat) => cat.id == id);
    return icon?.image;
  };

  const getProdImg = (id: number) => {
    const img = products_images.find((prod) => prod.id == id);
    return img?.image;
  };

  const handleAddItem = (id: number) => {
    const productToAdd = products.find((product) => product.id === id);
    if (productToAdd) {
      dispatch(add_product(productToAdd));

      setNotification({
        open: true,
        message: `¡${productToAdd.name} agregado al carrito!`,
        severity: "success",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const renderCategorySkeleton = () => (
    <Box className="category-info-container">
      <Box className="category-image-section">
        <Box className="category-image-wrapper">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton variant="rectangular" width={100} height={32} />
        </Box>
      </Box>

      <Box className="category-details-section">
        <Box className="category-title-container">
          <Box className="category-title-wrapper">
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="70%" height={24} />
            <Box className="category-rating-container">
              <Box className="rating-wrapper">
                <Skeleton variant="text" width={120} height={32} />
              </Box>
            </Box>
          </Box>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>

        <Box className="category-info-container">
          <Box className="category-info-item">
            <Box className="category-icon-text">
              <Skeleton variant="circular" width={24} height={24} />
              <Box>
                <Skeleton variant="text" width={60} height={20} />
                <Skeleton variant="text" width={100} height={24} />
              </Box>
            </Box>
          </Box>

          <Box className="category-info-item">
            <Box className="category-icon-text">
              <Skeleton variant="circular" width={24} height={24} />
              <Box>
                <Skeleton variant="text" width={60} height={20} />
                <Skeleton variant="text" width={80} height={24} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const renderProductsSkeleton = () => (
    <Box className="products-grid">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Box className="product-item" key={item}>
          <Card className="product-card">
            <Box className="product-image-container">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ borderRadius: "12px 12px 0 0" }}
              />
              <Skeleton variant="rectangular" width={100} height={24} />
            </Box>

            <CardContent className="product-card-content">
              <Box className="product-header">
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="20%" height={30} />
              </Box>
              <Box className="product-description-container">
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="80%" height={20} />
              </Box>

              <Box className="product-footer">
                <Box className="product-rating">
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton variant="text" width={40} height={20} />
                </Box>
                <Skeleton variant="rectangular" width={80} height={36} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );

  const renderCategoryContent = () => (
    <Box className="category-info-container">
      <Box className="category-image-section">
        <Box className="category-image-wrapper">
          <img
            src={getCatIcon(category?.id || 0)}
            alt={category?.name}
            className="category-main-image"
          />
          <Chip label={`${category?.name}`} className="category-chip" />
        </Box>
      </Box>

      <Box className="category-details-section">
        <Box className="category-title-container">
          <Box className="category-title-wrapper">
            <Typography variant="h4" className="category-name">
              {category?.name}
            </Typography>
            <p className="featured-products-title">
              Sumérgete en el universo de {category?.name.toLowerCase()} donde
              la calidad se encuentra con la variedad. Hemos reunido los
              productos más destacados de establecimientos verificados,
              asegurando que cada elección sea una experiencia gastronómica
              memorable. Desde lo clásico hasta lo innovador, todo al alcance de
              un clic.
            </p>
            <p className="featured-products-title">
              Un repartidor recoge tu pedido de todos los locales y te lo lleva
              directamente a casa. 🛵📦🍕📍
            </p>
          </Box>

          <IconButton className="favorite-button">
            <FavoriteIcon />
          </IconButton>
        </Box>

        <Box className="category-info-container"></Box>
      </Box>
    </Box>
  );

  const renderProductsContent = () => (
    <Box className="products-grid">
      {products.length === 0 ? (
        <p>No hay productos registrados con dicha categoría</p>
      ) : (
        products.map((product) => (
          <Box className="product-item" key={product.id}>
            <Card className="product-card">
              <Box className="product-image-container">
                <img
                  src={getProdImg(product.id)}
                  alt={product.name}
                  className="product-image"
                />
                <Chip label="🔥 Promo" size="small" className="popular-chip" />
              </Box>

              <CardContent className="product-card-content">
                <Box className="product-header">
                  <Typography variant="h6" className="product-name">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" className="product-price">
                    ${product.price}
                  </Typography>
                </Box>
                <Box className="product-description-container">
                  <Typography variant="body2" className="product-description">
                    {product.description}
                  </Typography>
                </Box>

                <Box className="product-footer">
                  <Box className="product-rating">
                    <StarIcon className="star-icon" />
                    <Typography variant="body2" className="rating-value">
                      {product.id % 2 === 0 ? "4.6" : "4.2"}
                    </Typography>
                  </Box>

                  <Button
                    onClick={() => handleAddItem(product.id)}
                    size="small"
                    variant="contained"
                    className="add-button"
                  >
                    Agregar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))
      )}
    </Box>
  );

  return (
    <Box className="category-detail-container">
      <Box className="category-header">
        <Container maxWidth="lg">
          {loadingCat ? renderCategorySkeleton() : renderCategoryContent()}
        </Container>
      </Box>

      <Container maxWidth="lg" className="products-container">
        <Typography variant="h5" className="featured-products-title">
          Productos de {category?.name}
        </Typography>

        {loadingProd ? renderProductsSkeleton() : renderProductsContent()}
      </Container>
      <Footer />

      <Snackbar
        open={notification.open}
        autoHideDuration={1000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CategoryDetail_ID;
