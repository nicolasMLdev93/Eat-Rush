import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
  RestaurantApi,
  ApiResponse_restaurant_ID,
} from "../interfaces/interfaces";

const API_BASE = "http://localhost:3000";

const get_restaurantsById = async (id: number): Promise<RestaurantApi> => {
  try {
    const response: AxiosResponse<ApiResponse_restaurant_ID> = await axios.get(
      `${API_BASE}/restaurant/${id}`
    );
    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    }
    return response.data.restaurant;
  } catch (error) {
    throw new Error(`Failed to fetch restaurant with id ${id}: ${error}`);
  }
};

export default get_restaurantsById;
