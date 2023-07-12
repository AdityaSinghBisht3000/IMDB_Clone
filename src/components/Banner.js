import React,{useState,useEffect} from 'react'
import Image from  '../Banner.jpg'
import axios from 'axios';

function Banner() {

  const[movie,setMovies]=useState({});

  useEffect(function(){
    axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=25f5aa0054b7833e917fe5ffd48793f9").then((res)=>

        {  setMovies(res.data.results[8])}
    )
  },[])

  return (
    <div className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] h-[40vh]  md:h-[60vh] bg-top bg-cover flex items-end justify-center`}>
     {/* <div className={`bg-[url(${Image})] h-[40vh]  md:h-[60vh] bg-center bg-cover flex items-end justify-center`}> */}
      <div className=' text-xl font-bold md:text-5xl text-white p-6 bg-gray-900 bg-opacity-50 w-full flex justify-center'>
        {movie.title}
        {/* Extraction  2  */}
      </div>
    </div>
  )
}

export default Banner
