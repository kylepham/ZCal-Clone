const mergeIntervals = (intervals: Array<Array<Array<number>>>) => {
  const result = intervals.map((date) => {
    const mergedIntervals: Array<Array<number>> = [];
    const range = Array((24 * 60) / 5).fill(false);

    date.forEach((interval) => {
      if (interval[0] >= interval[2] && interval[1] >= interval[3])
        // ignore invalid intervals
        return;

      const l = Math.floor((interval[0] * 60) / 5) + Math.floor(interval[1] / 5);
      const r = Math.floor((interval[2] * 60) / 5) + Math.floor(interval[3] / 5);

      for (let i = l; i <= r; i++) range[i] = true;
    });

    const temp = [];
    for (let i = 0; i < range.length; i++)
      if (range[i] && (i === 0 || i === range.length - 1 || !range[i - 1] || !range[i + 1]))
        temp.push(...[Math.floor((i * 5) / 60), Math.floor((i * 5) % 60)]);

    while (temp.length) mergedIntervals.push(temp.splice(0, 4));

    return mergedIntervals;
  });

  return result;
};

export default mergeIntervals;
