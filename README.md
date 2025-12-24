# 🍕 Food Inventory Management System - Frontend

Modern Next.js frontend with TypeScript, Tailwind CSS, and real-time inventory management.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎨 User Interface
- **Modern Design**: Clean, responsive UI with Tailwind CSS
- **Dark/Light Theme**: Automatic theme switching with system preference
- **Mobile Responsive**: Works perfectly on all device sizes
- **Intuitive Navigation**: Easy-to-use interface for all operations

### 🏪 Inventory Management
- **Raw Materials**: Add, edit, delete ingredients with smart validation
- **Visual Indicators**: Low stock alerts and recipe usage badges
- **Smart Deletion**: Prevents deletion of materials used in recipes
- **Real-time Updates**: Live inventory status and availability

### 🍽️ Menu Management
- **Food Items**: Create menu items with pricing
- **Recipe Builder**: Define ingredient requirements visually
- **Availability Tracking**: Automatic availability based on stock

### 📋 Order Processing
- **Smart Cart**: Real-time inventory checking while building orders
- **Order Validation**: Pre-order availability verification
- **Order Tracking**: Complete order lifecycle management
- **Error Handling**: User-friendly error messages and guidance

## 🚀 Quick Start

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

## 📁 Project Structure

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

## 🔧 Configuration

### Environment Variables

**Development (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Production (Vercel)**
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

### API Client Configuration
The API client automatically handles:
- Request/response logging
- Error handling and user feedback
- Base URL configuration
- Content-Type headers

## 🎨 UI Components

### Design System
- **Colors**: Emerald/teal theme with dark mode support
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind utilities
- **Components**: Reusable button, card, and form components

### Custom Components
```css
/* Global CSS Classes */
.btn              /* Base button styles */
.btn-primary      /* Primary action buttons */
.btn-secondary    /* Secondary action buttons */
.btn-success      /* Success/confirm buttons */
.btn-danger       /* Delete/cancel buttons */
.card             /* Container cards */
.badge            /* Status indicators */
.form-input       /* Form input fields */
```

## 📊 Key Features

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

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Import your GitHub repository
   - Select Next.js framework (auto-detected)

2. **Configure Environment**
   - Add `NEXT_PUBLIC_API_URL` environment variable
   - Point to your deployed backend URL

3. **Deploy**
   - Automatic deployment on git push
   - Preview deployments for pull requests
   - Custom domain support

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start

# Export static files (if needed)
npm run export
```

## 🧪 Testing

### Development Testing
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] API connections work
- [ ] Forms validate properly
- [ ] Theme switching works
- [ ] Mobile responsiveness
- [ ] Error handling displays correctly

## 🔄 API Integration

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

## 🎯 User Experience

### Navigation Flow
1. **Dashboard**: Overview and quick actions
2. **Inventory**: Manage raw materials and stock
3. **Menu**: Create and manage food items
4. **Orders**: Process orders and track status

### Error Handling
- **Form Validation**: Real-time field validation
- **API Errors**: User-friendly error messages
- **Network Issues**: Graceful degradation
- **Loading States**: Clear loading indicators

## 🔧 Development

### Code Quality
```bash
# Format code
npm run format

# Type checking
npm run type-check

# Linting
npm run lint --fix
```

### Adding New Features
1. Create components in `/components`
2. Add pages in `/app` directory
3. Update types in `/types/index.ts`
4. Add API calls in `/lib/api.ts`

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Touch-friendly buttons
- Optimized forms
- Responsive navigation
- Swipe gestures support

## 🔐 Security

### Client-Side Security
- **Input Sanitization**: XSS protection
- **Environment Variables**: Secure API URL handling
- **HTTPS Only**: Production HTTPS enforcement
- **CORS Handling**: Proper cross-origin requests

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   ```bash
   # Check environment variables
   echo $NEXT_PUBLIC_API_URL
   
   # Verify backend is running
   curl $NEXT_PUBLIC_API_URL/health
   ```

2. **Build Errors**
   ```bash
   # Clear cache
   rm -rf .next
   npm run build
   ```

3. **Type Errors**
   ```bash
   # Check TypeScript
   npm run type-check
   ```

## 📈 Performance

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

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Related

- **Backend Repository**: [food-inventory-backend](link-to-backend-repo)
- **API Documentation**: Available at backend `/docs` endpoint
- **Design System**: Tailwind CSS documentation

---

**Built with ❤️ for efficient food service management**