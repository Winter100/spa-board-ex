import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BoardItem = {
  board: [],
  status: "",
};

const url =
  "https://react-spa-board-default-rtdb.firebaseio.com/boarditem.json";

const asyncGetItemList = createAsyncThunk(
  "getItem/asyncGetItemList",
  async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
);

const asyncPostItemList = createAsyncThunk(
  "postItem/asyncPostItemList",
  async (item) => {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id: item.id,
        title: item.title,
        created: item.created,
        contents: item.contents,
        password: item.password,
        author: item.author,
      }),
    });
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
    builder.addCase(asyncPostItemList.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(asyncPostItemList.fulfilled, (state, action) => {
      state.status = "Complete";
    });
    builder.addCase(asyncPostItemList.rejected, (state, action) => {
      state.status = "Faild";
    });
  },
});

export const boardActions = boardItemSlice.actions;
export { asyncGetItemList, asyncPostItemList };

export default boardItemSlice;
