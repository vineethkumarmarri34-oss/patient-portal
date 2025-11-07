# Patient Portal Analytics & Engagement Dashboard

A comprehensive healthcare analytics dashboard for visualizing patient engagement metrics, appointment data, and portal usage statistics. Built with React, Chart.js, and Tailwind CSS.

## 📊 Overview

This dashboard provides healthcare administrators and staff with real-time insights into patient portal engagement, appointment attendance, secure messaging activity, and prescription refill patterns.

## 🎯 Key Features

### 1. **Secure Authentication System**
- Role-based access control (Admin/User)
- Mock authentication with LocalStorage
- Demo credentials provided for testing
- Session management

### 2. **Real-Time KPI Metrics**
Four key performance indicators with animated counters:
- **Average Logins per Week**: Tracks patient portal engagement
- **Average Secure Messages**: Monitors patient-provider communication
- **Average No-Show Rate**: Identifies appointment attendance issues
- **Average Session Duration**: Measures portal usage depth

Each KPI includes:
- Animated number counters
- Trend indicators (% change vs last month)
- Color-coded status indicators
- Tooltips with detailed explanations

### 3. **Advanced Filtering System**
Dynamic filters that update all charts in real-time:
- **Age Group**: 18-30, 31-45, 46-60, 60+
- **Gender**: Male, Female, Other
- **Device Type**: Mobile, Desktop, Tablet
- Active filter badges with quick removal
- Reset all filters functionality

### 4. **Interactive Data Visualizations**

#### For All Users:
- **Login Activity Chart** (Line Chart)
  - Shows average logins per week over time
  - Smooth curves with area fill
  - Interactive tooltips
  
- **Appointment No-Show Rate** (Bar Chart)
  - Grouped by age demographics
  - Color-coded from success to warning
  - Percentage display

#### Admin-Only Charts:
- **Secure Messages by Device** (Bar Chart)
  - Groups messages by device type
  - Identifies preferred communication channels
  
- **Prescription Refills** (Doughnut Chart)
  - Shows ratio of refills vs other appointments
  - Percentage breakdown
  
- **Session Duration Trend** (Line Chart)
  - Tracks average portal session time
  - Identifies engagement patterns

### 5. **Patient Search & Detailed View (Admin Only)**
- Autocomplete search by name or patient ID
- Comprehensive patient profile card:
  - Demographics (age, gender, device type)
  - Medical information (chronic conditions, insurance)
  - Enrollment date and location
  - Engagement level indicator
- Individual patient metrics:
  - Login history (bar chart)
  - Communication & refills comparison
  - Satisfaction score (gauge chart)
- Back to dashboard navigation

### 6. **Dark/Light Mode**
- System-wide theme toggle
- Smooth transition animations
- Persistent theme preference
- Optimized color contrast for accessibility

### 7. **Role-Based Access Control**
- **Admin Role**: Full access to all 5 charts + patient search
- **User Role**: Limited to 2 general charts, no patient details
- Clear visual indicators for restricted content

### 8. **Responsive Design**
- Mobile-first approach
- Adaptive layouts for tablet and desktop
- Touch-friendly interface
- Optimized chart rendering for all screen sizes

## 🧮 Formulas & Calculations

### KPI Calculations

#### 1. Average Logins per Week
```javascript
avgLogins = (Σ login_count for all patients) / (total number of patients)
```
**Example**: If 1000 patients have a combined 7,600 logins, avgLogins = 7.6

#### 2. Average Secure Messages
```javascript
avgMessages = (Σ secure_messages for all patients) / (total number of patients)
```
**Purpose**: Measures patient-provider communication frequency

#### 3. Average No-Show Rate
```javascript
avgNoShowRate = (Σ no_show_rate for all patients) / (total number of patients)
```
Where individual patient no-show rate:
```javascript
patient_no_show_rate = (appointments_missed / appointments_scheduled) × 100
```
**Lower is better**: Tracks appointment adherence

#### 4. Average Session Duration
```javascript
avgSessionDuration = (Σ avg_session_minutes for all patients) / (total number of patients)
```
**Higher values**: Indicate deeper engagement with portal features

### Chart Data Aggregations

#### Login Activity Over Time
```javascript
For each week_date:
  weeklyAvg = (Σ login_count for patients in that week) / (count of patients)
  
Result: Array of {week_date, avgLogins} sorted chronologically
```

#### No-Show Rate by Age Group
```javascript
For each age_group:
  ageGroupNoShowRate = (Σ no_show_rate for patients in group) / (count in group)
  
Groups: [18-30, 31-45, 46-60, 60+]
Result: {age_group: percentage}
```

#### Secure Messages by Device
```javascript
For each device_type:
  deviceAvgMessages = (Σ secure_messages for device) / (count using device)
  
Devices: [Mobile, Desktop, Tablet]
Result: {device_type: avgMessages}
```

#### Prescription Refills Ratio
```javascript
totalRefills = Σ refill_requests for all patients
totalAppointments = Σ appointments_scheduled for all patients
otherAppointments = totalAppointments - totalRefills

Result: {
  refills: totalRefills,
  other: otherAppointments
}
```

