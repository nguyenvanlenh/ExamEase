// selectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectTotalTimeSpent = createSelector(
  state => state.examWorkeds,
  examWorkeds => {
    const totalTime = examWorkeds.reduce((total, work) => total + work.completionTimeHandle, 0);
    return Math.floor(totalTime / 60) + " giờ " + (totalTime % 60) + " phút";
  }
);

export const totalExams = createSelector(
  state => state.examWorkeds,
  examWorkeds => examWorkeds.length
);

export const resultBest = createSelector(
  state => state.examWorkeds,
  examWorkeds => {
    if (examWorkeds.length === 0) return null;

    const bestResult = examWorkeds.reduce((best, work) => {
      const [bestNumerator, bestDenominator] = best.resultHandle.split('/').map(Number);
      const [currentNumerator, currentDenominator] = work.resultHandle.split('/').map(Number);

      const bestFraction = bestNumerator / bestDenominator;
      const currentFraction = currentNumerator / currentDenominator;

      return currentFraction > bestFraction ? work : best;
    });

    return bestResult.resultHandle;
  }
);

export const selectPagedExams = (state, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return state.examWorkeds.slice(startIndex, endIndex);
  };
