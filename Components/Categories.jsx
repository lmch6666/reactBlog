import React, { useState, useEffect } from 'react'
import { getCategory } from '../service/index'
import Link from 'next/link'
const Categories = () => {
  const [categories , setCategories] = useState([]);

  useEffect(() => {
    getCategory().then((result)=> setCategories(result))
  }, [])

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
          分类
      </h3>
      {
        categories.map((item)=>{
          return (
            <Link key={item.slug} href={`/post/${item.slug}`}>
              <span className="cursor-pointer block pb-3 mb-3">
                {item.name}
              </span>
            </Link>
          )
        })
      }
    </div>
  )
}

export default Categories
