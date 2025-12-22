interface RestaurantApi {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  isActive: boolean;
}

interface CategoryApi {
  id: number;
  name: string;
  isActive: boolean;
}

interface ApiResponse_restaurants {
  restaurants: RestaurantApi[];
  success: boolean;
}

interface ApiResponse_restaurant_ID {
  restaurant: RestaurantApi;
  success: boolean;
}

interface ApiResponse_categories {
  categories: CategoryApi[];
  success: boolean;
}

interface ApiResponse_category_ID {
  category: CategoryApi;
  success: boolean;
}

interface ProductApi {
  id: number;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  categoryId: number;
  restaurantId: number;
}

interface ApiResponse_product {
  products: ProductApi[];
  success: boolean;
}

export type {
  RestaurantApi,
  CategoryApi,
  ApiResponse_restaurants,
  ApiResponse_categories,
  ProductApi,
  ApiResponse_product,
  ApiResponse_restaurant_ID,
  ApiResponse_category_ID,
};
