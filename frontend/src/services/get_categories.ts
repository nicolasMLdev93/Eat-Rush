import axios from "axios";
import type {
  CategoryApi,
  ApiResponse_categories,
} from "../interfaces/interfaces";
import type { AxiosResponse } from "axios";

const API_BASE = "http://localhost:3000";

const get_allCategories = async (): Promise<CategoryApi[]> => {
  try {
    const response: AxiosResponse<ApiResponse_categories> = await axios.get(
      `${API_BASE}/categories`
    );
    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    }
    return response.data.categories;
  } catch (error) {
    console.log("Error getting all categories");
    throw new Error(`Failed to fetch categories: ${error}`);
  }
};

export default get_allCategories;
