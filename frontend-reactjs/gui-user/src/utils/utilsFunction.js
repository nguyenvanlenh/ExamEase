export const formatTimeMS = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export const formatTimeHMS = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
};

export const calculateDurationInSeconds = (beginExam, endExam) => {
  const beginDate = new Date(beginExam);
  const endDate = new Date(endExam);
  const durationInMilliseconds = endDate - beginDate;
  const durationInSeconds = Math.round(durationInMilliseconds / 1000);
  return durationInSeconds;
};

export const totalMins = (secs) => {
  return Math.round(secs / 60);
};
