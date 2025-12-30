import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/search_terms.css";
import type { RestaurantApi } from "../interfaces/interfaces";
import get_restBySearchName from "../services/get_restaurantsQuery";
import { restaurants_images } from "../data/images";
import { useNavigate } from "react-router-dom";

const SearchTerms: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q") || "";
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [restaurants, setRestaurants] = useState<RestaurantApi[]>([]);

  useEffect(() => {
    setLoading(true);
    get_restBySearchName(searchTerm)
      .then((response) => {
        if (response) {
          setRestaurants(response);
        } else {
          setRestaurants([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setRestaurants([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  const get_restImg = (id: number) => {
    const img = restaurants_images.find((img) => img.id === id);
    return img?.image;
  };

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm.trim()) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  if (loading) {
    return (
      <div className="search-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Buscando restaurantes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">Resultados de búsqueda</h1>
        <p className="results-count">
          {restaurants.length === 0 ? (
            "No se encontraron restaurantes"
          ) : (
            <>
              Encontramos <strong>{restaurants.length}</strong> restaurante
              {restaurants.length !== 1 ? "s" : ""}
              {searchTerm && (
                <>
                  {" "}
                  para "<span className="search-term">{searchTerm}</span>"
                </>
              )}
            </>
          )}
        </p>
      </div>

      {restaurants.length === 0 ? (
        <div className="no-results-container">
          <div className="no-results-icon">🔍</div>
          <h2 className="no-results-title">No encontramos resultados</h2>
          <p className="no-results-text">
            {searchTerm
              ? `No hay restaurantes que coincidan con "${searchTerm}"`
              : "Intenta buscar con otro término"}
          </p>
        </div>
      ) : (
        <div className="restaurants-grid">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <div className="restaurant-image-container">
                {get_restImg(restaurant.id) ? (
                  <img
                    src={get_restImg(restaurant.id)}
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                ) : (
                  <div className="empty-image">🍽️</div>
                )}

                <button className="favorite-btn">❤️</button>
              </div>

              <div className="restaurant-info">
                <div className="restaurant-header">
                  <h3
                    className="restaurant-name"
                    dangerouslySetInnerHTML={{
                      __html: highlightSearchTerm(restaurant.name),
                    }}
                  />

                  <span className="restaurant-rating">4.5</span>
                </div>

                {restaurant.description && (
                  <p
                    className="restaurant-description"
                    dangerouslySetInnerHTML={{
                      __html: highlightSearchTerm(restaurant.description),
                    }}
                  />
                )}

                <div className="restaurant-footer">
                  <div className="delivery-info">
                    <span className="delivery-icon">⏱️</span>
                    {restaurant.id % 2 === 0 ? "25-30 min" : "20-30 min"}
                  </div>

                  <button
                    onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                    className="order-btn"
                  >
                    Ordenar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchTerms;
