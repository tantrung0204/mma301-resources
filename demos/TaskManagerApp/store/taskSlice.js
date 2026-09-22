import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, done: false });
    },
    toggle: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) task.done = !task.done;
    },
    remove: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index > -1) state.splice(index, 1);
    },
  },
});

export const { add, toggle, remove } = taskSlice.actions;
export default taskSlice.reducer;
