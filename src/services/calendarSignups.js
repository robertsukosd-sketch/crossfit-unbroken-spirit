import { base44 } from '@/api/base44Client';

const DAY_NAMES = {
  ro: ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};

export function getWeekMonday(weekOffset = 0) {
  const now = new Date();
  const jsDay = now.getDay();
  const diffToMon = jsDay === 0 ? -6 : 1 - jsDay;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMon + weekOffset * 7);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getSlotDateKey(slot) {
  if (!slot) return '';
  const monday = getWeekMonday(slot.weekOffset || 0);
  const normalizedDay = String(slot.day || '').toLowerCase();
  const allDays = [...DAY_NAMES.ro, ...DAY_NAMES.en];
  const dayIndex = allDays.findIndex((day) => day.toLowerCase() === normalizedDay) % 7;
  const slotDate = new Date(monday);
  slotDate.setDate(monday.getDate() + Math.max(dayIndex, 0));
  return formatDateKey(slotDate);
}

export async function createCalendarSignup({ form, selectedSlot, signupType, packageName, message, source }) {
  if (!selectedSlot || !form?.name?.trim()) return;

  await base44.entities.CalendarSignup.create({
    name: form.name.trim(),
    email: form.email || '',
    phone: form.phone || '',
    signup_type: signupType,
    package_name: packageName || '',
    day: selectedSlot.day,
    time: selectedSlot.time,
    slot_date: getSlotDateKey(selectedSlot),
    message: message || '',
    source,
    status: 'new',
  });
}

export function getWeeklySchedule(weekOffset = 0) {
  const monday = getWeekMonday(weekOffset);
  const days = DAY_NAMES.ro.slice(0, 6).map((day, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return {
      day,
      dayEn: DAY_NAMES.en[index],
      date,
      dateKey: formatDateKey(date),
      slots: index === 6 ? [] : getSlotsForDay(index),
    };
  });

  return days;
}

function getSlotsForDay(dayIndex) {
  if (dayIndex === 5) {
    return [
      { time: '08:00-10:00', type: 'Open Gym' },
      { time: '10:00-11:30', type: 'CrossFit' },
    ];
  }

  return [
    { time: '07:00', type: 'CrossFit' },
    { time: '08:00', type: 'CrossFit' },
    { time: '07:00-09:30', type: 'Open Gym' },
    { time: '12:30', type: 'CrossFit' },
    { time: '12:30-14:30', type: 'Open Gym' },
    { time: '14:30-16:30', type: 'Open Gym' },
    { time: '16:30-18:30', type: 'Open Gym' },
    { time: '18:30-20:30', type: 'Open Gym' },
    { time: '17:30', type: 'CrossFit' },
    { time: '18:30', type: 'CrossFit' },
    { time: '19:30', type: 'CrossFit' },
  ];
}