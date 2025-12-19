import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../styles/hero.css";

const restaurants = [
  {
    id: 1,
    name: "Burger Express",
    category: "Hamburguesas",
    rating: 4.7,
    deliveryTime: "15-25 min",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    discount: "20% OFF",
  },
  {
    id: 2,
    name: "Sushi Master",
    category: "Sushi",
    rating: 4.9,
    deliveryTime: "30-40 min",
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    discount: "Envío gratis",
  },
  {
    id: 3,
    name: "Pizza Napoli",
    category: "Pizza",
    rating: 4.5,
    deliveryTime: "20-30 min",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    discount: "2x1",
  },
  {
    id: 4,
    name: "Tacos México",
    category: "Mexicana",
    rating: 4.6,
    deliveryTime: "25-35 min",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    discount: "15% OFF",
  },
  {
    id: 5,
    name: "Salad Factory",
    category: "Saludable",
    rating: 4.8,
    deliveryTime: "20-30 min",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    discount: "Combo saludable",
  },
];

// Datos para categorías
const categories = [
  { id: 1, name: "Rápida", icon: "🍔" },
  { id: 2, name: "Pizza", icon: "🍕" },
  { id: 3, name: "Sushi", icon: "🍣" },
  { id: 4, name: "Mexicana", icon: "🌮" },
  { id: 5, name: "Saludable", icon: "🥗" },
];

const Hero: React.FC = () => {
  return (
    <div className="hero_container">
      {/* Sección de categorías */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Explora por categoría</h2>
          <button className="see-all-btn">Ver todas</button>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={2.5}
          breakpoints={{
            640: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4.5,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 6.5,
              spaceBetween: 30,
            },
          }}
          className="categories-swiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="category-card">
                <div className="category-icon">{category.icon}</div>
                <div className="category-info">
                  <h5 className="category-name">{category.name}</h5>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="restaurants-section">
        <div className="section-header">
          <h2 className="section-title">Restaurantes populares</h2>
          <button className="see-all-btn">Ver todos</button>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4.2,
              spaceBetween: 30,
            },
          }}
          className="restaurants-swiper"
        >
          {restaurants.map((restaurant) => (
            <SwiperSlide key={restaurant.id}>
              <div className="restaurant-card">
                <div className="restaurant-image-container">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                  {restaurant.discount && (
                    <div className="discount-badge">{restaurant.discount}</div>
                  )}
                  <button className="favorite-btn">❤️</button>
                </div>

                <div className="restaurant-info">
                  <div className="restaurant-header">
                    <h3 className="restaurant-name">{restaurant.name}</h3>
                    <div className="rating-badge">
                      <span className="rating-star">⭐</span>
                      <span className="rating-value">{restaurant.rating}</span>
                    </div>
                  </div>

                  <p className="restaurant-category">{restaurant.category}</p>

                  <div className="restaurant-footer">
                    <div className="delivery-info">
                      <span className="delivery-icon">🚚</span>
                      <span className="delivery-time">
                        {restaurant.deliveryTime}
                      </span>
                    </div>
                    <button className="order-btn">Ordenar</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="promo-banner">
        <div className="promo-content">
          <h2 className="promo-title">¡Primer pedido con 30% OFF!</h2>
          <p className="promo-description">
            Usa el código <span className="promo-code">Z5LSD6651D30</span> en tu
            primera compra
          </p>
          <button className="promo-btn">Usar código</button>
        </div>
        <div className="promo-image">
          <div className="promo-icon">🎉</div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
