// Mock data generator for patient portal analytics

export const generateMockData = (count = 1000) => {
  const ageGroups = ['18-30', '31-45', '46-60', '60+'];
  const genders = ['Male', 'Female', 'Other'];
  const deviceTypes = ['Mobile', 'Desktop', 'Tablet'];
  const states = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
  const cities = {
    'CA': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
    'NY': ['New York', 'Buffalo', 'Rochester', 'Albany'],
    'TX': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
    'FL': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
    'IL': ['Chicago', 'Springfield', 'Naperville', 'Rockford'],
    'PA': ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie'],
    'OH': ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo'],
    'GA': ['Atlanta', 'Savannah', 'Augusta', 'Athens'],
    'NC': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham'],
    'MI': ['Detroit', 'Grand Rapids', 'Lansing', 'Ann Arbor']
  };
  const insuranceTypes = ['Medicare', 'Medicaid', 'Private', 'Self-Pay'];
  const chronicConditions = ['None', 'Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'COPD'];
  const engagementLevels = ['Low', 'Medium', 'High'];
  const firstNames = ['Sarah', 'John', 'Emily', 'Michael', 'Jessica', 'David', 'Ashley', 'James', 'Amanda', 'Robert', 'Jennifer', 'William', 'Lisa', 'Richard', 'Mary'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomFloat = (min, max, decimals = 1) => (Math.random() * (max - min) + min).toFixed(decimals);

  const generateWeekDates = () => {
    const dates = [];
    const startDate = new Date('2024-01-01');
    for (let i = 0; i < 52; i++) {
      const weekDate = new Date(startDate);
      weekDate.setDate(startDate.getDate() + (i * 7));
      dates.push(weekDate.toISOString().split('T')[0]);
    }
    return dates;
  };

  const weekDates = generateWeekDates();
  const data = [];

  for (let i = 0; i < count; i++) {
    const patientId = `P-${String(i + 1).padStart(4, '0')}`;
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const patientName = `${firstName} ${lastName}`;
    const ageGroup = getRandomElement(ageGroups);
    const age = ageGroup === '18-30' ? getRandomNumber(18, 30) :
                ageGroup === '31-45' ? getRandomNumber(31, 45) :
                ageGroup === '46-60' ? getRandomNumber(46, 60) :
                getRandomNumber(61, 85);
    const gender = getRandomElement(genders);
    const deviceType = getRandomElement(deviceTypes);
    const state = getRandomElement(states);
    const city = getRandomElement(cities[state]);
    const insuranceType = getRandomElement(insuranceTypes);
    const chronicCondition = getRandomElement(chronicConditions);
    const enrollmentDate = new Date(2024, getRandomNumber(0, 11), getRandomNumber(1, 28)).toISOString().split('T')[0];
    const weekDate = getRandomElement(weekDates);
    const loginCount = getRandomNumber(0, 15);
    const secureMessages = getRandomNumber(0, 10);
    const refillRequests = getRandomNumber(0, 5);
    const appointmentsScheduled = getRandomNumber(0, 4);
    const appointmentsMissed = getRandomNumber(0, Math.min(2, appointmentsScheduled));
    const avgSessionMinutes = parseFloat(getRandomFloat(2, 45));
    const satisfactionScore = parseFloat(getRandomFloat(1, 5));
    const noShowRate = appointmentsScheduled > 0 ? parseFloat(((appointmentsMissed / appointmentsScheduled) * 100).toFixed(1)) : 0;
    const engagementLevel = loginCount > 10 ? 'High' : loginCount > 5 ? 'Medium' : 'Low';

    data.push({
      patient_id: patientId,
      patient_name: patientName,
      age,
      gender,
      device_type: deviceType,
      state,
      city,
      insurance_type: insuranceType,
      chronic_condition: chronicCondition,
      enrollment_date: enrollmentDate,
      week_date: weekDate,
      login_count: loginCount,
      secure_messages: secureMessages,
      refill_requests: refillRequests,
      appointments_scheduled: appointmentsScheduled,
      appointments_missed: appointmentsMissed,
      avg_session_minutes: avgSessionMinutes,
      satisfaction_score: satisfactionScore,
      no_show_rate: noShowRate,
      age_group: ageGroup,
      engagement_level: engagementLevel
    });
  }

  return data;
};
