import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../styles/hero.css";
import get_allRestaurants from "../services/get_restaurants";
import get_allCategories from "../services/get_categories";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { restaurants_images, categories_icons } from "../data/images";
import type { RestaurantApi, CategoryApi } from "../interfaces/interfaces";

const Hero: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantApi[]>([]);
  const [categories, setcategories] = useState<CategoryApi[]>([]);
  const [loading_rest, setloading_rest] = useState<boolean>(true);
  const [loading_cat, setloading_cat] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setloading_rest(true);
    get_allRestaurants()
      .then((response) => {
        if (response) {
          setRestaurants(response);
        }
      })
      .catch((err) => {
        console.error("Error getting all restaurants on frontend!", err);
      })
      .finally(() => {
        setloading_rest(false);
      });
  }, []);

  useEffect(() => {
    setloading_cat(true);
    get_allCategories()
      .then((response) => {
        if (response) {
          setcategories(response);
        }
      })
      .catch((err) => {
        console.error("Error getting all categories on frontend!", err);
      })
      .finally(() => {
        setloading_cat(false);
      });
  }, []);

  const get_catIcon = (id: number) => {
    const icon = categories_icons.find((icon) => icon.id === id);
    return icon?.icon;
  };

  const get_restImg = (id: number) => {
    const img = restaurants_images.find((img) => img.id === id);
    return img?.image;
  };

  return (
    <div className="hero_container">
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Explora por categoría</h2>
          <button className="see-all-btn">Ver todas</button>
        </div>

        {loading_cat ? (
          <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={2.5}
            breakpoints={{
              640: { slidesPerView: 3.5, spaceBetween: 20 },
              768: { slidesPerView: 4.5, spaceBetween: 25 },
              1024: { slidesPerView: 6.5, spaceBetween: 30 },
            }}
            className="categories-swiper"
          >
            {[...Array(5)].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="category-card-skeleton">
                  <div className="skeleton-icon"></div>
                  <div className="skeleton-category-name"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : categories.length === 0 ? (
          <div className="empty-container">
            <p>No hay ninguna categoría disponible en este momento.</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={2.5}
            breakpoints={{
              640: { slidesPerView: 3.5, spaceBetween: 20 },
              768: { slidesPerView: 4.5, spaceBetween: 25 },
              1024: { slidesPerView: 6.5, spaceBetween: 30 },
            }}
            className="categories-swiper"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="category-card">
                  <div className="category-info">
                    <p className="category-icon">{get_catIcon(category.id)}</p>
                    <p className="category-name">{category.name}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      <section className="restaurants-section">
        <div className="section-header">
          <h2 className="section-title">Restaurantes populares</h2>
          <button className="see-all-btn">Ver todos</button>
        </div>

        {loading_rest ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 25 },
              1024: { slidesPerView: 3.2, spaceBetween: 30 },
              1280: { slidesPerView: 4.2, spaceBetween: 30 },
            }}
            className="restaurants-swiper"
          >
            {[...Array(4)].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="restaurant-card-skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-header">
                      <div className="skeleton-name"></div>
                      <div className="skeleton-rating"></div>
                    </div>
                    <div className="skeleton-description"></div>
                    <div className="skeleton-description shorter"></div>
                    <div className="skeleton-footer">
                      <div className="skeleton-delivery"></div>
                      <div className="skeleton-button"></div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : restaurants.length === 0 ? (
          <div className="empty-container">
            <p>No hay restaurantes disponibles en este momento.</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 25 },
              1024: { slidesPerView: 3.2, spaceBetween: 30 },
              1280: { slidesPerView: 4.2, spaceBetween: 30 },
            }}
            className="restaurants-swiper"
          >
            {restaurants.map((restaurant) => (
              <SwiperSlide key={restaurant.id}>
                <div className="restaurant-card">
                  <div className="restaurant-image-container">
                    <img
                      src={get_restImg(restaurant.id)}
                      className="restaurant-image"
                    />
                    <button className="favorite-btn">❤️</button>
                  </div>

                  <div className="restaurant-info">
                    <div className="restaurant-header">
                      <h3 className="restaurant-name">{restaurant.name}</h3>
                      <div className="rating-badge">
                        <span className="rating-star">⭐</span>
                        <span className="rating-value">4.5</span>
                      </div>
                    </div>

                    <p className="restaurant-description">
                      {restaurant.description.substring(0, 30)}...
                    </p>

                    <div className="restaurant-footer">
                      <div className="delivery-info">
                        <span className="delivery-icon">🚚</span>
                        <span className="delivery-time">
                          {restaurant.id % 2 == 0 ? "20-30 min" : "25-30 min"}
                        </span>
                      </div>
                      <button
                        onClick={() => navigate(`restaurant/${restaurant.id}`)}
                        className="order-btn"
                      >
                        Ordenar
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
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
