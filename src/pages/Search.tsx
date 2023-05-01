import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAppDispatch, useAppSelector } from '../store';
import { getHomePageVideos } from '../store/reducer/getHomePageVideos';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner';
import { HomePageVideos } from '../Type';
import { clearVideo } from '../store/youtube.slice';
import { useNavigate } from 'react-router-dom';
import { getSearchPageVideos } from '../store/reducer/getSearchPageVideos';
import SearchCard from '../components/SearchCard';

const Search = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const videos = useAppSelector((state) => state.youtubeApp.videos);
    const searchItem = useAppSelector((state) => state.youtubeApp.searchItem);

    useEffect(() => {
        dispatch(clearVideo());
        if (searchItem === '') {
            navigate('/');
        } else {
            dispatch(getSearchPageVideos(false));
        }
        return () => {
            dispatch(clearVideo());
        };
    }, [dispatch, navigate, searchItem]);

    useEffect(() => {
        dispatch(getHomePageVideos(false));
        // console.log(videos);
    }, [dispatch]);

    return (
        <div className="max-h-screen overflow-hidden">
            <div style={{ height: '7.5vh' }} className="">
                <Navbar />
            </div>
            <div className="flex " style={{ height: '92.5vh' }}>
                <Sidebar />
                {videos.length ? (
                    <div className="py-8 pl-8 flex flex-col gap-5  w-full">
                        <InfiniteScroll
                            dataLength={videos.length}
                            next={() => dispatch(getHomePageVideos(true))}
                            hasMore={videos.length < 500}
                            loader={<Spinner />}
                            height={650}
                        >
                            {videos.map((item: HomePageVideos) => {
                                return (
                                    <div className="mt-5 ml-32">
                                        <SearchCard data={item} key={item.videoId} />
                                    </div>
                                );
                            })}
                        </InfiniteScroll>
                    </div>
                ) : (
                    <Spinner></Spinner>
                )}
            </div>
        </div>
    );
};

export default Search;
