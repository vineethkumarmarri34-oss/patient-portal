# Technical Documentation: Patient Portal Analytics Dashboard

Complete technical reference for formulas, algorithms, and implementation details.

## 📊 Mathematical Formulas & Calculations

### 1. Key Performance Indicators (KPIs)

#### Average Logins per Week
**Formula:**
```
avgLogins = Σ(login_count) / n
```
Where:
- `Σ(login_count)` = Sum of all patient login counts
- `n` = Total number of patients in dataset
- Result: Average number of logins per patient per week

**Implementation:**
```javascript
const totalLogins = data.reduce((sum, p) => sum + (p.login_count || 0), 0);
const avgLogins = (totalLogins / data.length).toFixed(1);
```

**Business Logic:**
- Higher values indicate better patient engagement
- Typical range: 2-10 logins/week
- Benchmark: >5 = High engagement

---

#### Average Secure Messages
**Formula:**
```
avgMessages = Σ(secure_messages) / n
```
Where:
- `Σ(secure_messages)` = Sum of all secure messages sent
- `n` = Total number of patients
- Result: Average messages per patient

**Implementation:**
```javascript
const totalMessages = data.reduce((sum, p) => sum + (p.secure_messages || 0), 0);
const avgMessages = (totalMessages / data.length).toFixed(1);
```

**Business Logic:**
- Measures patient-provider communication frequency
- Higher values = Better patient-provider relationship
- Typical range: 0.5-5 messages/week

---

#### Average No-Show Rate
**Formula (Aggregate):**
```
avgNoShowRate = (Σ(no_show_rate) / n)
```

**Formula (Individual Patient):**
```
patient_no_show_rate = (appointments_missed / appointments_scheduled) × 100
```

Where:
- `appointments_missed` = Number of missed appointments
- `appointments_scheduled` = Total appointments booked
- Result: Percentage of missed appointments

**Implementation:**
```javascript
// Individual calculation
const noShowRate = (patient.appointments_missed / patient.appointments_scheduled) * 100;

// Aggregate calculation
const totalNoShow = data.reduce((sum, p) => sum + (p.no_show_rate || 0), 0);
const avgNoShow = (totalNoShow / data.length).toFixed(1);
```

**Business Logic:**
- Lower is better (inverse metric)
- Typical range: 10-30%
- Benchmark: <15% = Excellent, >30% = Needs intervention
- Used for identifying high-risk patient groups

---

#### Average Session Duration
**Formula:**
```
avgSessionDuration = Σ(avg_session_minutes) / n
```

Where:
- `avg_session_minutes` = Average time spent on portal per session
- `n` = Total number of patients
- Result: Minutes per session

**Implementation:**
```javascript
const totalSession = data.reduce((sum, p) => sum + (p.avg_session_minutes || 0), 0);
const avgSession = (totalSession / data.length).toFixed(1);
```

**Business Logic:**
- Higher values indicate deeper engagement
- Typical range: 3-20 minutes
- Benchmark: >10 minutes = High engagement

---

### 2. Chart Data Aggregations

#### Login Activity Over Time (Line Chart)

**Purpose:** Track patient engagement trends week-over-week

**Algorithm:**
```
1. Group data by week_date
2. For each week:
   a. Sum all login_count values
   b. Count number of patients
   c. Calculate average: sum / count
3. Sort weeks chronologically
4. Format dates for display
```

**Implementation:**
```javascript
const weeklyData = {};

// Step 1: Group by week
data.forEach(record => {
  if (!weeklyData[record.week_date]) {
    weeklyData[record.week_date] = { total: 0, count: 0 };
  }
  weeklyData[record.week_date].total += record.login_count || 0;
  weeklyData[record.week_date].count += 1;
});

// Step 2: Calculate averages and sort
const sortedWeeks = Object.keys(weeklyData).sort();
const labels = sortedWeeks.map(date => 
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
);
const values = sortedWeeks.map(week => 
  (weeklyData[week].total / weeklyData[week].count).toFixed(1)
);
```

**Formula:**
```
weeklyAvgLogins[i] = Σ(login_count for week_i) / count(patients in week_i)
```

