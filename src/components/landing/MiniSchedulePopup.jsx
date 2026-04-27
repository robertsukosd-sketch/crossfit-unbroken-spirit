import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useLanguage } from '../LanguageProvider';

const getCrossFitClasses = (t) => ({
  [t("monday")]:    ["07:00", "08:00", "12:30", "17:30", "18:30", "19:30"],
  [t("tuesday")]:   ["07:00", "08:00", "12:30", "17:30", "18:30", "19:30"],
  [t("wednesday")]: ["07:00", "08:00", "12:30", "17:30", "18:30", "19:30"],
  [t("thursday")]:  ["07:00", "08:00", "12:30", "17:30", "18:30", "19:30"],
  [t("friday")]:    ["07:00", "08:00", "12:30", "17:30", "18:30", "19:30"],
});

const getDays = (t) => [t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday")];

const DAY_ABBR_RO = ["Lun", "Mar", "Mie", "Joi", "Vin"];
const DAY_ABBR_EN = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// Returns the Monday of the current week
const getWeekMonday = (weekOffset = 0) => {
  const now = new Date();
  const jsDay = now.getDay(); // 0=Sun..6=Sat
  const diffToMon = jsDay === 0 ? -6 : 1 - jsDay;
  const mon = new Date(now);
  mon.setDate(now.getDate() + diffToMon + weekOffset * 7);
  mon.setHours(0, 0, 0, 0);
  return mon;
};

// Returns a Date for dayIndex (0=Mon..5=Sat) within a given week's Monday
const getDateForDayInWeek = (weekMonday, dayIndex) => {
  const d = new Date(weekMonday);
  d.setDate(weekMonday.getDate() + dayIndex);
  return d;
};

const isSlotInPast = (weekMonday, dayIndex, time) => {
  const slotDate = getDateForDayInWeek(weekMonday, dayIndex);
  const [h, m] = time.split(':').map(Number);
  slotDate.setHours(h, m, 0, 0);
  return slotDate < new Date();
};

export default function MiniSchedulePopup({ isOpen, onClose, selectedSlot, onSlotSelect }) {
  const { t, language } = useLanguage();
  const schedule = useMemo(() => getCrossFitClasses(t), [language]);
  const days = useMemo(() => getDays(t), [language]);
  const dayAbbrList = language === 'ro' ? DAY_ABBR_RO : DAY_ABBR_EN;

  // Determine initial day/week and min/max week offset
  const getInitialDayAndWeek = () => {
    const now = new Date();
    const jsDay = now.getDay(); // 0=Sun..6=Sat
    const timeInMin = now.getHours() * 60 + now.getMinutes();
    const isFridayAfterCutoff = jsDay === 5 && timeInMin >= 20 * 60 + 31;
    const isWeekendOrAfterFridayCutoff = jsDay === 0 || jsDay === 6 || isFridayAfterCutoff;

    if (isWeekendOrAfterFridayCutoff) {
      // Start on Monday of next week
      return { dayIndex: 0, weekOffset: 1, minWeek: 1, maxWeek: 2 };
    }

    // Normal weekday logic: after 19:30, advance to next available day
    const afterCutoff = timeInMin >= 19 * 60 + 30;
    let dayIndex = jsDay === 0 ? 0 : jsDay - 1; // convert to 0=Mon..4=Fri
    let week = 0;

    if (afterCutoff) {
      dayIndex = dayIndex + 1;
      if (dayIndex >= 5) { dayIndex = 0; week = 1; } // past Friday → Monday next week
    }

    return { dayIndex: Math.min(dayIndex, 4), weekOffset: week, minWeek: 0, maxWeek: 1 };
  };

  const initial = getInitialDayAndWeek();
  const [weekOffset, setWeekOffset] = useState(initial.weekOffset);
  const [selectedDayIndex, setSelectedDayIndex] = useState(initial.dayIndex);
  const minWeek = initial.minWeek;
  const maxWeek = initial.maxWeek;

  useEffect(() => {
    if (isOpen) {
      const { dayIndex, weekOffset: wo } = getInitialDayAndWeek();
      setSelectedDayIndex(Math.min(dayIndex, 4));
      setWeekOffset(wo);
    }
  }, [isOpen, days]);

  const weekMonday = useMemo(() => getWeekMonday(weekOffset), [weekOffset]);

  const selectedDay = days[selectedDayIndex];
  const classes = schedule[selectedDay] || [];

  const weekLabel = () => {
    const mon = weekMonday;
    const fri = new Date(mon);
    fri.setDate(mon.getDate() + 4);
    const fmt = (d) => `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}`;
    return `${fmt(mon)} – ${fmt(fri)}`;
  };

  const weekLabelText = () => {
    if (weekOffset === minWeek && minWeek === 0) return language === 'ro' ? 'Săptămâna aceasta' : 'This week';
    if (weekOffset === minWeek && minWeek === 1) return language === 'ro' ? 'Săptămâna viitoare' : 'Next week';
    if (weekOffset === minWeek + 1) return language === 'ro' ? 'Săptămâna viitoare' : 'Next week';
    return language === 'ro' ? 'Peste 2 săptămâni' : 'In 2 weeks';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="overflow-hidden mb-4"
        >
          <div className="bg-zinc-800 border border-zinc-600 rounded-2xl p-4 min-w-0 w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-black text-sm">
                {language === 'ro' ? '📅 Clase CrossFit' : '📅 CrossFit Classes'}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-zinc-700"
                aria-label="Close schedule"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Week navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => setWeekOffset(w => Math.max(minWeek, w - 1))}
                disabled={weekOffset === minWeek}
                className={cn(
                  "p-1 rounded-full transition-colors",
                  weekOffset === minWeek
                    ? "text-zinc-700 cursor-not-allowed"
                    : "text-gray-400 hover:text-white hover:bg-zinc-700 cursor-pointer"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-400 font-semibold tabular-nums">
                {weekLabelText()}{' · '}{weekLabel()}
              </span>
              <button
                type="button"
                onClick={() => setWeekOffset(w => Math.min(maxWeek, w + 1))}
                disabled={weekOffset === maxWeek}
                className={cn(
                  "p-1 rounded-full transition-colors",
                  weekOffset === maxWeek
                    ? "text-zinc-700 cursor-not-allowed"
                    : "text-gray-400 hover:text-white hover:bg-zinc-700 cursor-pointer"
                )}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day tabs with dates */}
            <div className="flex gap-1 mb-3 overflow-x-auto pb-1 scrollbar-none">
              {days.map((day, i) => {
                const d = getDateForDayInWeek(weekMonday, i);
                const dateLabel = `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}`;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDayIndex(i)}
                    className={cn(
                      "px-2.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150 flex-shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 flex flex-col items-center justify-center leading-tight text-center",
                      selectedDayIndex === i
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-700 text-gray-400 hover:bg-zinc-600 hover:text-white"
                    )}
                  >
                    <span>{dayAbbrList[i]}</span>
                    <span className={cn("text-[9px] font-normal", selectedDayIndex === i ? "text-blue-100" : "text-zinc-500")}>{dateLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Classes grid */}
            <div className="grid grid-cols-3 gap-1.5">
              {classes.length === 0 ? (
                <div className="col-span-3 text-center py-4 text-zinc-500 text-xs italic">
                  {language === 'ro' ? 'Închis' : 'Closed'}
                </div>
              ) : (
                classes.map((time) => {
                  const isPast = isSlotInPast(weekMonday, selectedDayIndex, time);
                  const isSelected = selectedSlot?.day === selectedDay && selectedSlot?.time === time && selectedSlot?.weekOffset === weekOffset;
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isPast}
                      onClick={() => !isPast && onSlotSelect(selectedDay, time, weekOffset)}
                      className={cn(
                        "flex items-center justify-center px-3 py-2.5 rounded-xl border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                        isPast
                          ? "bg-zinc-800 border-zinc-700 cursor-not-allowed opacity-40"
                          : isSelected
                            ? "bg-blue-500 border-blue-400 shadow-md shadow-blue-500/30 cursor-pointer"
                            : "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40 cursor-pointer"
                      )}
                    >
                      <span className={cn("font-bold text-sm tabular-nums", isPast ? "text-zinc-600" : isSelected ? "text-white" : "text-blue-300")}>{time}</span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Greyed out note */}
            <p className="mt-3 text-zinc-600 text-xs text-center">
              {language === 'ro' ? 'Open Gym & alte clase nu sunt afișate' : 'Open Gym & other classes not shown'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}