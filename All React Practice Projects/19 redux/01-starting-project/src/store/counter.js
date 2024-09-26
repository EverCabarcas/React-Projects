import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: false };
export const counterSlice = createSlice({
    name: "counter",
    initialState: initialCounterState,
    reducers: {
      increment(state, action) {
        state.counter++;
      },
  
      decrement(state, action) {
        state.counter--;
      },
  
      increase(state, action) {
        state.counter = state.counter + action.payload;
      },
      toggle(state, action) {
        state.showCounter = !state.showCounter;
      },
    },
  });

  // const counterReducer = (state = initialState, action) => {
//   if (action.type === "increment") {
//     return {
//       ...state,
//       counter: state.counter + 1,
//     };
//   }

//   if (action.type === "decrement") {
//     return {
//       ...state,
//       counter: state.counter - 1,
//     };
//   }

//   if (action.type === "toggle") {
//     return {
//       ...state,
//       showCounter: !state.showCounter,
//     };
//   }

//   return state;
// };
  export default counterSlice.reducer;
  export const counterActions = counterSlice.actions;