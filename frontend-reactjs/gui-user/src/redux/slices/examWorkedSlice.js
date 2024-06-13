import { createSlice } from '@reduxjs/toolkit';
import { examWorkedsLocalStorage } from '../../utils/localStorage';
import { formatTimeHMS, totalMins } from '../../utils/utilsFunction';
import { formatdMYFromString } from '../../utils/common';

const initialState = examWorkedsLocalStorage.get() || [];
const examWorkedSlice = createSlice({
  name: 'examWorkeds',
  initialState,
  reducers: {
    addExamWorked(state, action) {
      action.payload.forEach((work) => {
        const exists = state.find(item => item.id === work.id);
        if (!exists) {
          state.push({
            id: work.id,
            idExamNumber: work.idExamNumber,
            title: work.title,
            time: work.time,
            timeDone: "Ngày làm bài: " + formatdMYFromString(work.workDay),
            dateDone: "Thời gian hoàn thành: " + formatTimeHMS(work.completionTime),
            result: "Kết quả: " + work.result,
            completionTimeHandle: work.completionTime,
            resultHandle: work.result,
            workDayHanle: formatdMYFromString(work.workDay)
          });
        }
      });
      examWorkedsLocalStorage.save(state);
    },
    removexamWorked() {
      examWorkedsLocalStorage.remove();
      return [];
    }
  }
});

export const selectTotalTimeSpent = (state) => {
  return totalMins(state.examWorkeds.reduce((total, work) => work.completionTimeHandle + total, 0));
};

export const totalExams = (state) => {
  return state.examWorkeds.length;
};

export const resultBest = (state) => {
  if (state.examWorkeds.length === 0) return null;

  const bestResult = state.examWorkeds.reduce((best, work) => {
    const [bestNumerator, bestDenominator] = best.resultHandle.split('/').map(Number);
    const [currentNumerator, currentDenominator] = work.resultHandle.split('/').map(Number);

    const bestFraction = bestNumerator / bestDenominator;
    const currentFraction = currentNumerator / currentDenominator;

    return currentFraction > bestFraction ? work : best;
  });

  return bestResult.resultHandle;
};

export const { addExamWorked, removexamWorked } = examWorkedSlice.actions;
export default examWorkedSlice;
