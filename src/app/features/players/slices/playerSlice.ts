import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../interfaces/IPlayer";

interface IState {
  items: IPlayer[] | [];
}

const initialState: IState = {
  items: [],
};

export const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<IPlayer[]>) {
      state.items = action.payload;
    },
  },
});

export const { setPlayers } = playerSlice.actions;
export default playerSlice.reducer;
