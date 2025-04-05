import { createSlice } from "@reduxjs/toolkit";

const apiLimitSlice = createSlice({
  name: "apiLimit",
  initialState: { count: 0 } as { count: number },
  reducers: {
    setApiLimitCount: (state, { payload }: { payload: number }) => {
      state.count = payload;
    },
  },
});

export const { setApiLimitCount } = apiLimitSlice.actions;
export default apiLimitSlice.reducer;
