import React, { useEffect, useState } from 'react'
import Pagination from './pagination'

function Favourites() {

  let genreids={
    28: 'Action',12:'Adventure', 16:'Animation',35:'Comedy',
    80: 'Crime', 99: 'Documentary', 18:'Drama', 10751:'Family', 14:'Fantasy',
    36:'History', 27:'Horror', 10402:'Music',9648:'Mystery',
    10749:'Romance', 878:'Sci-Fi', 10770:'TV', 53:'Thriller', 10752:'War',37:'Western' 
  }

  const [curGenre,setCurGenre]=useState('All Genres')
 
  const [Favourites,setFavourites]=useState([])

  const [genres,setGenres]=useState([])

  const [rating,setRating] =useState(0)

  const [popularity,setPopularity] =useState(0)

  const [search,setSearch] =useState("")

  const [rows,setRows]=useState(5)

  const [page,setPage]=useState(1)

// local Storage
  useEffect(()=>{
    let oldFav=localStorage.getItem("imdb");
    oldFav=JSON.parse(oldFav)||[]
    setFavourites([...oldFav])
  },[])

// genres for blue/grey buttons

useEffect(()=>{
 let temp = Favourites.map((movie)=>   genreids[movie.genre_ids[0]])
temp=new Set(temp)
 setGenres(["All Genres",...temp])
},[Favourites])

  let del=(movie)=>{
    let newArray=Favourites.filter((m)=>m.id!=movie.id)
    setFavourites([...newArray])
    localStorage.setItem("imdb",JSON.stringify(newArray))

  }

  let filterMovies=[]

  filterMovies= curGenre == "All Genres" ? Favourites:
  Favourites.filter((movie)=>genreids[movie.genre_ids[0]]==curGenre)
   
  if(rating == -1)
  {
    filterMovies = filterMovies.sort(function(objA,objB)
    {
      return objA.vote_average - objB.vote_average
    })
  }else if(rating==1)
  {
    filterMovies = filterMovies.sort(function(objA,objB)
    {
      return objB.vote_average - objA.vote_average
    })
  }

  if(popularity == -1)
  {
    filterMovies =filterMovies.sort(function(objA,objB){
      return objA.popularity-objB.popularity
    })
  }
  else if(popularity == 1)
  {
    filterMovies =filterMovies.sort(function(objA,objB){
      return objB.popularity-objA.popularity
    })
  }

  // searching

  filterMovies=filterMovies.filter((movie)=>
   movie.title.toLowerCase().includes(search.toLocaleLowerCase())
  )

// pagination

 let maxPage=Math.ceil(filterMovies.length/rows)
 let si=(page-1)*rows
 let ei=Number(si)+Number(rows)

 filterMovies=filterMovies.slice(si,ei)

 let goBehind=()=>{
  if(page>1)
  setPage(page-1)
 }

 let goAhead=()=>{
  if(page<maxPage)
  setPage(page+1)
 }

  return (
    < div className='mt-4 px-2 flex flex-col justify-center flex-wrap space-x-2 '>
      <div className='px-4 py-4 mb-3'>
        {
          genres.map((genre)=>
           <button className={ curGenre==genre || genre=='All Genres'? ' m-2 text-lg p-2 px-2 bg-blue-400 text-white rounded-xl font-bold' : 'm-2 text-lg p-2 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'  } onClick={()=> {setPage(1) 
           setCurGenre(genre)}}>
          {genre} 
         </button>
          )
        }
    </div>

    <div className='text-center mb-4'>
      <input type="text" placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)} className='border-4 text-center p-1 m-2' />
      <input type='number' placeholder='Rows' value={rows} onChange={(e)=>setRows(e.target.value)} className='border-4 text-center p-1 m-2' />
    </div>

    <div className='flex flex-col m-4'>
    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
      <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
      <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>

        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50 min-w-full'>
            <tr>
              <th scope='col' className='text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Name
              </th>
              <th scope='col' className='text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                <div className='flex'>
                  <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" className='mr-2 cursor-pointer' onClick={()=>{setPopularity(0)
                   setRating(1)}}/>
                Rating
                <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" className='ml-2 mr-2 cursor-pointer' onClick={()=>{setPopularity(0) 
                 setRating(-1)}}/>

                </div>
              </th>
              <th scope='col' className='text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              <div className='flex'>
                  <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" className='mr-2 cursor-pointer'onClick={()=>{setRating(0) 
                   setPopularity(1)}}/>
                Popularity
                <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" className='ml-2 mr-2 cursor-pointer' onClick={()=>{ setRating(0) 
                 setPopularity(-1)}}/>

                </div>
                </th>
              <th scope='col' className='text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Genre
              </th>
              <th scope='col' className='text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Remove
              </th>
              
            </tr>

          </thead>

          <tbody className='bg-white divide-y divide-gray-200'>
            {
              filterMovies.map((movie)=>(
              <tr key={movie.id}>
                <td className='px-6 py-4 whitespace-nowrap '>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 md:h-[100px] md:w-[180px]'>
                      <img className='hidden md:block md:h-[100px] md:w-[180px]' src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt='image' />

                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900 font-bold'>
                          {movie.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap  '>{movie.vote_average}</td>
                <td className='px-6 py-4 whitespace-nowrap '>{movie.popularity}</td>
                <td className='px-6 py-4 whitespace-nowrap '>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                  {genreids[movie.genre_ids[0]]}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-center'>
                  <button href="#" className='text-red-600 hover:text-red-900' onClick={()=>del(movie)}> Delete</button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>


      </div>
      </div>
      </div>
      </div>


      <div className='mt-4'><Pagination pageProp={page} goBehind={goBehind} goAhead={goAhead}/></div>
    </div>
  )
}

export default Favourites
