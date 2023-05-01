import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import youtubeSlice from './store/youtube.slice';
import { useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
    reducer: {
        youtubeApp: youtubeSlice,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
