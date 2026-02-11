// Raw Material Types
export interface RawMaterial {
  id: number
  name: string
  unit: string
  quantity_available: number
  minimum_threshold: number
  created_at: string
  is_low_stock: boolean
}

export interface RawMaterialCreate {
  name: string
  unit: 'kg' | 'gram' | 'liter' | 'piece'
  quantity_available: number
  minimum_threshold: number
}

export interface RawMaterialUpdate {
  name?: string
  unit?: 'kg' | 'gram' | 'liter' | 'piece'
  quantity_available?: number
  minimum_threshold?: number
}

export interface RawMaterialWithUsage extends RawMaterial {
  is_used_in_recipes: boolean
  food_items: string[]
  usage_count: number
}

// Food Item Types
export interface FoodItemIngredient {
  id: number
  raw_material_id: number
  quantity_required_per_unit: number
  raw_material_name: string
  raw_material_unit: string
}

export interface FoodItemIngredientCreate {
  raw_material_id: number
  quantity_required_per_unit: number
}

export interface FoodItem {
  id: number
  name: string
  price: number
  is_available: boolean
  created_at: string
  ingredients: FoodItemIngredient[]
}

export interface FoodItemCreate {
  name: string
  price: number
  is_available: boolean
  ingredients: FoodItemIngredientCreate[]
}

// Order Types
export interface OrderItem {
  id: number
  food_item_id: number
  quantity: number
  unit_price: number
  subtotal: number
  food_item_name: string
}

export interface OrderItemCreate {
  food_item_id: number
  quantity: number
}

export interface Order {
  id: number
  total_price: number
  status: 'PLACED' | 'CANCELLED' | 'COMPLETED'
  created_at: string
  order_items: OrderItem[]
}

export interface OrderCreate {
  items: OrderItemCreate[]
}

export interface InventoryCheckResult {
  can_fulfill: boolean
  missing_ingredients: Array<{
    raw_material_id?: number
    raw_material_name?: string
    required?: number
    available?: number
    unit?: string
    shortage?: number
    error?: string
  }>
  total_price: number
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  detail: string
}