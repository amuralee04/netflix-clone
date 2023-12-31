import axios from './axios-config.js';
import React, { useEffect, useState } from 'react';
import './Banner.css';
import requests from './requests';


function Banner() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    console.log(movie);

  return (
    <header 
     className='banner' 
     style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
    }}
    >
        <div className='banner__contents'>
            <h1 className='banner__title'>
                {movie?.name || movie?.title || movie?.original_name}
            </h1>
            <div className='banner__buttons'>
                <button className='banner__button'>Play</button>
                <button className='banner__button'>My List</button>
            </div>
            <h1 className='banner__description'>
                {truncate(`${movie?.overview}`, 150)}
            </h1>
        </div>

        <div className='banner--fadeBottom'/>
    </header>
  )
}

export default Banner;
