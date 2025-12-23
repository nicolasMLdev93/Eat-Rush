import axios from "axios";
import type {
   RestaurantApi,
  ApiResponse_restaurant_ID,
} from "../interfaces/interfaces";
import type { AxiosResponse } from "axios";

const API_BASE = "http://localhost:3000";

const get_restaurantByName = async (name: string): Promise<RestaurantApi> => {
  try {
    const response: AxiosResponse<ApiResponse_restaurant_ID> = await axios.get(
      `${API_BASE}/restaurant/name/${name}`
    );
    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    }
    return response.data.restaurant;
  } catch (error) {
    throw new Error(`Failed to fetch category with name ${name}: ${error}`);
  }
};

export default get_restaurantByName
