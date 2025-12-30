import axios from "axios";
import type {
  RestaurantApi,
  ApiResponse_restaurant_SearchName,
} from "../interfaces/interfaces";
import type { AxiosResponse } from "axios";

const API_BASE = "http://localhost:3000";

const get_restBySearchName = async (searchParam: string): Promise<RestaurantApi[]> => {
  try {
    const response: AxiosResponse<ApiResponse_restaurant_SearchName> = await axios.get(
      `${API_BASE}/restaurant_search?searchTerm=${searchParam}`
    );
    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    }
    return response.data.restaurants;
  } catch (error) {
    throw new Error(`Failed to fetch restaurant with name ${searchParam}: ${error}`);
  }
};

export default get_restBySearchName
