import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useLanguage } from '../LanguageProvider';
import { openAppStore } from '../appStoreUtils';

const getSchedule = (t) => ({
  [t("monday")]: [
    { time: "07:00", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "08:00", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "07:00-09:30", class: "Open Gym", coach: "-", spots: 4 },
    { time: "12:30-20:30", class: "Open Gym", coach: "-", spots: 4 },
    { time: "12:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "17:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "18:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "19:30", class: "CrossFit", coach: "CB", spots: 16 },
  ],
  [t("tuesday")]: [
    { time: "07:00", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "08:00", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "07:00-09:30", class: "Open Gym", coach: "-", spots: 4 },
    { time: "12:30-20:30", class: "Open Gym", coach: "-", spots: 4 },
    { time: "12:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "17:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "18:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "19:30", class: "CrossFit", coach: "CB", spots: 16 },
  ],
  [t("wednesday")]: [
    { time: "07:00", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "08:00", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "07:00-09:30", class: "Open Gym", coach: "-", spots: 4 },
    { time: "12:30-20:30", class: "Open Gym", coach: "-", spots: 4 },
    { time: "12:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "17:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "18:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "19:30", class: "CrossFit", coach: "CB", spots: 16 },
  ],
  [t("thursday")]: [
    { time: "07:00", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "08:00", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "07:00-09:30", class: "Open Gym", coach: "-", spots: 4 },
    { time: "12:30-20:30", class: "Open Gym", coach: "-", spots: 4 },
    { time: "12:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "17:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "18:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "19:30", class: "CrossFit", coach: "CB", spots: 16 },
  ],
  [t("friday")]: [
    { time: "07:00", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "08:00", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "07:00-09:30", class: "Open Gym", coach: "-", spots: 4 },
    { time: "12:30-20:30", class: "Open Gym", coach: "-", spots: 4 },
    { time: "12:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "17:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "18:30", class: "CrossFit", coach: "CB", spots: 16 },
    { time: "19:30", class: "CrossFit", coach: "CB", spots: 16 },
  ],
  [t("saturday")]: [
    { time: "09:00", class: "CrossFit Kids", coach: "CB", spots: 15 },
    { time: "10:00-11:30", class: "CrossFit", coach: "CB", spots: 16 },
  ],
  [t("sunday")]: []
});

const getDays = (t) => [t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday"), t("saturday"), t("sunday")];

const classColors = {
  "CrossFit": "bg-blue-500/20 border-blue-500/30 text-blue-400",
  "CrossFit Kids": "bg-purple-500/20 border-purple-500/30 text-purple-400",
  "Open Gym": "bg-cyan-500/20 border-cyan-500/30 text-cyan-400",
};

export default function ScheduleSection() {
  const { t, language } = useLanguage();
  const schedule = getSchedule(t);
  const days = getDays(t);
  const [selectedDay, setSelectedDay] = useState(days[0]);

  useEffect(() => {
    setSelectedDay(days[0]);
  }, [language]);

  return (
    <section id="schedule" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {language === 'ro' 
              ? <>Orarul <span className="text-blue-500">Claselor</span></>
              : <>Class <span className="text-blue-500">Schedule</span></>
            }
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto whitespace-pre-line">
            {t("scheduleSubtitle")}
          </p>
        </motion.div>

        {/* Day selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                selectedDay === day
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule grid */}
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {selectedDay && schedule[selectedDay]?.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-16">
              <div className="rounded-xl p-8 border border-zinc-800 bg-zinc-900/50 text-center">
                <h4 className="text-white font-bold text-2xl mb-2">{t("closed")}</h4>
                <p className="text-gray-400">{t("noClasses")}</p>
              </div>
            </div>
          ) : selectedDay && schedule[selectedDay] ? (
            schedule[selectedDay].map((item, index) => (
            <motion.div
              key={`${item.time}-${item.class}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "rounded-xl p-5 border backdrop-blur-sm",
                classColors[item.class] || "bg-zinc-900/50 border-zinc-800"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-bold text-lg">{item.time}</span>
                </div>
                <div className="flex items-center gap-1 text-xs opacity-80">
                  <Users className="w-3 h-3" />
                  <span>{item.spots} {t("spotsAvailable")}</span>
                </div>
              </div>
              <h4 className="text-white font-bold text-xl mb-1">{item.class}</h4>
            </motion.div>
            ))
          ) : null}
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {Object.entries(classColors).map(([className, colors]) => (
            <div key={className} className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded-full", colors.split(' ')[0])} />
              <span className="text-gray-400 text-sm">{className}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative rounded-2xl px-6 py-4 text-center max-w-2xl w-full border border-sky-500/30 bg-sky-500/5">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-sky-500/10" />
            <p className="relative text-gray-300 text-base">
              {language === 'ro'
                ? 'Pentru a-ți rezerva locul la clasele de CrossFit sau sesiunile de Open Gym,'
                : 'To reserve your spot for CrossFit classes or Open Gym sessions,'
              }
              <br />
              <button
                onClick={() => document.getElementById('thunderwod-app')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-black text-sky-400 hover:text-white transition-all bg-sky-500/20 hover:bg-sky-500 px-2 py-0.5 rounded-md text-base inline-block mt-1"
              >
                {language === 'ro' ? '⚡ descarcă aplicația ThunderWOD' : '⚡ download the ThunderWOD app'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}