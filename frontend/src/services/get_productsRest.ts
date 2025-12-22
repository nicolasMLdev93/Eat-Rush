import axios from "axios";
import type { ProductApi, ApiResponse_product } from "../interfaces/interfaces";
import type { AxiosResponse } from "axios";

const API_BASE = "http://localhost:3000";

const get_productsByRest = async (id: number): Promise<ProductApi[]> => {
  try {
    const response: AxiosResponse<ApiResponse_product> = await axios.get(
      `${API_BASE}/products_rest/${id}`
    );
    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    }
    return response.data.products;
  } catch (error) {
    console.log("Error getting all restautants");
    throw new Error(`Failed to fetch restaurant with id ${id}: ${error}`);
  }
};

export default get_productsByRest;
