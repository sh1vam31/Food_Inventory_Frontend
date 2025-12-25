🍕 Food Inventory Management System – Frontend

This is the frontend of my Food Inventory Management System, built using Next.js, TypeScript, and Tailwind CSS.
The goal of this project is to provide a clean and practical interface for managing food inventory, menu items, and orders while keeping inventory usage accurate in real time.

The UI is designed to be simple, responsive, and easy to use, with support for both dark and light themes.

🔗 Live Demo:
👉 https://food-inventory-frontend.vercel.app/home

⸻

🛠 Tech Stack
	•	Next.js (App Router)
	•	TypeScript
	•	Tailwind CSS
	•	REST API integration with FastAPI backend
	•	Context API for theme management

⸻

✨ Features

🎨 User Interface
	•	Clean and modern UI using Tailwind CSS
	•	Dark and light theme support (system preference + manual toggle)
	•	Fully responsive layout (mobile, tablet, desktop)
	•	Simple navigation for inventory, menu, and orders

⸻

🏪 Inventory Management
	•	Add, update, and delete raw materials
	•	Validation to prevent incorrect inputs
	•	Visual indicators for:
	•	Low stock items
	•	Ingredients used in recipes
	•	Smart deletion logic:
	•	Raw materials used in recipes cannot be deleted
	•	Inventory updates reflect instantly across the app

⸻

🍽️ Menu Management
	•	Create food items with pricing
	•	Visual recipe builder to define ingredient usage
	•	Automatic availability calculation based on stock
	•	Prevents ordering items when ingredients are insufficient

⸻

📋 Order Processing
	•	Real-time inventory checks while adding items to cart
	•	Order validation before placement
	•	Clear error messages if stock is insufficient
	•	Complete order flow from creation to confirmation

⸻

🚀 Getting Started (Local Setup)

Prerequisites
	•	Node.js 18+
	•	npm or yarn
	•	Backend running locally or deployed

Run the App :  npm run dev

📁 Project Structure

frontend/
├── app/
│   ├── dashboard/
│   ├── inventory/
│   ├── menu/
│   ├── orders/
│   ├── home/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Navigation.tsx
│   └── ThemeToggle.tsx
├── contexts/
│   └── ThemeContext.tsx
├── lib/
│   ├── api.ts
│   └── utils.ts
├── types/
│   └── index.ts
└── public/

🎨 UI & Design Choices
	•	Color Theme: Emerald / teal based palette
	•	Typography: Clean hierarchy for readability
	•	Spacing: Consistent padding and margins using Tailwind
	•	Reusable Components: Buttons, cards, badges, and forms

Custom utility classes include:
	•	.btn, .btn-primary, .btn-danger
	•	.card
	•	.badge
	•	.form-input

🔄 API Integration

The frontend communicates with the backend using a centralized API client that handles:
	•	Base URL configuration
	•	Error handling with user-friendly messages
	•	Type-safe request and response handling

Example Endpoints Used

// Inventory
getRawMaterials()
createRawMaterial(data)
updateRawMaterial(id, data)
deleteRawMaterial(id)

// Menu
getFoodItems()
createFoodItem(data)

// Orders
checkInventoryAvailability(orderData)
createOrder(orderData)
getOrders()

📈 Performance
	•	Next.js App Router for optimized routing
	•	Automatic code splitting
	•	Static generation where applicable
	•	Optimized images and assets


