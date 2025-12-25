#  Food Inventory Management System - Frontend
This is the frontend of my Food Inventory Management System, built using Next.js, TypeScript, and Tailwind CSS.
The goal of this project is to provide a clean and practical interface for managing food inventory, menu items, and orders while keeping inventory usage accurate in real time.

Live Demo

https://food-inventory-frontend.vercel.app/home


##  Features
# User Interface
	•	Clean and modern UI using Tailwind CSS
	•	Dark and light theme support (system preference + manual toggle)
	•	Fully responsive layout (mobile, tablet, desktop)
	•	Simple navigation for inventory, menu, and orders


# Inventory Management
	•	Add, update, and delete raw materials
	•	Validation to prevent incorrect inputs
	•	Visual indicators for:
	•	Low stock items
	•	Ingredients used in recipes
	•	Smart deletion logic:
	•	Raw materials used in recipes cannot be deleted
	•	Inventory updates reflect instantly across the app

# Menu Management
	•	Create food items with pricing
	•	Visual recipe builder to define ingredient usage
	•	Automatic availability calculation based on stock
	•	Prevents ordering items when ingredients are insufficient


# Order Processing
	•	Real-time inventory checks while adding items to cart
	•	Order validation before placement
	•	Clear error messages if stock is insufficient
	•	Complete order flow from creation to confirmation



##  Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

1. **Clone and Setup**
   ```bash
   git clone <frontend-repo-url>
   cd food-inventory-frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend URL
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Make sure backend is running on configured API URL

##  Project Structure

```
frontend/
├── app/                   # Next.js App Router
│   ├── dashboard/         # Dashboard page
│   ├── inventory/         # Raw materials management
│   │   ├── add/          # Add raw material
│   │   └── page.tsx      # Inventory list
│   ├── menu/             # Food items management
│   │   ├── add/          # Add food item
│   │   └── page.tsx      # Menu list
│   ├── orders/           # Order management
│   │   ├── new/          # Create order
│   │   └── page.tsx      # Orders list
│   ├── home/             # Landing page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Dashboard redirect
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── Navigation.tsx    # Main navigation
│   └── ThemeToggle.tsx   # Theme switcher
├── contexts/            # React contexts
│   └── ThemeContext.tsx # Theme management
├── lib/                # Utilities
│   ├── api.ts          # API client
│   └── utils.ts        # Helper functions
├── types/              # TypeScript definitions
│   └── index.ts        # Shared types
└── public/             # Static assets
```

##  Configuration

### Environment Variables

**Development (.env.local)**
```env
NEXT_PUBLIC_FOOD_API_URL=http://localhost:8000
```

**Production (Vercel)**
```env
NEXT_PUBLIC_FOOD_API_URL=https://your-backend.onrender.com
```

### API Client Configuration
The API client automatically handles:
- Request/response logging
- Error handling and user feedback
- Base URL configuration
- Content-Type headers

##  UI Components

### Design System
- **Colors**: Emerald/teal theme with dark mode support
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind utilities
- **Components**: Reusable button, card, and form components


##  Key Features

### Inventory Management
- **Smart Validation**: Real-time form validation
- **Usage Indicators**: Shows which materials are used in recipes
- **Deletion Protection**: Prevents deletion of materials in use
- **Low Stock Alerts**: Visual indicators for items below threshold

### Order Processing
- **Real-time Cart**: Live inventory checking while adding items
- **Availability Validation**: Pre-order inventory verification
- **Error Handling**: Clear error messages with actionable guidance
- **Order Confirmation**: Detailed order summaries

### Theme System
```typescript
// Theme Context Usage
const { theme, toggleTheme } = useTheme()

// Automatic system preference detection
// Manual theme switching
// Persistent theme storage
```

##  Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Import your GitHub repository
   - Select Next.js framework (auto-detected)

2. **Configure Environment**
   - Add `NEXT_PUBLIC_FOOD_API_URL` environment variable
   - Point to your deployed backend URL

3. **Deploy**
   - Automatic deployment on git push
   - Preview deployments for pull requests
   - Custom domain support



##  API Integration

### API Client Features
- **Automatic Error Handling**: User-friendly error messages
- **Request Logging**: Debug API calls in development
- **Type Safety**: Full TypeScript integration
- **Response Validation**: Runtime type checking

### Key API Endpoints
```typescript
// Raw Materials
api.getRawMaterials()
api.createRawMaterial(data)
api.updateRawMaterial(id, data)
api.deleteRawMaterial(id)

// Food Items
api.getFoodItems()
api.createFoodItem(data)

// Orders
api.checkInventoryAvailability(orderData)
api.createOrder(orderData)
api.getOrders()
```

##  User Experience

### Navigation Flow
1. **Dashboard**: Overview and quick actions
2. **Inventory**: Manage raw materials and stock
3. **Menu**: Create and manage food items
4. **Orders**: Process orders and track status



##  Development

### Code Quality
```bash
# Format code
npm run format

# Type checking
npm run type-check

# Linting
npm run lint --fix
```



##  Performance

### Optimization Features
- **Next.js App Router**: Optimized routing and loading
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting
- **Static Generation**: Pre-rendered pages where possible

### Bundle Analysis
```bash
# Analyze bundle size
npm run analyze
```


##  Related

- **Backend Repository**: [food-inventory-backend](link-to-backend-repo)
- **API Documentation**: Available at backend `/docs` endpoint
- **Design System**: Tailwind CSS documentation

---

**Built with ❤️ for efficient food service management**
