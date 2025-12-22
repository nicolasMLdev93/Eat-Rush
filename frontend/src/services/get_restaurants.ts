import axios from "axios";
import type {
  RestaurantApi,
  ApiResponse_restaurants,
} from "../interfaces/interfaces";
import type { AxiosResponse } from "axios";

const API_BASE = "http://localhost:3000";

const get_allRestaurants = async (): Promise<RestaurantApi[]> => {
  try {
    const response: AxiosResponse<ApiResponse_restaurants> = await axios.get(
      `${API_BASE}/restaurants`
    );
    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    }
    return response.data.restaurants;
  } catch (error) {
    console.log("Error getting all restautants");
    throw new Error(`Failed to fetch restaurants: ${error}`);
  }
};

export default get_allRestaurants;
