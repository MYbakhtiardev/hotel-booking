# Hotel Room Booking Engine

A modern, responsive hotel room booking application built with Angular 20, TypeScript, and Bootstrap. This application allows users to browse available hotel rooms, filter by various criteria, and make bookings with a user-friendly interface.

![Hotel Booking Engine](https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop)

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Angular CLI**: v20 or higher

```bash
# Check your versions
node --version
npm --version
ng version
```

## 🚀 How to Run the Application

### 1. Clone the Repository
```bash
git clone https://github.com/MYbakhtiardev/hotel-booking
cd hotel-booking
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
ng serve
```

The application will be available at `http://localhost:4200`

### 4. Build for Production
```bash
ng build --configuration production
```

## 🎨 Design Decisions

### Architecture Choices

#### 1. **Standalone Components (Angular 20)**
- **Decision**: Used Angular's standalone components instead of traditional NgModules
- **Reason**: Simplifies the application structure, reduces boilerplate code, and aligns with Angular's modern best practices
- **Benefits**: Better tree-shaking, easier testing, and more explicit dependencies

#### 2. **Service-Based Architecture**
- **Decision**: Separated business logic into dedicated services
- **Reason**: Promotes separation of concerns, reusability, and testability
- **Implementation**: 
  - `RoomService` handles room data and availability
  - `BookingService` manages booking operations and persistence
  - `NotificationService` handles user feedback

#### 3. **Reactive Programming with RxJS**
- **Decision**: Leveraged RxJS Observables for state management
- **Reason**: Provides better handling of asynchronous operations and reactive data flow
- **Implementation**: Used `BehaviorSubject` for filter state, `combineLatest` for data composition

### UI/UX Design Decisions

#### 1. **Bootstrap 5 Integration**
- **Decision**: Used Bootstrap for responsive design and component styling
- **Reason**: Provides battle-tested responsive grid system and accessible components
- **Customization**: Added custom SCSS for brand-specific styling and animations

#### 2. **Card-Based Layout**
- **Decision**: Implemented room cards with hover effects and structured information
- **Reason**: Provides intuitive visual hierarchy and better user engagement
- **Features**: Room images, pricing, amenities, and availability status

#### 3. **Modal-Based Booking Flow**
- **Decision**: Used Bootstrap modal for the booking process
- **Reason**: Maintains context while providing focused booking experience
- **Benefits**: Doesn't interrupt the browsing flow, reduces navigation complexity

### Form and Validation Strategy

#### 1. **Reactive Forms**
- **Decision**: Used Angular Reactive Forms instead of Template-driven forms
- **Reason**: Better validation control, testing capabilities, and TypeScript support
- **Implementation**: Custom validators for date validation and dynamic form updates

#### 2. **Real-time Validation**
- **Decision**: Implemented immediate validation feedback
- **Reason**: Improves user experience by preventing form submission errors
- **Features**: Visual feedback with Bootstrap validation classes

### Data Management

#### 1. **Mock Data Service**
- **Decision**: Implemented in-memory mock data with simulated API delays
- **Reason**: Demonstrates realistic data flow without requiring backend setup
- **Implementation**: Observable-based service with delay simulation

#### 2. **LocalStorage Persistence**
- **Decision**: Used localStorage for booking persistence
- **Reason**: Provides data persistence between sessions without requiring backend
- **Benefits**: Simulates real-world data persistence behavior

## 🔧 Framework and Library Choices

### Why These Technologies?

#### **Angular 20** ✅
- **Chosen**: Latest Angular with standalone components
- **Reasons**: 
  - Modern framework with excellent TypeScript support
  - Powerful CLI for scaffolding and build optimization
  - Strong ecosystem and community support
  - Built-in features for forms, routing, and HTTP

#### **Bootstrap ** ✅
- **Chosen**: Bootstrap for responsive design
- **Reasons**:
  - Mature, well-documented CSS framework
  - Excellent responsive grid system
  - Accessibility features built-in
  - Consistent component design language

#### **RxJS** ✅
- **Chosen**: For reactive state management
- **Reasons**:
  - Native Angular integration
  - Powerful operators for data transformation
  - Excellent for handling asynchronous operations
  - Industry standard for reactive programming

### Alternative Considerations

#### **State Management**
- **Considered**: NgRx for state management
- **Decision**: Used services with RxJS instead
- **Reason**: Application complexity doesn't justify the overhead of NgRx; services with BehaviorSubject provide sufficient state management for this scope

#### **UI Library**
- **Considered**: Angular Material or PrimeNG
- **Decision**: Used Bootstrap instead
- **Reason**: Bootstrap provides more design flexibility and is lighter weight for this specific use case

#### **Styling Approach**
- **Considered**: CSS-in-JS or utility-first frameworks like Tailwind
- **Decision**: Used Bootstrap + Custom SCSS
- **Reason**: Balances rapid development with customization capabilities

## 🧪 Testing Strategy

The application includes comprehensive testing setup:

- **Unit Tests**: Service layer testing with mocked dependencies
- **Component Tests**: UI component testing with TestBed
- **Integration Tests**: End-to-end user flow testing
- **Coverage Reports**: Generated with `ng test --code-coverage`

## 🚀 Deployment

The application can be deployed to various platforms:

### Netlify
```bash
ng build --configuration production
netlify deploy --prod --dir=dist/hotel-booking-engine
```

### Vercel
```bash
ng build --configuration production
vercel --prod
```

### Traditional Web Server
```bash
ng build --configuration production
# Deploy contents of dist/hotel-booking-engine to web server
```

## 🔮 Future Enhancements

- **Backend Integration**: Replace mock services with real API calls
- **User Authentication**: Add user registration and login
- **Payment Integration**: Implement payment processing
- **Advanced Filtering**: Add date range availability filtering
- **Room Management**: Admin panel for room management
- **Internationalization**: Multi-language support
- **PWA Features**: Offline capability and push notifications

## 📝 Development Notes

### Performance Optimizations
- Lazy loading for improved initial load time
- OnPush change detection strategy where applicable
- Trackby functions for efficient list rendering
- Optimized bundle size with tree-shaking

### Accessibility Features
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Color contrast compliance

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement approach

## 📄 License

This project is developed as a demonstration application. Feel free to use it as a reference or starting point for your own projects.

---

**Built with ❤️ using Angular 20, TypeScript, and Bootstrap**