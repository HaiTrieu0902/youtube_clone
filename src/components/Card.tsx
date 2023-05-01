import React from 'react';
import { HomePageVideos } from '../Type';
import { Link } from 'react-router-dom';

interface videoTypeItems {
    data: HomePageVideos;
}

const Card = ({ data }: videoTypeItems) => {
    const isData = data ? true : false;
    return (
        <div className="w-72 h-60 flex gap-1 flex-col">
            <div className="relative">
                <span className="absolute bottom-3 right-3 text-xs font-medium rounded-md bg-gray-900 px-1 py-0.5 z-10">
                    {data.videoDuration}
                </span>
                <Link to={`/watch/${data.videoId}`}>
                    <img src={data.videoThumbnail} className="w-100 rounded-lg" alt="thumbnail" />
                </Link>
            </div>

            <div className="mt-2 flex gap-2">
                <div className="min-w-fit">
                    <a href="#">
                        <img src={data.channelInfo.image} alt="Chanel" className="h-8 w-8 rounded-full" />
                    </a>
                </div>
                <div>
                    <h3>
                        <a href="" className="line-clamp-2 font-medium text-sm">
                            {data.videoTitle}
                        </a>
                    </h3>
                    <div className="text-xs mt-1 text-gray-400">
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
            </div>
        </div>
    );
};

export default Card;