#### Session Duration Trend
```javascript
For each week_date:
  weeklyAvgSession = (Σ avg_session_minutes for week) / (count of patients)
  
Result: Time series of average session duration
```

### Patient-Specific Charts

#### Individual Login Trend
```javascript
// Mock weekly data based on patient's average
baseLogin = patient.login_count
weeklyLogins = [baseLogin ± random_variation(-2 to +2)]
```

#### Communication vs Refills
```javascript
Result: {
  secureMessages: patient.secure_messages,
  refillRequests: patient.refill_requests
}
```

#### Satisfaction Score
```javascript
score = patient.satisfaction_score (1-5 scale)
percentage = (score / 5) × 100

Color coding:
- Green (success): score >= 4
- Orange (warning): 3 <= score < 4
- Red (destructive): score < 3
```

## 🛠️ Technology Stack

### Frontend Core
- **React 19.2.0**: Component-based UI library
- **React Router DOM 7.9.5**: Client-side routing
- **JavaScript (ES6+)**: Modern JavaScript features

### Styling & Design
- **Tailwind CSS 3.4.18**: Utility-first CSS framework
- **Shadcn/UI**: Accessible component primitives
  - Radix UI components for accessibility
  - CVA (class-variance-authority) for variant management
- **Custom Design System**:
  - HSL color space for consistent theming
  - Semantic color tokens
  - Custom CSS variables for spacing, shadows, transitions

### Data Visualization
- **Chart.js 4.5.1**: Powerful charting library
- **React-ChartJS-2 5.3.1**: React wrapper for Chart.js
- Chart types used:
  - Line charts (with area fill)
  - Bar charts (vertical)
  - Doughnut charts (with cutout)

### UI Components
- **Lucide React 0.507.0**: Modern icon library
- **Sonner 2.0.7**: Toast notifications
- **CMDK 1.1.1**: Command menu for patient search
- **Date-fns 4.1.0**: Date manipulation

### Form Management
- **React Hook Form 7.66.0**: Performant form handling
- **Zod 3.25.76**: TypeScript-first schema validation

### Typography
- **Google Fonts**:
  - **Inter**: Primary sans-serif font (body text)
  - **Space Grotesk**: Display font (headings)

### Development Tools
- **Create React App 5.0.1**: Build tooling
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: Automatic vendor prefixing

### Build & Bundle
- **Webpack 5**: Module bundler
- **Babel**: JavaScript transpiler
- **Terser**: JavaScript minification

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html                          # Main HTML template
│   └── patient_portal_dataset_1000.json    # Sample data (optional)
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardHeader.js          # Header with theme toggle
│   │   │   ├── KPISection.js               # KPI metrics cards
│   │   │   ├── FiltersPanel.js             # Filter controls
│   │   │   ├── ChartsSection.js            # Chart grid layout
│   │   │   ├── PatientSearchPanel.js       # Patient search UI
│   │   │   ├── PatientViewer.js            # Individual patient details
│   │   │   └── charts/
│   │   │       ├── LoginActivityChart.js
│   │   │       ├── NoShowRateChart.js
│   │   │       ├── SecureMessagesChart.js
│   │   │       ├── RefillsChart.js
│   │   │       ├── SessionDurationChart.js
│   │   │       ├── PatientLoginChart.js
│   │   │       ├── PatientMessagesChart.js
│   │   │       └── PatientSatisfactionChart.js
│   │   └── ui/                             # Shadcn/UI components
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── input.jsx
│   │       ├── select.jsx
│   │       ├── badge.jsx
│   │       ├── tooltip.jsx
│   │       ├── dropdown-menu.jsx
│   │       ├── command.jsx
│   │       ├── popover.jsx
│   │       ├── separator.jsx
│   │       ├── tabs.jsx
│   │       ├── label.jsx
│   │       └── sonner.jsx
│   ├── pages/
│   │   ├── LoginPage.js                    # Authentication page
│   │   └── DashboardPage.js                # Main dashboard
│   ├── utils/
│   │   └── mockDataGenerator.js            # Mock data generation
│   ├── lib/
│   │   └── utils.js                        # Utility functions
│   ├── hooks/
│   │   └── use-toast.js                    # Toast notification hook
│   ├── App.js                              # Root component
│   ├── index.js                            # Entry point
│   └── index.css                           # Global styles + design system
├── tailwind.config.js                      # Tailwind configuration
├── package.json                            # Dependencies
└── README.md                               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd frontend
```

2. **Install dependencies**
```bash
yarn install
# or
npm install
```

3. **Start development server**
```bash
yarn start
# or
npm start
```

4. **Open browser**
```
http://localhost:3000
```

### Demo Credentials

**Administrator Access:**
- Username: `admin`
- Password: `admin123`
- Features: All 5 charts + patient search

**User Access:**
- Username: `user`
- Password: `user123`
- Features: 2 general charts only

## 📦 GitHub Pages Deployment

### Step 1: Prepare Repository

1. **Create GitHub repository**
```bash
git init
git add .
git commit -m "Initial commit: Patient Portal Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 2: Configure for GitHub Pages

