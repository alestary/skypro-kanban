import { useState, useEffect } from "react";
import {
  CalendarWrapper,
  CalendarBlock,
  CalendarMonth,
  CalendarContent,
  CalendarDaysNames,
  CalendarDayName,
  CalendarCells,
  CalendarCell,
  CalendarNavActions,
  CalendarNavButton,
} from "./Calendar.styled";

const dayNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;

  const days = [];

  for (let i = 0; i < startOffset; i += 1) {
    days.push({
      day: "",
      otherMonth: true,
      key: `empty-${i}`,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({
      day,
      otherMonth: false,
      key: `day-${day}`,
    });
  }

  while (days.length < 35) {
    days.push({
      day: "",
      otherMonth: true,
      key: `empty-end-${days.length}`,
    });
  }

  return days;
}

function Calendar({ selectedDate, onDateSelect }) {
  const today = new Date();

  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [internalSelectedDate, setInternalSelectedDate] = useState(
    selectedDate instanceof Date &&
      !Number.isNaN(selectedDate.getTime())
      ? selectedDate
      : null
  );

  useEffect(() => {
    const validDate =
      selectedDate instanceof Date &&
      !Number.isNaN(selectedDate.getTime());

    setInternalSelectedDate(validDate ? selectedDate : null);

    if (validDate) {
      setVisibleMonth(
        new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          1
        )
      );
    }
  }, [selectedDate]);

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const days = getCalendarDays(year, month);

  function changeMonth(offset) {
    setVisibleMonth(new Date(year, month + offset, 1));
  }

  function selectDay(day) {
    if (!day) return;

    const date = new Date(year, month, day);

    setInternalSelectedDate(date);
    onDateSelect?.(date);
  }

  return (
    <CalendarWrapper>
      <CalendarBlock>
        <CalendarContent>
          <CalendarMonth>
            <span>
              {monthNames[month]} {year}
            </span>

            <CalendarNavActions>
              <CalendarNavButton
                type="button"
                aria-label="Предыдущий месяц"
                onClick={() => changeMonth(-1)}
              >
                <svg viewBox="0 0 10 10" aria-hidden="true">
                  <path d="M7 1 3 5l4 4-1 1-5-5 5-5z" />
                </svg>
              </CalendarNavButton>

              <CalendarNavButton
                type="button"
                aria-label="Следующий месяц"
                onClick={() => changeMonth(1)}
              >
                <svg viewBox="0 0 10 10" aria-hidden="true">
                  <path d="m3 1 1-1 5 5-5 5-1-1 4-4z" />
                </svg>
              </CalendarNavButton>
            </CalendarNavActions>
          </CalendarMonth>

          <CalendarDaysNames>
            {dayNames.map((day) => (
              <CalendarDayName key={day}>
                {day}
              </CalendarDayName>
            ))}
          </CalendarDaysNames>

          <CalendarCells>
            {days.map((item) => {
              const isActive =
                item.day !== "" &&
                internalSelectedDate &&
                internalSelectedDate.getFullYear() === year &&
                internalSelectedDate.getMonth() === month &&
                internalSelectedDate.getDate() === item.day;

              return (
                <CalendarCell
                  key={item.key}
                  type="button"
                  $active={Boolean(isActive)}
                  $otherMonth={item.otherMonth}
                  disabled={item.otherMonth}
                  onClick={() => selectDay(item.day)}
                  aria-label={
                    item.day
                      ? `Выбрать ${item.day} число`
                      : undefined
                  }
                >
                  {item.day}
                </CalendarCell>
              );
            })}
          </CalendarCells>
        </CalendarContent>
      </CalendarBlock>
    </CalendarWrapper>
  );
}

export default Calendar;