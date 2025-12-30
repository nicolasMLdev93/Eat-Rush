import axios from "axios";
import type { AxiosResponse } from "axios";
import type { OrderApi, ApiResponse_orders } from "../interfaces/interfaces";

const API_BASE = "http://localhost:3000";

const get_ordersUser = async (id: number): Promise<OrderApi[]> => {
  try {
    const response: AxiosResponse<ApiResponse_orders> = await axios.get(
      `${API_BASE}/orders/${id}`
    );
    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    }
    return response.data.orders;
  } catch (error) {
    throw new Error(`Failed to fetch restaurant with id ${id}: ${error}`);
  }
};

export default get_ordersUser;
