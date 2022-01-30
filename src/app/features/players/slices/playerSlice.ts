import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../interfaces/IPlayer";

interface IState {
  items: IPlayer[] | [];
  player: IPlayer[] | [];
  userId: number;
}

const initialState: IState = {
  items: [],
  player: [],
  userId: 0,
};

export const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<IPlayer[]>) {
      state.items = action.payload;
    },
    setPlayer(state, action: PayloadAction<IPlayer[]>) {
      state.player = action.payload;
    },
    setUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
    resetUserId(state) {
      state.userId = 0;
    },
  },
});

export const { setPlayers, setPlayer, setUserId, resetUserId } =
  playerSlice.actions;
export default playerSlice.reducer;
