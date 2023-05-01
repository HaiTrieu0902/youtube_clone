import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { useSelector } from 'react-redux/es/exports';
import { getHomePageVideos } from '../store/reducer/getHomePageVideos';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner';
import { HomePageVideos } from '../Type';
import Card from '../components/Card';
import { clearVideo } from '../store/youtube.slice';

const Home = () => {
    const dispatch = useAppDispatch();

    // const videos2 = useSelector((state: RootState) => state.youtubeApp.videos);
    const videos = useAppSelector((state) => state.youtubeApp.videos);

    useEffect(() => {
        return () => {
            dispatch(clearVideo());
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(getHomePageVideos(false));
        // console.log(videos);
    }, [dispatch]);

    return (
        <div className="max-h-screen overflow-hidden">
            <div style={{ height: '7.5vh' }} className="">
                <Navbar />
            </div>
            <div className="flex" style={{ height: '92.5vh' }}>
                <Sidebar />
                {videos.length ? (
                    <InfiniteScroll
                        dataLength={videos.length}
                        next={() => dispatch(getHomePageVideos(true))}
                        hasMore={videos.length < 500}
                        loader={<Spinner />}
                        height={650}
                    >
                        <div className="w-100 grid gap-y-16 gap-x-4 grid-cols-4 p-8 ">
                            {videos.map((item: HomePageVideos) => {
                                return <Card data={item} key={item.videoId} />;
                            })}
                        </div>
                    </InfiniteScroll>
                ) : (
                    <Spinner></Spinner>
                )}
            </div>
        </div>
    );
};

export default Home;
