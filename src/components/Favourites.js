import React from 'react'

function Favourites() {
  return (
    < div className='mt-4 px-2 flex justify-center flex-wrap spcae-x-2 '>
    <button className=' m-2 text-lg p-2 px-2 bg-blue-400 text-white rounded-xl font-bold'>
      All Genres 
    </button>

    <button className=' m-2 text-lg p-2 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'>
      Action
    </button>


    
      <div> Genres Container </div>
      <div> Input Container </div>
      <div> Table Container </div>
      <div> Pagination </div>
    </div>
  )
}

export default Favourites
