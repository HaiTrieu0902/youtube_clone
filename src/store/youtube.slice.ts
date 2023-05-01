import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from '../Type';
import { getHomePageVideos } from './reducer/getHomePageVideos';
import { getSearchPageVideos } from './reducer/getSearchPageVideos';

import { getRecommendedVideos } from './reducer/getRecommnendVideos';
import { getVideoDetails } from './reducer/getVideosDetails';

const initialState: InitialState = {
    videos: [],
    currentPlaying: null,
    searchItem: '',
    SearchResults: [],
    nextPageToken: null,
    recommendedVideos: [],
};

const youtubeSlice = createSlice({
    name: 'youtubes',
    initialState,
    reducers: {
        clearVideo: (state) => {
            state.videos = [];
            state.nextPageToken = null;
        },
        changeSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchItem = action.payload;
        },
        clearSearchTerm: (state) => {
            state.searchItem = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomePageVideos.fulfilled, (state, action) => {
                state.videos = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
            })
            .addCase(getSearchPageVideos.fulfilled, (state, action) => {
                state.videos = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
            })

            .addCase(getVideoDetails.fulfilled, (state, action) => {
                state.currentPlaying = action.payload;
            })
            .addCase(getRecommendedVideos.fulfilled, (state, action) => {
                state.recommendedVideos = action.payload.parsedData;
            });
    },
});

export const { clearVideo, clearSearchTerm, changeSearchTerm } = youtubeSlice.actions;

export default youtubeSlice.reducer;
