      import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import moment from 'moment'
// react 导入图片  以import形式导入进来使用，平常的方法是不行的
import tu from '../public/xbg.png'
import { getRecentPosts, getSimilarPosts } from '../service/index'
const PostWidget = ({categories,slug}) => {
  const [relatedPost,setRelatedPost] = useState([]);

  useEffect(()=>{
    if (slug) {
      getSimilarPosts(categories,slug).then(result => setRelatedPost(result))
    }else{
      getRecentPosts().then(result => setRelatedPost(result))
    }
  },[slug])

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
          {slug ? '相关文章' : '最新文章'}
      </h3>
      {relatedPost.map((item) =>{
       return(
        <div key={item.title} className="flex items-center w-full mb-4">
        <div className="w-16 flex-none">
          <img src={tu.src}
                alt=""
                width='70px'
                height='70px'
                className='align-middle rounded-full'
                />
        </div>
        <div className="flex-grow ml-4">
        <Link href={`/post/${item.slug}`} key={item.slug} className='text-md'>
              <span>{item.title}</span>
          </Link>
          <p className="text-gray-500 font-xs">
            2021
          </p>
        </div>
    </div>
       )
      })
  }
    </div>
  )
}

export default PostWidget
