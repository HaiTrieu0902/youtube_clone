import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import axios from 'axios';
import { YOUTUBE_API_URL } from '../../utils/constants';
import { parseData } from '../../utils';
import { HomePageVideos } from '../../Type';

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
    'youtubeApp/SearchPageVideos',
    async (isNext: boolean, { getState }) => {
        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchItem },
        } = getState() as RootState;

        const {
            data: { items, nextPageToken },
        } = await axios.get(
            `${YOUTUBE_API_URL}/search?maxResults=20&q=${searchItem}&key=${API_KEY}&part=snippet&type=video${
                isNext ? `pageToken=${nextPageTokenFromState}` : ''
            }`,
        );
        const parsedData: HomePageVideos[] = await parseData(items);
        return { parsedData: [...videos, ...parsedData], nextPageToken };
    },
);