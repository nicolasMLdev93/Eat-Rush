import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Rating,
  Button,
  Skeleton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import get_restaurantByName from "../services/get_restaurantName";
import get_productsByRest from "../services/get_productsRest";
import { restaurants_images, products_images } from "../data/images";
import type { RestaurantApi, ProductApi } from "../interfaces/interfaces";
import "../styles/rest_detail.css";

const RestaurantDetail_Name: React.FC = () => {
  const { name_rest } = useParams();
  const [restaurant, setrestaurant] = useState<RestaurantApi | null>(null);
  const [products_rest, setproducts_rest] = useState<ProductApi[]>([]);
  const [loading_rest, setloading_rest] = useState<boolean>(true);
  const [loading_prod, setloading_prod] = useState<boolean>(true);
  const [id_restaurant, setid_restaurant] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    setloading_rest(true);
    if (name_rest) {
      get_restaurantByName(name_rest)
        .then((response) => {
          if (response) {
            setrestaurant(response);
            setid_restaurant(response.id);
          }
        })
        .catch((err) => {
          console.log("Error getting restaurant by id", err);
        })
        .finally(() => {
          setloading_rest(false);
        });
    }
  }, [name_rest]);

  useEffect(() => {
    setloading_prod(true);
    if (id_restaurant) {
      get_productsByRest(id_restaurant)
        .then((response) => {
          if (response) {
            setproducts_rest(response);
          }
        })
        .catch((err) => {
          console.log("Error getting products by restaurant", err);
        })
        .finally(() => {
          setloading_prod(false);
        });
    }
  }, [id_restaurant]);

  const get_restImg = (id: number) => {
    const img = restaurants_images.find((rest) => rest.id == id);
    return img?.image;
  };

  const get_ProdImg = (id: number) => {
    const img = products_images.find((prod) => prod.id == id);
    return img?.image;
  };

  const renderRestaurantSkeleton = () => (
    <Box className="restaurant-info-container">
      <Box className="restaurant-image-section">
        <Box className="restaurant-image-wrapper">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton variant="rectangular" width={100} height={32} />
        </Box>
      </Box>

      <Box className="restaurant-details-section">
        <Box className="restaurant-title-container">
          <Box className="restaurant-title-wrapper">
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="70%" height={24} />
            <Box className="restaurant-rating-container">
              <Box className="rating-wrapper">
                <Skeleton variant="text" width={120} height={32} />
              </Box>
            </Box>
          </Box>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>

        <Box className="delivery-info-container">
          <Box className="delivery-info-item">
            <Box className="delivery-icon-text">
              <Skeleton variant="circular" width={24} height={24} />
              <Box>
                <Skeleton variant="text" width={60} height={20} />
                <Skeleton variant="text" width={100} height={24} />
              </Box>
            </Box>
          </Box>

          <Box className="delivery-info-item">
            <Box className="delivery-icon-text">
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

  const renderRestaurantContent = () => (
    <Box className="restaurant-info-container">
      <Box className="restaurant-image-section">
        <Box className="restaurant-image-wrapper">
          <img
            src={get_restImg(restaurant?.id || 0)}
            alt={restaurant?.name}
            className="restaurant-main-image"
          />
          <Chip label="🍔 Delivery" className="specialty-chip" />
        </Box>
      </Box>

      <Box className="restaurant-details-section">
        <Box className="restaurant-title-container">
          <Box className="restaurant-title-wrapper">
            <Typography variant="h4" className="restaurant-name">
              {restaurant?.name}
            </Typography>
            <Typography variant="body1" className="restaurant-category">
              {restaurant?.description}
            </Typography>
            <Typography variant="body1" className="restaurant-category">
              Dirección: {restaurant?.address}
            </Typography>
            <Box className="restaurant-rating-container">
              <Box className="rating-wrapper">
                <Rating value={4.5} precision={0.1} readOnly />
                <Typography variant="body2" className="rating-text">
                  {4.5}
                </Typography>
              </Box>
            </Box>
          </Box>

          <IconButton className="favorite-button">
            <FavoriteIcon />
          </IconButton>
        </Box>

        <Box className="delivery-info-container">
          <Box className="delivery-info-item">
            <Box className="delivery-icon-text">
              <AccessTimeIcon className="delivery-icon" />
              <Box>
                <Typography variant="caption" className="delivery-label">
                  Tiempo
                </Typography>
                <Typography variant="body2" className="delivery-value">
                  20 - 30 min aprox.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="delivery-info-item">
            <Box className="delivery-icon-text">
              <LocalShippingIcon className="delivery-icon" />
              <Box>
                <Typography variant="caption" className="delivery-label">
                  Envío
                </Typography>
                <Typography variant="body2" className="delivery-value">
                  Gratis
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const renderProductsContent = () => (
    <Box className="products-grid">
      {products_rest.length === 0 ? (
        <p>No hay productos registrados en el restaurante</p>
      ) : (
        products_rest.map((product) => (
          <Box className="product-item" key={product.id}>
            <Card className="product-card">
              <Box className="product-image-container">
                <img
                  src={get_ProdImg(product.id)}
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
                      {product.id % 2 == 0 ? "4.6" : "4.2"}
                    </Typography>
                  </Box>

                  <Button
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
    <Box className="restaurant-detail-container">
      <Box className="restaurant-header_detail">
        <Container maxWidth="lg">
          {loading_rest
            ? renderRestaurantSkeleton()
            : renderRestaurantContent()}
        </Container>
      </Box>

      <Container maxWidth="lg" className="products-container">
        <Typography variant="h5" className="featured-products-title">
          Productos Destacados
        </Typography>

        {loading_prod ? renderProductsSkeleton() : renderProductsContent()}
      </Container>
      <Footer />
    </Box>
  );
};

export default RestaurantDetail_Name;
