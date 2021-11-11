import { request, gql} from 'graphql-request'

const graphqlAPI = 'https://api-ap-northeast-1.graphcms.com/v2/ckvnv6hts2io201zdbcmg0qi4/master';

// 获取首页数据
export const getPosts = async () =>{
  const query = gql`
      query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                id
                name
              }
              createdAt
              slug
              title
              excerpt
              categories {
                name
                slug
              }
            }
          }
        }
      }
  `;
  const result = await request(graphqlAPI,query)
  // console.log('<<cms自动请求的数据>>',result)
  return result.postsConnection.edges
}
// 获取文章信息
export const getPostDetails = async (slug) =>{
  const query = gql`
      query MyQuery( $slug:String! ) {
        post( where:{ slug: $slug }) {
          createdAt
          slug
          title
          excerpt
          categories {
            name
            slug
          }
          author {
            bio
            name
            id
          }
          content {
            raw
          }
        }
      }
  `;
  const result = await request(graphqlAPI, query, { slug })
  return result.post
}

// 获取其他文章
export const getRecentPosts = async () =>{
  const query = gql`
    query getRecentPosts(){
      posts(last: 3, orderBy: createdAt_ASC) {
        title
        slug
        createdAt
      }
    }
  `
  const result = await request(graphqlAPI,query)
  // console.log('<<cms自动请求的数据>>',result)
  return result.posts
}
// 获取相似文章
export const getSimilarPosts = async (categories,slug) =>{
  // where： 在category表中选择包括(slug_in)词条的值的结果中排除指定的slug的值
  // 当gql查询语句中需要查询的字段为空时，查询语句会报错，需要用request的第三个参数来覆盖查询
  const query = gql`
    query getSimilarPosts( $categories:[String!], $slug: String! ){
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      )  {
        title
        slug
        createdAt
      }
    }
  `
  // 当查询语句中的字段缺失没有定义的时候 ， 可以用request中的第三个参数，来覆盖原有的查询的字段
  const result = await request(graphqlAPI,query,{ slug, categories })
  console.log('<<getSimilarPosts>>',result)
  return result.posts
}
// 获取文档
export const getCategory = async () =>{
  const query = gql`
      query MyQuery {
        categories {
          name
          slug
        }
      }
  `
  const result = await request(graphqlAPI,query)
  // console.log('<<cms自动请求的数据>>',result)
  return result.categories
}
// 提交评论数据
export const submitData = async ( obj ) => {
  //  这个/api/hello对应相应的文件路径的文件，其中文件里会默认导出函数来执行
  const result = await fetch('/api/hello',{
    method:'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(obj),
  })
  return result.json();
}
// 获取评论数据
export const getComments = async (slug) =>{
  // console.log(slug)
  const query = gql`
  query MyQuery( $slug:String! ) {
    comments(where: {post: {slug: $slug}}) {
      email
      comment
      name
    }
  }`;
  const result = await request(graphqlAPI,query,{slug})
  // console.log('<<cms自动请求的数据>>',result)
  return result.comments
}