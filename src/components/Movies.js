import React, { useState,useEffect } from 'react'
import Image from '../Banner.jpg'
import axios from 'axios'
import {  Oval } from 'react-loader-spinner'
import Pagination from './pagination'
import { BrowserRouter } from 'react-router-dom'


function Movies() {

  const [movies,setMovies]=useState([])

  const [pageNumber,setPage]=useState(1)

  const [hower,setHower]=useState('')

  const [favourites,setFavourites]=useState([])

    function goAhead()
    {
      setPage(pageNumber+1);
    }

    function goBehind()
    {
      if(pageNumber>1)
      {
        setPage(pageNumber-1);
      }
    }

  useEffect(function(){
    
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=25f5aa0054b7833e917fe5ffd48793f9&page=${pageNumber}`).then((res)=>
   { 
    console.log(pageNumber)
    setMovies(res.data.results)}
    )

  },[pageNumber])

  let add=(movie)=>{
      let newArray = [...favourites,movie]
      setFavourites([...newArray])
      console.log(newArray)
  }

  
  


  return (
    <div>
    <div className='mb-8'>
      <div className='mt-8 mb-8 font-bold text-2xl text-center'>
            Trending Movies
      </div>

    {
      movies.length == 0 ?
      <div className='flex justify-center'>
      <Oval
      height="100" width="100" color='grey' secondaryColor='grey' ariaLabel='loading' /> </div> :
    
      <div className='flex flex-wrap justify-center '>
        {

          movies.map(

            (movie)=>
          <div className={` bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] 
          md:h-[30vh] md:w-[250px] h-[25vh] w-[150px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 relative`} 
          onMouseEnter={()=>setHower(movie.id)} onMouseLeave={()=>setHower('')}>
          {
            hower==movie.id && 
            <>
            { favourites.find((m)=>m.id==movie.id)? 
            <div className='absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl bg-opacity-50 cursor-pointer ' onClick={()=>add(movie)}> ✔ </div> 
            :
            <div className='absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl bg-opacity-50 cursor-pointer ' onClick={()=>add(movie)}> 😍 </div>
              
          }
            </>
          }
              <div className='w-full bg-gray-900 text-white py-2 font-bold text-center text-xl rounded-b-xl'>
                { movie.title}
              </div>
          </div>
          
          )
          
          

        }            
           

            
      </div>
   }
    </div>
    <Pagination pageProp={pageNumber} goAhead={goAhead} goBehind={goBehind}/>
  </div>

  )
}

export default Movies