2. **Add homepage to package.json**

Edit `package.json` and add:
```json
{
  "name": "patient-portal-dashboard",
  "version": "1.0.0",
  "homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME",
  ...
}
```

3. **Install gh-pages**
```bash
yarn add --dev gh-pages
# or
npm install --save-dev gh-pages
```

4. **Add deploy scripts to package.json**

Add these scripts:
```json
"scripts": {
  "predeploy": "yarn build",
  "deploy": "gh-pages -d build",
  "start": "react-scripts start",
  "build": "react-scripts build",
  ...
}
```

### Step 3: Deploy

5. **Build and deploy**
```bash
yarn deploy
# or
npm run deploy
```

This will:
- Create optimized production build
- Create/update `gh-pages` branch
- Push to GitHub

### Step 4: Configure GitHub Pages

6. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Source: Select `gh-pages` branch
   - Root directory: `/ (root)`
   - Click Save

7. **Wait for deployment** (1-5 minutes)

8. **Access your dashboard**
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME
```

### Troubleshooting Deployment

**Blank page after deployment:**
- Verify `homepage` in package.json matches your GitHub Pages URL
- Check browser console for errors
- Ensure all routes use `BrowserRouter` with basename

**404 errors on refresh:**
Add `404.html` in public folder (copy of index.html) for client-side routing

**Assets not loading:**
- Check that `PUBLIC_URL` is set correctly
- Verify all imports use relative paths

## 🔧 Configuration

### Environment Variables

Create `.env` file in root:
```env
REACT_APP_TITLE=Patient Portal Analytics
REACT_APP_ENABLE_MOCK_DATA=true
```

### Customizing Theme

Edit `src/index.css` to modify design tokens:

```css
:root {
  --primary: 187 71% 38%;        /* Teal */
  --accent: 210 80% 48%;          /* Blue */
  --success: 160 65% 45%;         /* Green */
  /* Add more tokens */
}
```

### Adding Real Data Source

Replace mock data in `DashboardPage.js`:

```javascript
const loadPatientData = async () => {
  try {
    const response = await fetch('YOUR_API_ENDPOINT');
    const data = await response.json();
    setPatientData(data);
  } catch (error) {
    console.error('Error loading data:', error);
  }
};
```

## 📊 Data Format

Expected JSON structure for patient data:

```json
[
  {
    "patient_id": "P-0001",
    "patient_name": "John Doe",
    "age": 45,
    "gender": "Male",
    "device_type": "Mobile",
    "state": "CA",
    "city": "Los Angeles",
    "insurance_type": "Private",
    "chronic_condition": "Diabetes",
    "enrollment_date": "2024-01-15",
    "week_date": "2024-01-01",
    "login_count": 8,
    "secure_messages": 3,
    "refill_requests": 2,
    "appointments_scheduled": 4,
    "appointments_missed": 1,
    "avg_session_minutes": 15.5,
    "satisfaction_score": 4.2,
    "no_show_rate": 25.0,
    "age_group": "31-45",
    "engagement_level": "High"
  }
]
```

## 🧪 Testing

### Manual Testing
1. Login with both admin and user credentials
2. Test all filters individually and in combination
3. Verify chart interactivity (hover, click)
4. Search for patients (admin only)
5. Toggle dark/light mode
6. Test responsive design on mobile

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Design System

### Color Palette
- **Primary (Teal)**: `hsl(187, 71%, 38%)` - Trust, medical professionalism
- **Accent (Blue)**: `hsl(210, 80%, 48%)` - Action, emphasis
- **Success (Green)**: `hsl(160, 65%, 45%)` - Positive metrics
- **Warning (Orange)**: `hsl(25, 95%, 53%)` - Attention needed
- **Destructive (Red)**: `hsl(0, 84%, 60%)` - Errors, critical issues

### Typography Scale
- Headings: Space Grotesk (500-700)
- Body: Inter (400-600)
- Sizes: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px

### Spacing System
Based on 4px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px

## 🔒 Security Considerations

- Mock authentication for demo purposes only
- Do NOT use in production without proper backend authentication
- Implement JWT tokens for real deployment
- Add HTTPS enforcement
- Sanitize all user inputs
- Implement rate limiting for API calls

## 📈 Performance Optimizations

- Code splitting with React.lazy (can be added)
- Memoized chart calculations with useMemo
- Debounced search input
- Optimized Chart.js rendering
- Lazy loading for patient details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - feel free to use for personal and commercial projects

## 🆘 Support

For issues and questions:
- Check existing GitHub issues
- Create new issue with detailed description
- Include browser version and error messages

## 🎯 Future Enhancements

- [ ] Export data to CSV/PDF
- [ ] Advanced filtering (date ranges, multiple selections)
- [ ] Email notification system
- [ ] Real-time updates with WebSocket
- [ ] Appointment scheduling integration
- [ ] Multi-language support
- [ ] Advanced analytics (predictive models)
- [ ] Mobile app version

---

**Built with ❤️ for healthcare professionals**
