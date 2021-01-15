import create from 'zustand';

const useStore = create((set) => ({
  items: 0,
  totalAmount: 0,
  basketItems: [],
  addToBasket: (item) =>
    set((state) => ({
      items: state.items + 1,
      totalAmount: state.totalAmount + item.Price,
      basketItems: [...state.basketItems, item],
    })),
  removeItemFromBasket: (item) =>
    set((state) => ({
      items: state.items - 1,
      totalAmount: state.totalAmount - item.Price,
      basketItems: state.basketItems.filter((x) => x.Id !== item.Id),
    })),
}));

export default useStore;
