// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient, gql } from 'graphql-request';
/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */
const graphqlAddress = 'https://api-ap-northeast-1.graphcms.com/v2/ckvnv6hts2io201zdbcmg0qi4/master';
const MYTOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzY1NjEwMjgsImF1ZCI6WyJodHRwczovL2FwaS1hcC1ub3J0aGVhc3QtMS5ncmFwaGNtcy5jb20vdjIvY2t2bnY2aHRzMmlvMjAxemRiY21nMHFpNC9tYXN0ZXIiLCJodHRwczovL21hbmFnZW1lbnQtbmV4dC5ncmFwaGNtcy5jb20iXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LmdyYXBoY21zLmNvbS8iLCJzdWIiOiIwMWU0Y2U2Ny0yOWYyLTRhYmItOGFlOC1mOGM3ZjdlM2ExNzQiLCJqdGkiOiJja3Z0cTZqN2swOW5uMDF4bjJ0d2YzaWFoIn0.owi9aVh68FHG1ZwahuUD9dqMhozan_COIkRLgZZSPNpHSFp0OyYGDnYZCDCvbLdizDuhG8Qko4SpQuqlXuLrCLaoQpdKQml1299DbF1vLnZghsmEnEd4QrfESKEofTNXarFGM33w7FJjkDB-M9YTpeYlzgZPwNW5PCZxB4aeBtAER17vf-NjHI_A7ZOEetW_7v4bL5axzlHSCZop-nyodxZrcKNQbpS9j-EAVXW9aHhBc3DqORp1JzSdAbECLKTC0AUtFSpmxtkggcVp_JUqtamsuGG6FWKT6BFFWV6hDKFOm658fpDFirTIINN1dVEw1GbVpgs2ktoe5BwOUEXvEy30DPQfDxgb0aLH3YOxzgIl8amoUbuQaCYI4SXCdAEW5nLyxB6pBAMXxSHhX2xFd4G7z1sXcqDTXgxJYgqyUWI4M3xk1AOjIAfousMyt4nNxh66v9kLyJ_MiVHTEby-IK_lGmMbdff7fKDxOwzfqU30h1qFFJufH8u1TS-h7NHVc-sj5GH-VPxImIqBUuulYsSkm6KyO9a1oINGV5vDaqxDUNu-IiQdNQ0nU-p57FicFUfarR8viYPyVBiA3xMch7RQlSG6KC1LTFhNiCsYBkfKwRPwQckfNOtQXXGZXU0h9Bt1g7WbLdtxQsfJIRqI92F_DZuOmNkasrFxvdDp8NQ'

// export a default function for API route to work
export default async function helloAPI(req, res) {
  // console.log('<<req>>',req,'<<res>>', res);
  console.log(req.body.slug);
  // 通过创建本地客户端来向远程服务器进行提交数据 ， 需要远程服务端的配置的token 和配置的权限
  const graphQLClient = new GraphQLClient(graphqlAddress,{
    headers:{
      authorization:`Bearer ${MYTOKEN}`
    }
  });
  
  const query = gql`
    mutation MyMutation($name:String!,$email:String!,$comment:String!,$slug:String!) {
      createComment(
        data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}
      ) {
        id
      }
    }`
  // 发送请求
  const result = await graphQLClient.request(query,{
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  })

  return res.status(200).send(result);
}
