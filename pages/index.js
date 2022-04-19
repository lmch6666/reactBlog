import Head from 'next/head'
import {Categories,PostCard,PostWidget} from '../Components/index'
import { getPosts } from '../service'

// const arr = [
//   {url:, title:'八重樱·桃源恋歌 天穹市天穹殿下身穿旗袍的八重樱在此起舞~', slug:'testing'},
//   {url:, title:'八重樱·桃源恋歌 天穹市天穹殿下身穿旗袍的八重樱在此起舞~'}
// ]

export default function Home({ posts }) {
  posts = posts.map((item,index) => {
        if (index % 2 == 1) {
          item.node.url = 'http://5b0988e595225.cdn.sohucs.com/images/20190202/6a17754560404aa3b9f1f8f3404986c3.jpeg'
        } else {
         item.node.url = 'http://5b0988e595225.cdn.sohucs.com/images/20190202/e76913d185f847edaedb7e99fd667f70.jpeg'
        }
      return item
  });
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Blog code</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=' grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {
            posts.map((item)=>{
              return (
               <PostCard key={item.node.slug} data={item}/>
              )
            })
          }
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <PostWidget/>
          <Categories/>
        </div>
      </div>
      
    </div>
  )
}
// next中自带得预获取数据方法 通过此方法来预请求数据，页面需要作用预渲染的方式
export async function getStaticProps(){
  const posts = (await getPosts()) || [] ;
  // console.log(posts);
  return {
    props : {
      posts
    }
  }
}
