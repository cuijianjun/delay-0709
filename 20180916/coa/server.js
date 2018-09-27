const Coa = require('./application')
const app = new Coa();

// app.use((req,res)=>{
// //   res.writeHead(200)
// //   res.end('hello imooc')
// // })

app.use(async ctx => {
  ctx.body = 'hello woa' + ctx.url
})

app.listen(9092,() =>{
  console.log('server runing on port 9092');
})