import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useLanguage } from '../LanguageProvider';

const getCrossFitClasses = (t) => ({
  [t("monday")]:    ["07:00", "08:00", "12:30", "17:30", "18:30", "19:30"],
  [t("tuesday")]:   ["07:00", "08:00", "12:30", "17:30", "18:30", "19:30"],
  [t("wednesday")]: ["07:00", "08:00", "12:30", "17:30", "18:30", "19:30"],
  [t("thursday")]:  ["07:00", "08:00", "12:30", "17:30", "18:30", "19:30"],
  [t("friday")]:    ["07:00", "08:00", "12:30", "17:30", "18:30", "19:30"],
  [t("saturday")]:  ["10:00"],
  [t("sunday")]:    [],
});

const getDays = (t) => [t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday"), t("saturday")];

const DAY_ABBR_RO = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"];
const DAY_ABBR_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Map day index (0=Mon..5=Sat) to a JS Date for this week
const getDateForDayIndex = (dayIndex) => {
  const now = new Date();
  const jsDay = now.getDay(); // 0=Sun, 1=Mon...
  const todayMon0 = jsDay === 0 ? 6 : jsDay - 1; // Mon=0..Sat=5
  const diff = dayIndex - todayMon0;
  const d = new Date(now);
  d.setDate(now.getDate() + diff);
  return d;
};

const isSlotInPast = (dayIndex, time) => {
  const slotDate = getDateForDayIndex(dayIndex);
  const [h, m] = time.split(':').map(Number);
  slotDate.setHours(h, m, 0, 0);
  return slotDate < new Date();
};

export default function MiniSchedulePopup({ isOpen, onClose, selectedSlot, onSlotSelect }) {
  const { t, language } = useLanguage();
  const schedule = useMemo(() => getCrossFitClasses(t), [language]);
  const days = useMemo(() => getDays(t), [language]);
  const dayAbbrList = language === 'ro' ? DAY_ABBR_RO : DAY_ABBR_EN;

  const todayIndex = new Date().getDay();
  const rawIndex = todayIndex === 0 ? 6 : todayIndex - 1;
  const mappedIndex = Math.min(rawIndex, 5);
  const [selectedDay, setSelectedDay] = useState(days[mappedIndex]);

  useEffect(() => {
    setSelectedDay(days[mappedIndex]);
  }, [days]);

  const classes = schedule[selectedDay] || [];

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

            {/* Day tabs */}
            <div className="flex gap-1 mb-3 overflow-x-auto pb-1 scrollbar-none">
              {days.map((day, i) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "px-2.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150 flex-shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                    selectedDay === day
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-700 text-gray-400 hover:bg-zinc-600 hover:text-white"
                  )}
                >
                  {dayAbbrList[i]}
                </button>
              ))}
            </div>

            {/* Classes grid */}
            <div className="grid grid-cols-3 gap-1.5">
              {classes.length === 0 ? (
                <div className="col-span-3 text-center py-4 text-zinc-500 text-xs italic">
                  {language === 'ro' ? 'Închis' : 'Closed'}
                </div>
              ) : (
                classes.map((time) => {
                  const isSelected = selectedSlot?.day === selectedDay && selectedSlot?.time === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => onSlotSelect(selectedDay, time)}
                      className={cn(
                        "flex items-center justify-center px-3 py-2.5 rounded-xl border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                        isSelected
                          ? "bg-blue-500 border-blue-400 shadow-md shadow-blue-500/30"
                          : "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40"
                      )}
                    >
                      <span className={cn("font-bold text-sm tabular-nums", isSelected ? "text-white" : "text-blue-300")}>{time}</span>
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