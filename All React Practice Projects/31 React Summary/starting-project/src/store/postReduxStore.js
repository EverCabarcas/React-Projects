import { configureStore, createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: []
},
  reducers: {
    addPost(state, {payload}) {
        state.posts.push(payload)
    },
  },
});

const otherSlice = createSlice({
    name: 'other',
    initialState: {
        other: ['jelou']
    },
    reducers: {
        addOther(state, {payload}){
            state
        }
    }
})

export const postSliceActions = postSlice.actions;

export const { addOther } = otherSlice.actions

export const postStore = configureStore({
  reducer: {post: postSlice.reducer, other: otherSlice.reducer},
});
