import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import get_restaurantByName from "../services/get_restaurantName";
import "../styles/search_terms.css";
import type {RestaurantApi} from '../interfaces/interfaces'

const SearchTerms: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q") || "";
  
  const [loading, setLoading] = useState<boolean>(true);
  const [restaurants, setRestaurants] = useState<RestaurantApi[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      
      try {
        const response = await get_restaurantByName(searchTerm);
        
        if (response && Array.isArray(response)) {
          // Filtrar restaurantes que incluyan el término de búsqueda
          const searchLower = searchTerm.toLowerCase();
          const filteredRestaurants = response.filter((restaurant: RestaurantApi) => {
            // Buscar en nombre, descripción y tipo de cocina
            const inName = restaurant.name.toLowerCase().includes(searchLower);
            const inDescription = restaurant.description?.toLowerCase().includes(searchLower) || false;
            const inCuisine = restaurant.cuisine_type?.toLowerCase().includes(searchLower) || false;
            
            return inName || inDescription || inCuisine;
          });
          
          setRestaurants(filteredRestaurants);
        } else {
          setRestaurants([]);
        }
      } catch (err) {
        console.error("Error:", err);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [searchTerm]);

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
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
        <h1 className="search-title">
          Resultados de búsqueda
        </h1>
        <p className="results-count">
          {restaurants.length === 0 ? (
            "No se encontraron restaurantes"
          ) : (
            <>
              Encontramos <strong>{restaurants.length}</strong> restaurante{restaurants.length !== 1 ? 's' : ''} 
              {searchTerm && (
                <> para "<span className="search-term">{searchTerm}</span>"</>
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
                {restaurant.image_url ? (
                  <img 
                    
                    alt={restaurant.name} 
                    className="restaurant-image" 
                  />
                ) : (
                  <div className="empty-image">🍽️</div>
                )}
                
                
                
                <button className="favorite-btn">
                  "❤️" 
                </button>
              </div>

              <div className="restaurant-info">
                <div className="restaurant-header">
                  <h3 
                    className="restaurant-name" 
                    dangerouslySetInnerHTML={{ 
                      __html: highlightSearchTerm(restaurant.name) 
                    }} 
                  />
                  
                  <span>4.5</span>
                </div>


                {restaurant.description && (
                  <p 
                    style={{ 
                      fontSize: "0.9rem", 
                      color: "#666", 
                      marginBottom: "15px",
                      lineHeight: "1.4"
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: highlightSearchTerm(restaurant.description) 
                    }} 
                  />
                )}

                <div className="restaurant-footer">
                  <div className="delivery-info">
                    <span className="delivery-icon">⏱️</span>
                    {"15-30 min"}
                  </div>
                  
                  <button className="order-btn">
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