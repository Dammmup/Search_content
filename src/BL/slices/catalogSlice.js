import { createSlice } from "@reduxjs/toolkit";
import { data } from "../DB";

const initialState = {
  pizzas: data,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    changeCategory: (state = initialState, action) => {
      if (action.payload === "Все") {
        state.pizzas = data;
      } else {
        const result = data.filter((elem) => elem.category === action.payload);
        state.pizzas = result;
      }
    },
    sortPizza: (state = initialState, action) => {
      if (action.payload === "name") {
        const result = state.pizzas.sort((a, b) => (a.name > b.name ? 1 : -1));
        state.pizzas = result;
      }
      if (action.payload === "price") {
        const result = state.pizzas.sort((a, b) =>
          a.type.find((elem) => elem.isSelect) <
          b.type.find((elem) => elem.isSelect)
            ? 1
            : -1
        );
        state.pizzas = result;
      }
    },
  },
});

export const { changeCategory, sortPizza } = catalogSlice.actions;

export default catalogSlice.reducer;
