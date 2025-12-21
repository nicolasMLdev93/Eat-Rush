import axios from "axios";

interface Category {
  id: number;
  name: string;
  isActive: boolean;
}

interface ApiResponse {
  categories: Category[];
  success: boolean;
}

const API_BASE = "http://localhost:3000";

const get_allCategories = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
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
