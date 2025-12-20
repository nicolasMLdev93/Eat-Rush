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

interface RestaurantApi {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  isActive: boolean;
}

interface RestaurantUI {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  isActive: boolean;
  category: string;
  rating: number;
  deliveryTime: string;
  image: string;
  discount: string;
}

const categories = [
  { id: 1, name: "Rápida", icon: "🍔" },
  { id: 2, name: "Pizza", icon: "🍕" },
  { id: 3, name: "Sushi", icon: "🍣" },
  { id: 4, name: "Mexicana", icon: "🌮" },
  { id: 5, name: "Saludable", icon: "🥗" },
];

const defaultImages = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
];

const adaptRestaurantData = (apiData: RestaurantApi[]): RestaurantUI[] => {
  return apiData.map((restaurant, index) => {
    let category = "Comida";
    if (restaurant.name.toLowerCase().includes("burger")) category = "Hamburguesas";
    if (restaurant.name.toLowerCase().includes("sushi")) category = "Sushi";
    if (restaurant.name.toLowerCase().includes("pizza")) category = "Pizza";
    if (restaurant.name.toLowerCase().includes("taco")) category = "Mexicana";
    if (restaurant.description.toLowerCase().includes("salad") || restaurant.description.toLowerCase().includes("saludable")) category = "Saludable";
    
    const rating = parseFloat((4 + Math.random() * 1).toFixed(1));
    const deliveryTimes = ["15-25 min", "20-30 min", "25-35 min", "30-40 min"];
    const deliveryTime = deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)];
    const image = defaultImages[index % defaultImages.length];
    const discount = "Envío gratis";

    return {
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      address: restaurant.address,
      phone: restaurant.phone,
      isActive: restaurant.isActive,
      category,
      rating,
      deliveryTime,
      image,
      discount,
    };
  });
};

const Hero: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    get_allRestaurants()
      .then((response) => {
        if (isMounted && response && Array.isArray(response)) {
          const adaptedData = adaptRestaurantData(response);
          setRestaurants(adaptedData);
        } else if (isMounted) {
          setError("Datos de restaurantes no válidos");
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error getting all restaurants on frontend!", err);
          setError("No se pudieron cargar los restaurantes");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const renderSkeleton = () => {
    return (
      <div className="hero_container">
        <section className="categories-section">
          <div className="section-header">
            <div className="skeleton-title"></div>
            <div className="skeleton-button"></div>
          </div>

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
        </section>

        <section className="restaurants-section">
          <div className="section-header">
            <div className="skeleton-title"></div>
            <div className="skeleton-button"></div>
          </div>

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
        </section>

        <section className="promo-banner-skeleton">
          <div className="skeleton-promo-content">
            <div className="skeleton-promo-title"></div>
            <div className="skeleton-promo-text"></div>
            <div className="skeleton-promo-button"></div>
          </div>
          <div className="skeleton-promo-icon"></div>
        </section>
      </div>
    );
  };

  if (error) {
    return (
      <div className="hero_container">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return renderSkeleton();
  }

  if (restaurants.length === 0) {
    return (
      <div className="hero_container">
        <div className="empty-container">
          <p>No hay restaurantes disponibles en este momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero_container">
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
            640: { slidesPerView: 3.5, spaceBetween: 20 },
            768: { slidesPerView: 4.5, spaceBetween: 25 },
            1024: { slidesPerView: 6.5, spaceBetween: 30 },
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
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="restaurant-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultImages[0];
                    }}
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

                  <p className="restaurant-description">
                    {restaurant.description.substring(0, 30)}...
                  </p>

                  <div className="restaurant-footer">
                    <div className="delivery-info">
                      <span className="delivery-icon">🚚</span>
                      <span className="delivery-time">{restaurant.deliveryTime}</span>
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
            Usa el código <span className="promo-code">Z5LSD6651D30</span> en tu primera compra
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