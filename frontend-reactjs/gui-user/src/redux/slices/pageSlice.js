import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
   name: "utilSlice",
   initialState: 0,
   reducers: {
      setPage(state, action) {
         return state = action.payload
      },
      removePage() {
         return 0
      }
   }
})
export const { setPage, removePage } = pageSlice.actions
export default pageSlice;