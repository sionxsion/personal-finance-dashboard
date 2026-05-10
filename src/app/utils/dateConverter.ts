export const toMonthKey = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export const timelineGenerator = (initialDate: Date): string[] => {
  const now = new Date();

  const current = new Date(initialDate);

  const timeline: string[] = [];

  while (current <= now) {
    const y = current.getFullYear();
    const m = String(current.getMonth() + 1).padStart(2, '0');

    timeline.push(`${y}-${m}`);

    current.setMonth(current.getMonth() + 1);
  }

  return timeline;
};

export const getLastMonths = (count: number) => {
  const currentDate = new Date();

  const fullTimeline: string[] = [];

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - i);
    const month = toMonthKey(d);
    fullTimeline.push(month);
  }

  return fullTimeline;
};

export const stringToDate = (date: string): Date => {
  const [year, month, day] = date.split('-');
  return new Date(+year, +month - 1, +day);
};
