export interface LiveOpeningStatus {
  isOpen: boolean;
  statusTitle: string;
  statusDetail: string;
  pragueTimeFormatted: string;
}

interface DaySchedule {
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
  dayNameGenitiveOrLocative: string;
  dayNameNominative: string;
}

// 0 = Neděle, 1 = Pondělí, ..., 6 = Sobota
const WEEKLY_SCHEDULE: Record<number, DaySchedule> = {
  0: {
    openHour: 11,
    openMinute: 0,
    closeHour: 20,
    closeMinute: 45,
    dayNameGenitiveOrLocative: 'v neděli',
    dayNameNominative: 'Neděle',
  },
  1: {
    openHour: 10,
    openMinute: 0,
    closeHour: 20,
    closeMinute: 45,
    dayNameGenitiveOrLocative: 'v pondělí',
    dayNameNominative: 'Pondělí',
  },
  2: {
    openHour: 10,
    openMinute: 0,
    closeHour: 20,
    closeMinute: 45,
    dayNameGenitiveOrLocative: 'v úterý',
    dayNameNominative: 'Úterý',
  },
  3: {
    openHour: 10,
    openMinute: 0,
    closeHour: 20,
    closeMinute: 45,
    dayNameGenitiveOrLocative: 've středu',
    dayNameNominative: 'Středa',
  },
  4: {
    openHour: 10,
    openMinute: 0,
    closeHour: 20,
    closeMinute: 45,
    dayNameGenitiveOrLocative: 've čtvrtek',
    dayNameNominative: 'Čtvrtek',
  },
  5: {
    openHour: 10,
    openMinute: 0,
    closeHour: 21,
    closeMinute: 15,
    dayNameGenitiveOrLocative: 'v pátek',
    dayNameNominative: 'Pátek',
  },
  6: {
    openHour: 10,
    openMinute: 0,
    closeHour: 21,
    closeMinute: 15,
    dayNameGenitiveOrLocative: 'v sobotu',
    dayNameNominative: 'Sobota',
  },
};

function formatTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function getPragueOpeningStatus(now: Date = new Date()): LiveOpeningStatus {
  // Extract current day, hour, and minute in Europe/Prague timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Prague',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const weekdayStr = parts.find((p) => p.type === 'weekday')?.value || 'Mon';
  const hourStr = parts.find((p) => p.type === 'hour')?.value || '12';
  const minuteStr = parts.find((p) => p.type === 'minute')?.value || '00';

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const currentDay = weekdayMap[weekdayStr] ?? 1;
  const currentHour = parseInt(hourStr, 10) % 24;
  const currentMinute = parseInt(minuteStr, 10);
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  const todaySchedule = WEEKLY_SCHEDULE[currentDay];
  const openTotalMinutes = todaySchedule.openHour * 60 + todaySchedule.openMinute;
  const closeTotalMinutes = todaySchedule.closeHour * 60 + todaySchedule.closeMinute;

  const pragueTimeFormatted = formatTime(currentHour, currentMinute);

  if (currentTotalMinutes >= openTotalMinutes && currentTotalMinutes < closeTotalMinutes) {
    return {
      isOpen: true,
      statusTitle: 'Nyní otevřeno',
      statusDetail: `Dnes do ${formatTime(todaySchedule.closeHour, todaySchedule.closeMinute)}`,
      pragueTimeFormatted,
    };
  }

  if (currentTotalMinutes < openTotalMinutes) {
    return {
      isOpen: false,
      statusTitle: 'Nyní zavřeno',
      statusDetail: `Otevíráme dnes v ${formatTime(todaySchedule.openHour, todaySchedule.openMinute)}`,
      pragueTimeFormatted,
    };
  }

  // After closing time today -> opens tomorrow
  const tomorrowDay = (currentDay + 1) % 7;
  const tomorrowSchedule = WEEKLY_SCHEDULE[tomorrowDay];
  return {
    isOpen: false,
    statusTitle: 'Nyní zavřeno',
    statusDetail: `Otevíráme zítra (${tomorrowSchedule.dayNameNominative}) v ${formatTime(
      tomorrowSchedule.openHour,
      tomorrowSchedule.openMinute
    )}`,
    pragueTimeFormatted,
  };
}
