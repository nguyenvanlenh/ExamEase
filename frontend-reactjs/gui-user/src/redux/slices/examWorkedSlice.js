import { createSlice } from '@reduxjs/toolkit';
import { examWorkedsLocalStorage } from '../../utils/localStorage';
import { formatTimeHMS } from '../../utils/utilsFunction';
import { formatdMYFromString } from '../../utils/common';

const initialState = examWorkedsLocalStorage.get() || [];
const examWorkedSlice = createSlice({
    name: 'examWorkeds',
    initialState,
    reducers: {
        addExamWorked(state, action) {
            action.payload.map((work) => {
                return state.push({
                    id: work.id,
                    title: work.title,
                    time: work.time,
                    timeDone: "Ngày làm bài: " + formatdMYFromString(work.workDay),
                    dateDone: "Thời gian hoàn thành: "+formatTimeHMS(work.completionTime) ,
                    result: "Kết quả: "+work.result
                  })
        })
        examWorkedsLocalStorage.save(state)
        },
        removexamWorked() {
            examWorkedsLocalStorage.remove()
            return []
        }
        
    }
})

export const { addExamWorked,  removexamWorked } = examWorkedSlice.actions
export default examWorkedSlice

