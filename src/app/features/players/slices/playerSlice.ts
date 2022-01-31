import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../interfaces/IPlayer";

interface IState {
  items: IPlayer[] | [];
  player: IPlayer[] | [];
  userId: number;
  filter: string;
}

const initialState: IState = {
  items: [],
  player: [],
  userId: 0,
  filter: "",
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
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    resetUserId(state) {
      state.userId = 0;
    },
  },
});

export const { setPlayers, setPlayer, setUserId, resetUserId, setFilter } =
  playerSlice.actions;
export default playerSlice.reducer;
