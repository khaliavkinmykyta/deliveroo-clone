import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        console.log("Object with this id already exists in the array.");

        existingItem.quantity += 1;
        existingItem.sumPrice += +action.payload.price;
        console.log(existingItem.quantity, existingItem.sumPrice);
        // state.items = [...state.items, existingItem];
      } else {
        console.log("New object added to the array.");
        state.items = [
          ...state.items,
          { ...action.payload, quantity: 1, sumPrice: +action.payload.price },
        ];
        console.log("state");

        console.log(state.items);
      }
    },
    removeFromBasket: (state, action) => {
      console.log(action.payload);
      console.log("-----");
      console.log(state.items);
      console.log("-----");

      const index = state.items.findIndex((item) => item.id === action.payload);
      let newBasket = [...state.items];
      if (index > 0) {
        newBasket.splice(index, 1);
      } else {
        console.log("We don't have this id: " + index);
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotalQuantity = (state) => {
  const basketItems = selectBasketItems(state);
  return basketItems.reduce(
    (totalQuantity, item) => totalQuantity + item.quantity,
    0
  );
};

export const selectBasketTotal = (state) => {
  const basketItems = selectBasketItems(state);
  return basketItems.reduce((total, item) => total + parseFloat(item.sumPrice), 0);
};


export default basketSlice.reducer;
