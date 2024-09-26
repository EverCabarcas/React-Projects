import { create } from "zustand";

export const usePostStoreZustand = create((set)=> ({
    posts: [],
    isFetching: false,
    addPost: (item) => set((state) => ({ posts: [...state.posts, item]})),
    setAllPost: (items) => set({posts: items}),
    setIsFetching: (value) => set({isFetching: value})
}))

export const useStore = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
  }))