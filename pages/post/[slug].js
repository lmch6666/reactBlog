import React, {useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { getPosts, getPostDetails } from '../../service/index'
import { PostDetail, 
        Categories, 
        PostWidget, 
        Author, 
        Comment, 
        CommentForm,
        Loader
      } from '../../Components/index'
 const PostDetails = ({ post }) => {
  const [data, setData] = useState('');
  useEffect(() => {
    if (data == '') {
      return;
    }
  }, [data])
  const route = useRouter();

  if (route.isFallback) {
    return (<Loader/>)
  }

  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
         <div className="col-span-1 lg:col-span-8">
            <PostDetail data = {post}/>
            <Author author = {post.author}/>
            <CommentForm slug = {post.slug} set={setData} />
            <Comment slug ={post.slug}/>
         </div>
         <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget
                categories={post.categories.map( (item) => item.slug)}
                slug= {post.slug}
              />
              <Categories/>
            </div>
         </div>
      </div>
    </div>
  )
}
// 在构建过程中获取数据
export async function getStaticProps({ params }){
  const posts = await getPostDetails(params.slug);
  // console.log("<<通过slug获取到得数据>>", posts);
  return {
    props : {
      post : posts
    }
  }
}
// Specify dynamic routes to pre-render pages based on data.（指定动态路由需要基础数据去预渲染页面）
// The HTML is generated at build time and will be reused on each request. （在html构建生成的时候，并将在每次请求时重用）
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true
  };
}


export default PostDetails


