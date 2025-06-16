# Travel Itinerary Planner

A full-stack travel itinerary planning application with AI-powered recommendations, user authentication, and PDF export capabilities. Create personalized day-by-day travel plans, manage your travel history, and export itineraries for offline use.

## 🌟 Features

### Core Features
- **AI-Powered Itinerary Generation**: Create detailed travel plans using LLM integration
- **User Authentication**: Secure sign-up/login with Firebase Authentication
- **Personalized History**: View and manage your past itinerary requests tied to your account
- **PDF Export**: Download itineraries as professionally formatted PDF documents
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Live status updates during itinerary generation
- **Offline Support**: Local caching for improved performance

### Advanced Features
- **Pagination & Filtering**: Efficiently browse through large history with search and filters
- **HTML Export**: Export itineraries as HTML files for offline viewing and printing
- **Dark Mode Support**: Toggle between light and dark themes
- **Social Sharing**: Share itineraries with friends and family
- **Favorites System**: Save and organize your favorite destinations
- **Local Storage**: Client-side data persistence

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** for styling
- **Shadcn/UI** for components
- **Lucide React** for icons
- **Firebase Authentication** for user management
- **Built-in HTML Export** for saving itineraries
- **Vite** for development and building

### Backend
- **Node.js/Express** or similar lightweight backend
- **Google Gemini Flash 2.0** for AI-powered itinerary generation
- **Built-in HTML Export** for saving/printing itineraries
- **JSON file storage** or simple database for persistence

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google AI Studio account** (for Gemini API key)

### Environment Variables

Create the following environment files:

#### Frontend (.env)
## 📁 Project Structureenv
# API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_ENV=development

# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

# Optional: Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

#### Backend (.env or backend config)
```env
# API Configuration
PORT=3001
NODE_ENV=development

# Google Gemini Configuration
GOOGLE_API_KEY=your-google-gemini-api-key
GEMINI_MODEL=gemini-2.0-flash-exp

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080

# Optional: Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/travel-itinerary-planner.git
cd travel-itinerary-planner
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm start
```

The backend API will be available at `http://localhost:3001`

#### 3. Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

### Production Deployment

#### Backend (Node.js)
```bash
# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start npm --name "travel-backend" -- start

# Or build and run
npm run build
npm run start:prod
```

#### Frontend (React)
```bash
# Build for production
npm run build

# Serve built files (example with serve)
npm install -g serve
serve -s dist -l 3000
```

## 🔧 API Integration

The frontend communicates with a lightweight Node.js backend that provides:

### API Endpoints

- `POST /api/itinerary` - Generate new itinerary using Gemini Flash 2.0
- `GET /api/history` - Get user's itinerary history (with pagination)
- `GET /api/itinerary/:id` - Get specific itinerary details
- `DELETE /api/itinerary/:id` - Delete itinerary
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Request/Response Examples

#### Create Itinerary
```javascript
// Request
POST /api/itinerary
{
  "destination": "Tokyo, Japan",
  "numberOfDays": 5,
  "interests": ["culture", "food", "technology"],
  "budget": "medium"
}

// Response
{
  "id": "uuid-string",
  "destination": "Tokyo, Japan",
  "numberOfDays": 5,
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "time": "9:00 AM",
          "activity": "Visit Senso-ji Temple",
          "description": "Explore Tokyo's oldest temple",
          "location": "Asakusa district"
        }
      ]
    }
  ],
  "createdAt": "2024-12-16T10:30:00Z",
  "userId": "user-uuid"
}
```

#### Get History (with pagination)
```javascript
// Request
GET /api/history?page=1&limit=10&search=tokyo

// Response
{
  "itineraries": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "itemsPerPage": 10
  }
}
```

## 🎨 Key Features Implementation

### 1. Gemini Flash 2.0 Integration

```javascript
// Backend service example
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

export async function generateItinerary(destination, days, preferences) {
  const prompt = `Create a detailed ${days}-day travel itinerary for ${destination}...`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  
  return parseItineraryResponse(response.text());
}
```

### 2. HTML Export Functionality

```javascript
// Frontend export service
export const exportToHTML = (itinerary) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${itinerary.destination} - Travel Itinerary</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .day { margin-bottom: 30px; border-bottom: 1px solid #ccc; }
        .activity { margin: 10px 0; padding: 10px; background: #f5f5f5; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <h1>${itinerary.destination} Travel Itinerary</h1>
      <p>Duration: ${itinerary.numberOfDays} days</p>
      ${itinerary.itinerary.map(day => `
        <div class="day">
          <h2>Day ${day.day}</h2>
          ${day.activities.map(activity => `
            <div class="activity">
              <strong>${activity.time}</strong> - ${activity.activity}
              <p>${activity.description}</p>
              ${activity.location ? `<em>Location: ${activity.location}</em>` : ''}
            </div>
          `).join('')}
        </div>
      `).join('')}
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${itinerary.destination.replace(/\s+/g, '_')}_itinerary.html`;
  a.click();
  URL.revokeObjectURL(url);
};
```

### 3. Firebase Authentication Integration

```javascript
// Firebase config
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  // ... other config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 4. History with Pagination & Filtering

