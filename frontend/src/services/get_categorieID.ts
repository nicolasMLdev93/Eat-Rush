import axios from "axios";
import type {
  CategoryApi,
  ApiResponse_category_ID,
} from "../interfaces/interfaces";
import type { AxiosResponse } from "axios";

const API_BASE = "http://localhost:3000";

const get_categoriesById = async (id: number): Promise<CategoryApi> => {
  try {
    const response: AxiosResponse<ApiResponse_category_ID> = await axios.get(
      `${API_BASE}/category/${id}`
    );
    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    }
    return response.data.category;
  } catch (error) {
    throw new Error(`Failed to fetch category with id ${id}: ${error}`);
  }
};

export default get_categoriesById;
