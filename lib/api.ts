import axios from 'axios'
import {
  RawMaterial,
  RawMaterialCreate,
  RawMaterialUpdate,
  FoodItem,
  FoodItemCreate,
  Order,
  OrderCreate,
  InventoryCheckResult
} from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

console.log('API Base URL:', API_BASE_URL) // For debugging

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
apiClient.interceptors.request.use((config) => {
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
  return config
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const api = {
  // Raw Materials
  async getRawMaterials(): Promise<RawMaterial[]> {
    const response = await apiClient.get('/api/raw-materials')
    return response.data
  },

  async getRawMaterialsWithUsage(): Promise<RawMaterial[]> {
    const response = await apiClient.get('/api/raw-materials/with-usage')
    return response.data
  },

  async getRawMaterial(id: number): Promise<RawMaterial> {
    const response = await apiClient.get(`/api/raw-materials/${id}`)
    return response.data
  },

  async getRawMaterialUsage(id: number): Promise<{
    raw_material_name: string;
    is_used_in_recipes: boolean;
    food_items: string[];
    usage_count: number;
  }> {
    const response = await apiClient.get(`/api/raw-materials/${id}/usage`)
    return response.data
  },

  async createRawMaterial(data: RawMaterialCreate): Promise<RawMaterial> {
    const response = await apiClient.post('/api/raw-materials', data)
    return response.data
  },

  async updateRawMaterial(id: number, data: RawMaterialUpdate): Promise<RawMaterial> {
    const response = await apiClient.put(`/api/raw-materials/${id}`, data)
    return response.data
  },

  async updateStock(id: number, quantityChange: number): Promise<{ message: string; new_quantity: number }> {
    const response = await apiClient.patch(`/api/raw-materials/${id}/stock`, null, {
      params: { quantity_change: quantityChange }
    })
    return response.data
  },

  async deleteRawMaterial(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete(`/api/raw-materials/${id}`)
    return response.data
  },

  async getLowStockMaterials(): Promise<RawMaterial[]> {
    const response = await apiClient.get('/api/raw-materials/low-stock')
    return response.data
  },

  // Food Items
  async getFoodItems(availableOnly: boolean = false): Promise<FoodItem[]> {
    const response = await apiClient.get('/api/food-items', {
      params: { available_only: availableOnly }
    })
    return response.data
  },

  async getFoodItem(id: number): Promise<FoodItem> {
    const response = await apiClient.get(`/api/food-items/${id}`)
    return response.data
  },

  async createFoodItem(data: FoodItemCreate): Promise<FoodItem> {
    const response = await apiClient.post('/api/food-items', data)
    return response.data
  },

  async updateFoodItemAvailability(id: number, isAvailable: boolean): Promise<{ message: string; is_available: boolean }> {
    const response = await apiClient.patch(`/api/food-items/${id}/availability`, null, {
      params: { is_available: isAvailable }
    })
    return response.data
  },

  async deleteFoodItem(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete(`/api/food-items/${id}`)
    return response.data
  },

  async checkFoodItemAvailability(id: number, quantity: number = 1): Promise<any> {
    const response = await apiClient.get(`/api/food-items/${id}/availability-check`, {
      params: { quantity }
    })
    return response.data
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    const response = await apiClient.get('/api/orders')
    return response.data
  },

  async getOrder(id: number): Promise<Order> {
    const response = await apiClient.get(`/api/orders/${id}`)
    return response.data
  },

  async checkInventoryAvailability(orderData: OrderCreate): Promise<InventoryCheckResult> {
    const response = await apiClient.post('/api/orders/check-inventory', orderData)
    return response.data
  },

  async createOrder(orderData: OrderCreate): Promise<Order> {
    const response = await apiClient.post('/api/orders', orderData)
    return response.data
  },

  async cancelOrder(id: number): Promise<{ message: string; status: string }> {
    const response = await apiClient.patch(`/api/orders/${id}/cancel`)
    return response.data
  },

  async completeOrder(id: number): Promise<{ message: string; status: string }> {
    const response = await apiClient.patch(`/api/orders/${id}/complete`)
    return response.data
  },

  // Health Check
  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await apiClient.get('/health')
    return response.data
  }
}