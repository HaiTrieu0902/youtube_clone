import React from 'react';
import { Link } from 'react-router-dom';
import { HomePageVideos } from '../Type';

interface videoTypeItems {
    data: HomePageVideos;
}
const SearchCard = ({ data }: videoTypeItems) => {
    const isData = data ? true : false;
    return (
        <div className="flex gap-3">
            <div className="relative">
                <span className="absolute bottom-3 right-3 text-xs font-medium rounded-md bg-gray-900 px-1 py-0.5 z-10">
                    {data.videoDuration}
                </span>
                <Link to={`/watch/${data.videoId}`}>
                    <img src={data.videoThumbnail} className="w-100 rounded-lg" alt="thumbnail" />
                </Link>{' '}
            </div>
            <div className="flex gap-1 flex-col">
                <h3 className="max-w-2xl">
                    <a href="" className="line-clamp-2">
                        {data.videoTitle}
                    </a>
                </h3>
                <div className="text-xs text-gray-400">
                    <div>
                        <div>
                            <a href="" className="hover:text-white">
                                {data.channelInfo.name}
                            </a>
                        </div>
                        <div>
                            <span className='after:content-["."] after:mx-1'>{data.videoViews} Views</span>
                            <span className="mt-2">{data.videoAge}</span>
                        </div>
                    </div>
                </div>
                <div className="min-w-fit my-2">
                    <a href="" className="flex  items-center gap-2 text-sm  text-gray-400">
                        <img src={data.channelInfo.image} alt="Chanel" className="h-9 w-9 rounded-full" />
                        <span>{data.channelInfo.name}</span>
                    </a>
                </div>
                <div className="max-w-2xl line-clamp-2 text-sm  text-gray-400">{data.videoDescription}</div>
            </div>
        </div>
    );
};

export default SearchCard;
