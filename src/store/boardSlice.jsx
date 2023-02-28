import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUrl } from "../url";

const BoardItem = {
  board: [],
  status: "",
};

const url = getUrl;

const asyncGetItemList = createAsyncThunk(
  "getItem/asyncGetItemList",
  async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
);

const boardItemSlice = createSlice({
  name: "board",
  initialState: BoardItem,
  reducers: {
    setItem(state, action) {
      state.board.push(action.payload);
    },
    removerItem(state, action) {
      state.board = state.board.filter((item) => item.id !== action.payload);
    },
    editItem(state, action) {
      state.board = state.board.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(asyncGetItemList.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(asyncGetItemList.fulfilled, (state, action) => {
      state.status = "Complete";
      for (const key in action.payload) {
        const item = action.payload[key];
        item.key = key;
        state.board.push(item);
      }
    });
    builder.addCase(asyncGetItemList.rejected, (state, action) => {
      state.status = "Faild";
    });
  },
});

export const boardActions = boardItemSlice.actions;
export { asyncGetItemList };

export default boardItemSlice;
