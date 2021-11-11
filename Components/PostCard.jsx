import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'

const PostCard = ({ data: { node }}) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
        <div className="relative overflow-hidden shadow-md pb-80 mb-6">
            <img 
            src={node.url}
            alt={node.title}
            className='object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'
            />
        </div>
        <h1 className='transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold'>
            <Link href = {`/post/${node.slug}`}>
              八重樱·桃源恋歌 天穹市天穹殿下身穿旗袍的八重樱在此起舞~
            </Link>
        </h1>
        <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
           <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
             <img src={node.url} alt={node.title} width='30px' height='30px' className='rounded-full align-middle'/>
              <p className='inline align-middle text-gray-700 ml-2 text-lg'>{node.author.name}</p>
           </div>
           <div className="font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className='align-middle'>2021</span>
           </div>
        </div>
        <p className="text-center text-lg text-gray-700 font-noraml px-4 lg:px-20 mb-8">
            八重樱·桃源恋歌 天穹市天穹殿下身穿旗袍的八重樱在此起舞~
        </p>
        <div className="text-center">
          <Link href={`/post/${node.slug}`}>
              <span className='transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-500 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
                继续阅读
              </span>
          </Link>
        </div>
    </div>
  )
}

export default PostCard
