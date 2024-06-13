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

export const { addExamWorked, removexamWorked } = examWorkedSlice.actions;
export default examWorkedSlice;
