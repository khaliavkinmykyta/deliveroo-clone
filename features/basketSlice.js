import { createAction, createSlice } from "@reduxjs/toolkit";
export const clearBasket = createAction("basket/clear");

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.docName === action.payload.docName
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.sumPrice += +action.payload.price.toFixed(2);
        console.log(existingItem.quantity, existingItem.sumPrice);
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
      const existingItemIndex = state.items.findIndex(
        (item) => item.docName === action.payload.docName
      );

      if (existingItemIndex !== -1) {
        console.log("Да, есть такой можно удалять");
        if (state.items[existingItemIndex].quantity > 1) {
          state.items[existingItemIndex].sumPrice -=
            +action.payload.price.toFixed(2);
          state.items[existingItemIndex].quantity -= 1;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
      } else {
        console.log("Такого нет!");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearBasket, (state) => {
      state.items = [];
    });
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, docName) => {
  const itemsWithDocName = state.basket.items.filter(
    (item) => item.docName === docName
  );
  if (itemsWithDocName.length > 0) {
    console.log(itemsWithDocName[0].quantity);
    return itemsWithDocName[0].quantity;
  } else {
    return 0;
  }
};

export const selectBasketTotalQuantity = (state) => {
  const basketItems = selectBasketItems(state);
  return basketItems.reduce(
    (totalQuantity, item) => totalQuantity + item.quantity,
    0
  );
};

export const selectBasketTotal = (state) => {
  const basketItems = selectBasketItems(state);
  return basketItems.reduce(
    (total, item) => total + parseFloat(item.sumPrice),
    0
  );
};

export const selectEmptyBasket = (state) => {
  return [];
};

export default basketSlice.reducer;
