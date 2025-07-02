# Hotel Room Booking

A modern, responsive hotel room booking application built with Angular 20, TypeScript, and Bootstrap. This application allows users to browse available hotel rooms, filter by various criteria, and make bookings with a user-friendly interface.

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

### Alternative Port
If port 4200 is busy, use:
```bash
ng serve --port 4300
```



## Brief Explanation of Design Decisions

### 1. **User Interface Design**

**Bootstrap Integration**: Chose Bootstrap 5 for rapid UI development and responsive design. This provides:
- Pre-built components (cards, modals, forms)
- Responsive grid system
- Professional styling out of the box

**Card-Based Layout**: Implemented a clean card design for room display because:
- Cards provide clear visual separation between rooms
- Easy to scan and compare room information
- Works well on both desktop and mobile devices
- Standard pattern users expect for booking interfaces

**Filter-First Approach**: Placed filters at the top of the page as users typically want to narrow down options before browsing, improving user experience and reducing cognitive load.

### 2. **User Experience Decisions**

**Modal for Booking**: Used a modal dialog for booking forms to:
- Keep users in context without navigation
- Reduce page clutter
- Provide focused interaction for form completion

**Toast Notifications**: Implemented toast notifications for user feedback at right top because:
- Non-intrusive way to confirm actions
- Automatically dismiss to avoid UI clutter
- Standard pattern for modern web applications

**Loading States**: Added loading spinners and states to provide visual feedback during data operations, improving perceived performance.