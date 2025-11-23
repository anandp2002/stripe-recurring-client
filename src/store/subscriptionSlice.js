import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isPro: false,
    subscriptionStatus: null,
    loading: false,
    error: null,
};

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        setSubscriptionStatus: (state, action) => {
            state.isPro = action.payload.isPro;
            state.subscriptionStatus = action.payload.subscriptionStatus;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setSubscriptionStatus, setLoading, setError } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
