import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  name: string;
  country: string;
  countryFlag: string;
  photo: string;
  nickname: string;
  totalEarnings: number;
}

const initialState: IState = {
  name: "",
  country: "",
  countryFlag: "",
  photo: "",
  nickname: "",
  totalEarnings: 0,
};

export const addPlayerSlice = createSlice({
  name: "newPlayer",
  initialState,
  reducers: {
    setPlayer(state, action: PayloadAction<IState>) {
      state.name = action.payload.name;
      state.country = action.payload.country;
      state.countryFlag = action.payload.countryFlag;
      state.photo = action.payload.photo;
      state.nickname = action.payload.nickname;
      state.totalEarnings = action.payload.totalEarnings;
    },
    resetPlayer(state) {
      state.name = "";
      state.country = "";
      state.countryFlag = "";
      state.photo = "";
      state.nickname = "";
      state.totalEarnings = 0;
    },
  },
});

export const { setPlayer, resetPlayer } = addPlayerSlice.actions;
export default addPlayerSlice.reducer;
