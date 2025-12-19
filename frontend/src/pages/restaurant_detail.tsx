import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Rating,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Footer from '../components/footer';

const RestaurantHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(4, 0),
  borderBottom: '1px solid #f0f0f0',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 0),
  },
}));

const RestaurantImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '300px',
  borderRadius: '16px',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: '200px',
  },
}));

// Card con altura fija
const ProductCard = styled(Card)(({ theme }) => ({
  height: '380px', // Altura fija para todas las cards
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  border: '1px solid #f0f0f0',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  },
}));

// Contenedor de imagen con altura fija
const ProductImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '160px', // Altura fija para todas las imágenes
  width: '100%',
  overflow: 'hidden',
}));

// Imagen con object-fit cover
const ProductImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Esto hace que todas las imágenes se recorten igual
  display: 'block',
});

const RestaurantDetail = () => {
  // Datos del restaurante
  const restaurant = {
    id: 1,
    name: 'Burger Express',
    category: 'Hamburguesas • Americana',
    rating: 4.7,
    reviewCount: 1254,
    deliveryTime: '15-25 min',
    deliveryFee: '$2.99',
    minOrder: '$15.00',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Las mejores hamburguesas artesanales de la ciudad. Ingredientes frescos y preparación tradicional.',
    address: 'Av. Principal 1234, Centro',
    openingHours: 'Lun-Dom: 10:00 AM - 11:00 PM',
    tags: ['🍔 Hamburguesas', '🥤 Bebidas', '🍟 Acompañamientos'],
  };

  // Solo 3 productos con descripciones de longitud similar
  const products = [
    {
      id: 1,
      name: 'Classic Burger',
      description: 'Carne 100% res, lechuga, tomate, cebolla y queso cheddar.',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      rating: 4.8,
      popular: true,
    },
    {
      id: 2,
      name: 'Papas Fritas',
      description: 'Porción grande de papas fritas crujientes y doradas.',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      rating: 4.6,
      popular: true,
    },
    {
      id: 3,
      name: 'Coca-Cola',
      description: 'Refresco de 500ml frío y refrescante.',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      rating: 4.7,
      popular: false,
    },
  ];

  return (
    <Box>
      {/* Header del restaurante */}
      <RestaurantHeader>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <RestaurantImage>
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Chip
                  label="🍔 Especialidad"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    backgroundColor: '#D70F64',
                    color: '#ffffff',
                    fontWeight: 600,
                  }}
                />
              </RestaurantImage>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#333333', mb: 1 }}>
                    {restaurant.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666666', mb: 2 }}>
                    {restaurant.category}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={restaurant.rating} precision={0.1} readOnly />
                      <Typography variant="body2" sx={{ color: '#666666', ml: 1 }}>
                        {restaurant.rating} ({restaurant.reviewCount} reviews)
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <IconButton>
                  <FavoriteIcon sx={{ color: '#999999' }} />
                </IconButton>
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon sx={{ color: '#D70F64' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#666666', display: 'block' }}>
                        Tiempo
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {restaurant.deliveryTime}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocalShippingIcon sx={{ color: '#D70F64' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#666666', display: 'block' }}>
                        Envío
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {restaurant.deliveryFee}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Typography variant="body2" sx={{ color: '#666666', mb: 2 }}>
                {restaurant.description}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {restaurant.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: '#f8f9fa',
                      color: '#666666',
                      border: '1px solid #e0e0e0',
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </RestaurantHeader>

      {/* Solo 3 productos - TODOS con el MISMO tamaño */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#c6c6c6ff' }}>
          Productos Destacados
        </Typography>
        
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard>
                <ProductImageContainer>
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                  />
                  {product.popular && (
                    <Chip
                      label="🔥 Popular"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: '#FF8000',
                        color: '#ffffff',
                        fontWeight: 600,
                      }}
                    />
                  )}
                </ProductImageContainer>

                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  p: 2 
                }}>
                  {/* Contenedor para nombre y precio */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    mb: 1,
                    minHeight: '48px' // Altura mínima para que los nombres largos no desajusten
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        fontSize: '1rem',
                        lineHeight: 1.2,
                        maxWidth: '60%'
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#D70F64', fontWeight: 700 }}>
                      ${product.price}
                    </Typography>
                  </Box>

                  {/* Descripción con altura fija */}
                  <Box sx={{ mb: 2, flexGrow: 1, minHeight: '48px' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666666', 
                        fontSize: '0.9rem',
                        lineHeight: 1.4,
                      }}
                    >
                      {product.description}
                    </Typography>
                  </Box>

                  {/* Footer de la card */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mt: 'auto' // Esto empuja el footer al fondo
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StarIcon sx={{ fontSize: '1rem', color: '#FFD700', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: '#666666' }}>
                        {product.rating}
                      </Typography>
                    </Box>
                    
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: '#D70F64',
                        color: '#ffffff',
                        borderRadius: '20px',
                        textTransform: 'none',
                        fontWeight: 500,
                        minWidth: '100px', // Ancho fijo para todos los botones
                        '&:hover': {
                          backgroundColor: '#FF8000',
                        },
                      }}
                    >
                      Agregar
                    </Button>
                  </Box>
                </CardContent>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer/>
    </Box>
  );
};

export default RestaurantDetail;