```javascript
// React component for history
const HistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const { data, isLoading } = useQuery({
    queryKey: ['history', currentPage, searchTerm, sortBy],
    queryFn: () => fetchHistory({ 
      page: currentPage, 
      search: searchTerm, 
      sort: sortBy 
    }),
  });

  return (
    <div>
      <SearchFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <ItineraryGrid itineraries={data?.itineraries} />
      <Pagination 
        currentPage={currentPage}
        totalPages={data?.pagination.totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
```

```
travel-itinerary-planner/
├── frontend/                    # React.js frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Layout.tsx     # Main layout with navigation
│   │   │   ├── ItineraryDisplay.tsx
│   │   │   ├── ItineraryModal.tsx
│   │   │   ├── AuthComponents/ # Authentication components
│   │   │   └── ExportHTML.tsx # HTML export functionality
│   │   ├── pages/             # Page components
│   │   │   ├── Home.tsx       # Home page with form
│   │   │   ├── History.tsx    # History with pagination
│   │   │   ├── Login.tsx      # Authentication pages
│   │   │   ├── Profile.tsx    # User profile
│   │   │   └── NotFound.tsx   # 404 page
│   │   ├── services/          # API services
│   │   │   ├── api.ts         # API client
│   │   │   ├── auth.ts        # Authentication service
│   │   │   ├── gemini.ts      # Gemini AI service
│   │   │   └── export.ts      # HTML export service
│   │   ├── hooks/             # Custom React hooks
│   │   ├── config/            # Configuration files
│   │   │   └── firebase.ts    # Firebase configuration
│   │   └── lib/               # Utility functions
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/                     # Node.js/Express backend
│   ├── src/
│   │   ├── routes/            # API routes
│   │   │   ├── itinerary.js   # Itinerary generation endpoints
│   │   │   ├── history.js     # History management
│   │   │   └── auth.js        # Authentication routes
│   │   ├── services/          # Business logic
│   │   │   ├── geminiService.js # Gemini AI integration
│   │   │   └── authService.js # Authentication logic
│   │   ├── middleware/        # Express middleware
│   │   ├── utils/             # Utility functions
│   │   └── app.js             # Express app setup
├── README.md
└── .gitignore

## 🚀 Quick Start Commands

### Development
```bash
# Start backend
cd backend && npm start

# Start frontend (in new terminal)
cd frontend && npm start
```

### Production Build
```bash
# Build frontend
cd frontend && npm run build

# Start backend in production mode
cd backend && npm run start:prod
```

## 🎯 Bonus Features Implemented

### ✅ User Authentication
- Firebase Authentication integration
- Sign-up/Login functionality
- Protected routes and user sessions
- History tied to user accounts

### ✅ HTML Export
- Built-in HTML export functionality
- Printer-friendly formatting
- Offline viewing capability
- Clean, professional layout

### ✅ Pagination & Filtering
- Paginated history view
- Search functionality
- Sort by date, destination, or duration
- Advanced filtering options

### ✅ Modern UI with TailwindCSS
- Responsive design system
- Custom component library
- Dark mode support
- Smooth animations and transitions
- Mobile-first approach

### ✅ Enhanced User Experience
- Loading states and error handling
- Toast notifications
- Optimistic UI updates
- Local storage caching
- Real-time status updates

## 🔧 Configuration

### Gemini API Setup
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your backend `.env` file as `GOOGLE_API_KEY`

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and choose sign-in methods
3. Get your config from Project Settings
4. Add the config to your frontend `.env` file

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adapted layout with collapsible navigation
- **Mobile**: Touch-optimized interface with bottom navigation

## 🔐 Security Features

- Firebase Authentication integration
- API rate limiting
- Input validation and sanitization
- XSS protection
- CORS configuration
- Environment variable protection

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for custom themes
- Update CSS variables in `src/index.css`
- Customize components in `src/components/`

### AI Prompts
- Modify prompts in `backend/src/services/geminiService.js`
- Add custom preferences and filters
- Implement specialized itinerary types

## 📊 Performance Optimizations

- React Query for efficient data fetching
- Lazy loading of components
- Image optimization
- Bundle splitting
- Local storage caching
- Debounced search
- Virtualized lists for large datasets



## 🐛 Troubleshooting

### Common Issues

1. **Gemini API Key Error**
   - Ensure your API key is valid and has sufficient quota
   - Check that the key is properly set in environment variables

2. **Firebase Authentication Issues**
   - Verify Firebase config is correct
   - Check that authentication methods are enabled in Firebase Console

3. **CORS Issues**
   - Ensure backend CORS settings include frontend URL
   - Check that ports match environment configuration

4. **Build Issues**
   - Clear node_modules and reinstall dependencies
   - Check that all environment variables are set

## 📚 API Documentation

For detailed API documentation, visit `/api/docs` when running the backend server.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) for AI-powered itinerary generation
- [Firebase](https://firebase.google.com/) for authentication services
- [TailwindCSS](https://tailwindcss.com/) for styling framework
- [React](https://reactjs.org/) for the frontend framework

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review the API documentation at `/api/docs`
