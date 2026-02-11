# 🍕 Food Order & Inventory Management System

A complete, production-ready food inventory management system with automatic raw material deduction, built with modern web technologies.

![System Architecture](https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge&logo=next.js)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Database](https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge&logo=sqlite)

## ✨ Features

### 🏪 Inventory Management
- **Raw Materials**: Track ingredients with units, quantities, and minimum thresholds
- **Low Stock Alerts**: Visual indicators for items below minimum threshold
- **Smart Deletion**: Prevents deletion of materials used in recipes with detailed warnings

### 🍽️ Menu Management
- **Food Items**: Create menu items with prices and availability
- **Recipe Builder**: Define ingredient requirements for each food item
- **Availability Tracking**: Automatic availability based on ingredient stock

### 📋 Order Processing
- **Smart Ordering**: Real-time inventory checking before order placement
- **Atomic Transactions**: Guaranteed inventory deduction with rollback protection
- **Order Tracking**: Complete order lifecycle management (Placed → Completed/Cancelled)

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Dark/Light Theme**: Automatic theme switching with system preference
- **Real-time Updates**: Live inventory status and availability checking
- **Mobile Responsive**: Works perfectly on all device sizes

### 🔧 Technical Excellence
- **Type Safety**: Full TypeScript implementation
- **API Documentation**: Auto-generated OpenAPI/Swagger docs
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Production Ready**: Configured for Vercel and Render deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd food-inventory-system
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python seed_data.py  # Initialize with sample data
   python -m uvicorn app.main:app --reload --port 8000
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📁 Project Structure

```
food-inventory-system/
├── frontend/                 # Next.js Frontend
│   ├── app/                 # App Router pages
│   │   ├── dashboard/       # Dashboard page
│   │   ├── inventory/       # Raw materials management
│   │   ├── menu/           # Food items management
│   │   ├── orders/         # Order management
│   │   └── home/           # Landing page
│   ├── components/         # Reusable UI components
│   ├── contexts/          # React contexts (theme, etc.)
│   ├── lib/              # Utilities and API client
│   └── types/            # TypeScript type definitions
│
├── backend/                # FastAPI Backend
│   ├── app/
│   │   ├── models/        # SQLAlchemy database models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── services/      # Business logic layer
│   │   ├── routers/       # API route handlers
│   │   └── core/          # Core configurations
│   ├── alembic/          # Database migrations
│   └── seed_data.py      # Sample data generator
│
└── docs/                 # Documentation
```

## 🏗️ Architecture

### Backend (FastAPI)
- **Models**: SQLAlchemy ORM with proper relationships
- **Services**: Business logic with atomic transactions
- **Routers**: RESTful API endpoints with validation
- **Database**: SQLite for development, PostgreSQL ready for production

### Frontend (Next.js)
- **App Router**: Modern Next.js 14 routing
- **Components**: Reusable UI components with Tailwind CSS
- **State Management**: React hooks with context for global state
- **API Integration**: Axios client with proper error handling

### Key Technical Decisions
- **Atomic Transactions**: Inventory deduction uses database transactions with rollback
- **Type Safety**: Shared types between frontend and backend
- **Error Handling**: Comprehensive error handling at all layers
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🔄 Core Business Logic

### Inventory Deduction Algorithm
```python
# Atomic transaction ensures data consistency
def create_order(db: Session, order_data: OrderCreate):
    with db.begin():
        # 1. Validate inventory availability
        # 2. Create order record
        # 3. Deduct raw materials atomically
        # 4. Rollback on any failure
```

### Smart Availability Checking
- Real-time calculation of food item availability based on ingredient stock
- Prevents orders that cannot be fulfilled
- Shows detailed shortage information to users

## 🚀 Deployment

### Production Deployment (Recommended)

**Backend → Render**
- Automatic deployments from Git
- Free tier available (750 hours/month)
- Built-in SSL and custom domains

**Frontend → Vercel**
- Optimized for Next.js
- Global CDN and edge functions
- Automatic preview deployments

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL=sqlite:///./food_inventory.db
ENVIRONMENT=development
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_FOOD_API_URL=http://localhost:8000
```

## 📊 Sample Data

The system includes a comprehensive seed script that creates:
- 10 raw materials (flour, sugar, eggs, etc.)
- 4 food items with complete recipes
- Realistic inventory levels and pricing

Run `python seed_data.py` to populate the database.

## 🧪 API Documentation

Interactive API documentation is available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints
- `GET /api/raw-materials/` - List all raw materials
- `POST /api/orders/` - Create new order with inventory deduction
- `GET /api/food-items/` - List available menu items
- `POST /api/orders/check-inventory` - Validate order before placement

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd backend
python -m pytest

# Frontend tests
cd frontend
npm test
```

### Code Quality
- **Linting**: ESLint for frontend, Black for backend
- **Type Checking**: TypeScript strict mode
- **API Validation**: Pydantic schemas with comprehensive validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by real-world restaurant management needs
- Designed for scalability and maintainability

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Review API documentation at `/docs` endpoint

---

**Built with ❤️ for efficient food service management**