import React from 'react'
import Link from 'next/link'

const categories = [
  {name:'其他', slug: 'react'},
  {name:'MDN', slug: 'WebComponent'}
]

const Header = () => {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='border-b w-full inline-block border-blue-400 py-8'>
         <div className='md:float-left block'>
            <Link href='/'>
              <span className='cursor-pointer font-bold text-4xl text-white'>
                nextBlog
              </span>
            </Link>
         </div>
          <div className='hidden md:float-left md:contents'>
              {
                categories.map((item) => (
                  <Link href={`/category/${item.slug}`} key={item.slug}>
                    <span className='md:float-right mt-2 align-middle text-blue-400 ml-4'>
                      {item.name}
                    </span>
                  </Link>
                ))
              }
          </div>
      </div>

    </div>
  )
}

export default Header
