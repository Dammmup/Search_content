import { createSlice } from "@reduxjs/toolkit";
// import { data } from "../DB";

const initialState = {
  pizzas: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    removeOneOrder: (state) => {
        const updatedPizzas = state.pizzas.filter(pizza => !state.selectedPizzaCount[pizza.id]);
        state.pizzas = updatedPizzas;
      },
      
      removeAll: (state) => {
        state.pizzas = [];
        state.selectedPizzaCount = {};
      },
      
      addOnePizza: (state, action) => {
        const pizzaId = action.payload;
        if (state.selectedPizzaCount[pizzaId]) {
          state.selectedPizzaCount[pizzaId]++;
        } else {
          state.selectedPizzaCount[pizzaId] = 1;
        }
      },
      
      removeOnePizza: (state, action) => {
        const pizzaId = action.payload;
        if (state.selectedPizzaCount[pizzaId]) {
          if (state.selectedPizzaCount[pizzaId] > 1) {
            state.selectedPizzaCount[pizzaId]--;
          } else {
            delete state.selectedPizzaCount[pizzaId];
          }
        }
      },
      
    setPizzaCount: (state, action) => {
      const { pizzaId, count } = action.payload;
      state.selectedPizzaCount[pizzaId] = count;
    },
  },
});

export const {
  removeOneOrder,
  removeAll,
  addOnePizza,
  removeOnePizza,
  setPizzaCount,
} = basketSlice.actions;

export default basketSlice.reducer;
