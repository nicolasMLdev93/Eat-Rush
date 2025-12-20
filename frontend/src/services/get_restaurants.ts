import axios from "axios";

interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: number;
  isActive: boolean;
}

interface ApiResponse {
  restaurants: Restaurant[];
  success: boolean;
}

const API_BASE = "http://localhost:3000";

const get_allRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${API_BASE}/restaurants`
    );
    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    }
    return response.data.restaurants
  } catch (error) {
    console.log("Error getting all restautants");
    throw new Error(`Failed to fetch restaurants: ${error}`);
  }
};

export default get_allRestaurants;