**Chart Configuration:**
- Type: Line chart with area fill
- Tension: 0.4 (smooth curves)
- Colors: Primary teal (#26C6DA)
- Points: Visible on hover

---

#### Appointment No-Show Rate by Age Group (Bar Chart)

**Purpose:** Identify which age demographics have attendance issues

**Algorithm:**
```
1. Define age groups: [18-30, 31-45, 46-60, 60+]
2. For each age group:
   a. Filter patients in that group
   b. Sum all no_show_rate values
   c. Count patients in group
   d. Calculate average: sum / count
3. Apply color gradient (green → orange)
```

**Implementation:**
```javascript
const ageGroupData = {};

// Step 1: Group by age_group
data.forEach(record => {
  const ageGroup = record.age_group || 'Unknown';
  if (!ageGroupData[ageGroup]) {
    ageGroupData[ageGroup] = { total: 0, count: 0 };
  }
  ageGroupData[ageGroup].total += record.no_show_rate || 0;
  ageGroupData[ageGroup].count += 1;
});

// Step 2: Calculate averages
const labels = Object.keys(ageGroupData).sort();
const values = labels.map(group => 
  (ageGroupData[group].total / ageGroupData[group].count).toFixed(1)
);

// Step 3: Color gradient
const backgroundColors = labels.map((_, index) => {
  const ratio = index / (labels.length - 1);
  return `hsla(${160 - ratio * 135}, ${65 - ratio * 10}%, ${45 + ratio * 8}%, 0.8)`;
});
```

**Formula:**
```
noShowRate[age_group] = (Σ no_show_rate for group) / count(patients in group)
```

**Color Algorithm:**
```
HSL gradient:
- Start: hsl(160, 65%, 45%) - Success green
- End: hsl(25, 55%, 53%) - Warning orange
- Interpolation: Linear based on index
```

---

#### Secure Messages by Device Type (Bar Chart)

**Purpose:** Understand which devices patients prefer for communication

**Algorithm:**
```
1. Group by device_type: [Mobile, Desktop, Tablet]
2. For each device:
   a. Sum secure_messages
   b. Count patients using device
   c. Calculate average
3. Assign distinct colors
```

**Implementation:**
```javascript
const deviceData = {};

data.forEach(record => {
  const device = record.device_type || 'Unknown';
  if (!deviceData[device]) {
    deviceData[device] = { messages: 0, count: 0 };
  }
  deviceData[device].messages += record.secure_messages || 0;
  deviceData[device].count += 1;
});

const labels = Object.keys(deviceData).sort();
const avgMessages = labels.map(device => 
  (deviceData[device].messages / deviceData[device].count).toFixed(1)
);
```

**Formula:**
```
avgMessages[device] = Σ(secure_messages for device) / count(patients using device)
```

---

#### Prescription Refills Ratio (Doughnut Chart)

**Purpose:** Show proportion of prescription refills vs other appointments

**Algorithm:**
```
1. Sum all refill_requests across patients
2. Sum all appointments_scheduled across patients
3. Calculate other appointments: total - refills
4. Create ratio visualization
```

**Implementation:**
```javascript
const totalRefills = data.reduce((sum, record) => 
  sum + (record.refill_requests || 0), 0
);
const totalAppointments = data.reduce((sum, record) => 
  sum + (record.appointments_scheduled || 0), 0
);
const otherAppointments = Math.max(0, totalAppointments - totalRefills);

// Percentage calculation (for tooltip)
const refillPercentage = (totalRefills / totalAppointments) * 100;
```

**Formula:**
```
refillRatio = refills / totalAppointments
otherRatio = (totalAppointments - refills) / totalAppointments
percentage = ratio × 100
```

---

#### Session Duration Trend (Line Chart)

**Purpose:** Track how deeply patients engage with portal over time

**Algorithm:**
```
1. Group by week_date
2. For each week:
   a. Sum avg_session_minutes
   b. Count patients
   c. Calculate weekly average
3. Sort chronologically
```

**Implementation:**
```javascript
const weeklyData = {};

data.forEach(record => {
  if (!weeklyData[record.week_date]) {
    weeklyData[record.week_date] = { total: 0, count: 0 };
  }
  weeklyData[record.week_date].total += record.avg_session_minutes || 0;
  weeklyData[record.week_date].count += 1;
});

const sortedWeeks = Object.keys(weeklyData).sort();
const values = sortedWeeks.map(week => 
  (weeklyData[week].total / weeklyData[week].count).toFixed(1)
);
```

**Formula:**
```
weeklyAvgSession[i] = Σ(avg_session_minutes for week_i) / count(patients in week_i)
```

---

### 3. Patient-Specific Visualizations

#### Individual Login Trend (Bar Chart)

**Purpose:** Show individual patient's login activity over recent weeks

**Algorithm:**
```
1. Use patient's current login_count as baseline
2. Generate 4 weeks of mock data
3. Add random variation: ±2 logins
4. Ensure non-negative values
```

**Implementation:**
```javascript
const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
const baseLogin = patient.login_count || 5;

const loginData = weeks.map(() => 
  Math.max(0, baseLogin + Math.floor(Math.random() * 4 - 2))
);
```

**Formula:**
```
weeklyLogin[i] = max(0, baseLogin + random(-2, 2))
```

**Note:** This is mock data for visualization purposes. In production, use actual weekly historical data.

---

#### Communication vs Refills (Bar Chart)

**Purpose:** Compare patient's messaging and prescription activity

**Implementation:**
```javascript
const data = {
  labels: ['Secure Messages', 'Refill Requests'],
  values: [
    patient.secure_messages || 0,
    patient.refill_requests || 0
  ]
};
```

**No calculation needed** - Direct display of raw values.

---

#### Satisfaction Score (Gauge/Doughnut Chart)

**Purpose:** Visualize patient satisfaction on 1-5 scale

**Algorithm:**
```
1. Get satisfaction_score (1-5)
2. Calculate percentage: (score / 5) × 100
3. Determine color based on threshold:
   - Green: score ≥ 4
   - Orange: 3 ≤ score < 4
   - Red: score < 3
4. Display as gauge with remaining unfilled
```

**Implementation:**
```javascript
const score = patient.satisfaction_score || 3;
const maxScore = 5;
const percentage = (score / maxScore) * 100;

// Color determination
const getColor = (score) => {
  if (score >= 4) return 'hsl(160, 65%, 45%)'; // Success green
  if (score >= 3) return 'hsl(25, 95%, 53%)';  // Warning orange
  return 'hsl(0, 84%, 60%)';                    // Destructive red
};

// Doughnut data
const chartData = {
  labels: ['Score', 'Remaining'],
  data: [score, maxScore - score]
};
```

**Formula:**
```
percentage = (score / maxScore) × 100
remaining = maxScore - score

Color:
  if score ≥ 4.0: GREEN
  else if score ≥ 3.0: ORANGE
  else: RED
```

---

## 🔄 Filtering Logic

### Multi-Filter System

**Algorithm:**
```
1. Start with full dataset
2. For each active filter:
   a. Apply filter condition
   b. Keep only matching records
3. Update all charts with filtered data
4. Recalculate KPIs
```

**Implementation:**
```javascript
let filtered = [...patientData];

// Apply age group filter
if (filters.ageGroup !== 'all') {
  filtered = filtered.filter(p => p.age_group === filters.ageGroup);
}

// Apply gender filter
if (filters.gender !== 'all') {
  filtered = filtered.filter(p => 
    p.gender.toLowerCase() === filters.gender.toLowerCase()
  );
}

// Apply device filter
if (filters.deviceType !== 'all') {
  filtered = filtered.filter(p => p.device_type === filters.deviceType);
}

// Update state
setFilteredData(filtered);
```

**Filter Intersection:**
```
Final_Result = Dataset ∩ Filter1 ∩ Filter2 ∩ Filter3
```

All filters work together (AND logic, not OR).

---

## 🎨 Counter Animation Algorithm

### Animated KPI Numbers

**Purpose:** Smooth animation from 0 to target value

**Algorithm:**
```
1. Define animation duration (1000ms)
2. Define number of steps (50)
3. Calculate step duration: duration / steps
4. For each step:
   a. Calculate progress: currentStep / totalSteps
   b. Interpolate value: targetValue × progress
   c. Update display
5. After final step, set exact target value
```

**Implementation:**
```javascript
useEffect(() => {
  const duration = 1000; // 1 second
  const steps = 50;
  const stepDuration = duration / steps;
  let currentStep = 0;

  const interval = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;

    setAnimatedValues({
      avgLogins: (kpis.avgLogins * progress).toFixed(1),
      avgMessages: (kpis.avgMessages * progress).toFixed(1),
      avgNoShow: (kpis.avgNoShow * progress).toFixed(1),
      avgSession: (kpis.avgSession * progress).toFixed(1)
    });

    if (currentStep >= steps) {
      clearInterval(interval);
      setAnimatedValues(kpis); // Set exact final values
    }
  }, stepDuration);

  return () => clearInterval(interval);
}, [data]);
```

**Mathematical Formula:**
```
For frame i (where i = 0 to 50):
  progress = i / 50
  displayValue = targetValue × progress

Linear interpolation:
  V(t) = V₀ + (V₁ - V₀) × (t / T)

Where:
  V(t) = Value at time t
  V₀ = Starting value (0)
  V₁ = Target value
  T = Total duration
  t = Current time
```

---

## 🔐 Authentication Logic

### Role-Based Access Control (RBAC)

**Algorithm:**
```
1. User submits credentials
2. Check against mock user database
3. If valid:
   a. Store user object in LocalStorage
   b. Include role (admin/user)
   c. Redirect to dashboard
4. On dashboard load:
   a. Read user from LocalStorage
   b. Render components based on role
5. For protected features:
   a. Check user.role
   b. Show/hide accordingly
```

**Implementation:**
```javascript
// Mock users database
const mockUsers = [
  { 
    username: 'admin', 
    password: 'admin123', 
    role: 'admin', 
    name: 'Dr. Admin' 
  },
  { 
    username: 'user', 
    password: 'user123', 
    role: 'user', 
    name: 'Healthcare User' 
  }
];

// Login validation
const handleLogin = (credentials) => {
  const user = mockUsers.find(
    u => u.username === credentials.username && 
         u.password === credentials.password
  );
  
  if (user) {
    // Store in LocalStorage
    localStorage.setItem('user', JSON.stringify({
      username: user.username,
      role: user.role,
      name: user.name
    }));
    navigate('/dashboard');
  }
};

// Access control in components
const isAdmin = user?.role === 'admin';

{isAdmin && (
  <AdminOnlyComponent />
)}

{!isAdmin && (
  <RestrictedMessage />
)}
```

**Access Matrix:**
```
Feature                 | Admin | User
------------------------|-------|------
Login Activity Chart    |   ✓   |  ✓
No-Show Rate Chart      |   ✓   |  ✓
Secure Messages Chart   |   ✓   |  ✗
Refills Chart           |   ✓   |  ✗
Session Duration Chart  |   ✓   |  ✗
Patient Search          |   ✓   |  ✗
Patient Details         |   ✓   |  ✗
```

---

## 🎨 Theme System

### Dark/Light Mode Toggle

**Algorithm:**
```
1. Check current theme state
2. Toggle state
3. Add/remove 'dark' class on <html>
4. CSS variables automatically switch
5. Persist preference (optional)
```

**Implementation:**
```javascript
const [isDark, setIsDark] = useState(false);

const toggleTheme = () => {
  setIsDark(!isDark);
  document.documentElement.classList.toggle('dark');
  
  // Optional: Persist in LocalStorage
  localStorage.setItem('theme', !isDark ? 'dark' : 'light');
};

// On mount: Check saved preference
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    setIsDark(true);
    document.documentElement.classList.add('dark');
  }
}, []);
```

**CSS Variable Switching:**
```css
:root {
  --background: 210 25% 98%;    /* Light mode */
  --foreground: 210 20% 15%;
}

.dark {
  --background: 210 30% 8%;     /* Dark mode */
  --foreground: 210 20% 98%;
}

/* Usage */
.element {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

All colors switch automatically when `.dark` class is toggled.

---

## 🔍 Search Algorithm

### Patient Autocomplete Search

**Algorithm:**
```
1. User types in search box
2. Filter patients by:
   a. Name contains search term (case-insensitive)
   b. Patient ID contains search term
3. Limit results to 10
4. Display in dropdown
5. On selection, load patient details
```

**Implementation:**
```javascript
const [searchTerm, setSearchTerm] = useState('');

// Filtered patients
const filteredPatients = useMemo(() => {
  if (!searchTerm) return uniquePatients.slice(0, 10);
  
  const term = searchTerm.toLowerCase();
  return uniquePatients
    .filter(p => 
      p.patient_name.toLowerCase().includes(term) ||
      p.patient_id.toLowerCase().includes(term)
    )
    .slice(0, 10);
}, [searchTerm, uniquePatients]);

// On patient selection
const handlePatientClick = (patient) => {
  onPatientSelect(patient);
  setSearchTerm('');
};
```

**Search Formula:**
```
Match = (patient_name CONTAINS searchTerm) OR 
        (patient_id CONTAINS searchTerm)

Results = LIMIT(FILTER(patients, Match), 10)
```

**Case-Insensitive Matching:**
```javascript
// Convert both to lowercase for comparison
const matches = name.toLowerCase().includes(term.toLowerCase());
```

---

## 📐 Responsive Breakpoints

**Tailwind CSS Breakpoints:**
```
sm:  640px   - Small tablets
md:  768px   - Tablets
lg:  1024px  - Small laptops
xl:  1280px  - Desktops
2xl: 1536px  - Large screens
```

**Grid Layouts:**
```javascript
// KPI Cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  // 1 column (mobile) → 2 (tablet) → 4 (desktop)
</div>

// Charts
<div className="grid grid-cols-1 lg:grid-cols-2">
  // 1 column (mobile/tablet) → 2 (desktop)
</div>
```

**Responsive Typography:**
```javascript
// Main heading
<h1 className="text-3xl sm:text-4xl lg:text-5xl">
  // 30px → 36px → 48px
</h1>

// Body text
<p className="text-sm md:text-base">
  // 14px → 16px
</p>
```

---

## 🚀 Performance Optimizations

### 1. useMemo for Expensive Calculations

**Purpose:** Cache calculated values to avoid recalculation on every render

```javascript
const chartData = useMemo(() => {
  // Expensive calculation
  const result = processData(data);
  return result;
}, [data]); // Only recalculate when data changes
```

### 2. Debounced Search

**Purpose:** Limit search API calls

```javascript
const debouncedSearch = useMemo(
  () => debounce((term) => {
    // Search logic
  }, 300),
  []
);
```

### 3. React.lazy for Code Splitting

**Purpose:** Load components only when needed

```javascript
const Dashboard = lazy(() => import('./pages/DashboardPage'));

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

---

## 📊 Data Flow Architecture

```
User Action
    ↓
Component Event Handler
    ↓
State Update (useState/useEffect)
    ↓
Apply Filters/Calculations
    ↓
Generate Chart Data (useMemo)
    ↓
Chart.js Rendering
    ↓
Display to User
```

**Example Flow:**
```
1. User selects "Age Group: 31-45"
2. handleFilterChange() updates filters state
3. useEffect triggers with new filter
4. filterData() processes full dataset
5. setFilteredData() updates state
6. All chart components re-render
7. useMemo recalculates chart-specific data
8. Chart.js renders new visuals
```

---

## 🎯 Key Design Patterns

### 1. Composition Over Inheritance
All components are functional, using hooks for logic.

### 2. Single Responsibility
Each component has one clear purpose:
- `KPISection`: Display metrics
- `FiltersPanel`: Handle filtering UI
- `ChartsSection`: Manage chart grid

### 3. Container/Presentational Pattern
- Container: `DashboardPage` (logic)
- Presentational: Charts, Cards (UI only)

### 4. Custom Hooks
```javascript
// Reusable toast notifications
const { toast } = useToast();

toast.success('Login successful!');
```

---

## 🛡️ Error Handling

### Data Loading
```javascript
try {
  const response = await fetch('/data.json');
  const data = await response.json();
  setPatientData(data);
} catch (error) {
  console.error('Error loading data:', error);
  // Fallback to mock data
  const mockData = generateMockData(1000);
  setPatientData(mockData);
}
```

### Missing Data Handling
```javascript
// Safe access with defaults
const value = record.login_count || 0;
const name = patient?.patient_name || 'Unknown';

// Array safety
if (data && data.length > 0) {
  // Process data
}
```

---

## 📚 Component API Reference

### KPISection
**Props:**
- `data`: Array of patient records
**Output:** 4 KPI cards with animated values

### FiltersPanel
**Props:**
- `filters`: Current filter state
- `onFilterChange`: Callback for filter updates
- `onReset`: Reset all filters
- `data`: Full dataset for filter options
**Output:** Filter controls and active badges

### ChartsSection
**Props:**
- `data`: Filtered patient records
- `userRole`: 'admin' or 'user'
- `onPatientSelect`: Callback for patient selection
**Output:** Grid of charts based on role

### PatientViewer
**Props:**
- `patient`: Selected patient object
- `onBack`: Return to dashboard callback
- `userRole`: Access control
**Output:** Detailed patient view with charts

---

## 🔧 Utility Functions

### Date Formatting
```javascript
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};
```

### Number Formatting
```javascript
const formatNumber = (num, decimals = 1) => {
  return parseFloat(num).toFixed(decimals);
};
```

### Color Utilities
```javascript
const getEngagementColor = (level) => {
  switch (level?.toLowerCase()) {
    case 'high': return 'success';
    case 'medium': return 'warning';
    case 'low': return 'destructive';
    default: return 'secondary';
  }
};
```

---

## 📖 Conclusion

This dashboard uses straightforward mathematical calculations combined with modern React patterns to create an interactive, performant analytics tool. All formulas are designed for real-world healthcare metrics and can be easily adapted for production use with actual backend data.

**Key Takeaways:**
1. Simple aggregations (averages, sums) for KPIs
2. Time-series analysis for trend charts
3. Demographic grouping for comparative analysis
4. Role-based rendering for security
5. Optimized React patterns for performance

For questions or contributions, refer to the main README.md.
