// src/timeStore.ts
import { writable } from "svelte/store";

interface Age {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function createTimeStore() {
  const birthDate = new Date(1980, 5, 27, 0, 25, 0); // Month is 0-indexed, so June is 5
  const { subscribe, set } = writable<string>(getCurrentAgeSentence());

  function getCurrentAge(): Age {
    const now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    let hours = now.getHours() - birthDate.getHours();
    let minutes = now.getMinutes() - birthDate.getMinutes();
    let seconds = now.getSeconds() - birthDate.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    return {
      years,
      months,
      weeks: Math.floor(days / 7),
      days: days % 7,
      hours,
      minutes,
      seconds
    };
  }

  function formatAge(age: Age): string {
    const units = [
      { value: age.years, unit: "year" },
      { value: age.months, unit: "month" },
      { value: age.weeks, unit: "week" },
      { value: age.days, unit: "day" },
      { value: age.hours, unit: "hour" },
      { value: age.minutes, unit: "minute" },
      { value: age.seconds, unit: "second" }
    ];

    const nonZeroUnits = units.filter((unit) => unit.value !== 0);
    return nonZeroUnits
      .map((unit, index, array) => {
        const isLast = index === array.length - 1;
        const isSecondLast = index === array.length - 2;
        const unitString = `${unit.value} ${unit.unit}${unit.value !== 1 ? "s" : ""}`;
        if (isLast) return `and ${unitString}`;
        if (isSecondLast) return `${unitString} `;
        return `${unitString}, `;
      })
      .join("")
      .trim();
  }

  function getCurrentAgeSentence(): string {
    return formatAge(getCurrentAge());
  }

  function updateTime() {
    set(getCurrentAgeSentence());
  }

  const interval = setInterval(updateTime, 1000);

  return {
    subscribe,
    stop: () => clearInterval(interval)
  };
}

export const timeStore = createTimeStore();
