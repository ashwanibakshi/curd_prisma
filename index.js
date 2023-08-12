const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient()

const express = require("express");

const app = express();

app.use(express.json());

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.$connect();

//-------------- show all names ---------------------//

  app.get("/showall",async (req,res)=>{
    try {
      const data = await prisma.user.findMany();
      res.json({data:data});
    } catch (error) {
      res.json({err:error.message});   
    } 
  });

//------------------- xxxxx -----------------------//

//---------------- add new name -------------------//

  app.post("/name",async (req,res)=>{
    try {
     const data =  await prisma.user.create({
        data:{
          name : req.body.name
        },
         });

       res.json({dataa:data});

      } catch (error) {
        console.log(error.message);
           res.json({err:error.message}); 
     }
  });

//------------------ xxxxxx ------------------------//


//------------------ get name byId ----------------//

app.get("/name/:id",async (req,res)=>{
    try {
       const data = await prisma.user.findUnique({
        where:{
          id : req.params.id
        }
       });
      res.json({data:data});

    } catch (error) {
      res.json({err:error});
    }
});

//------------------ xxxxxx ------------------------//

//---------------- delete user byId ---------------//

app.delete("/remove/:id",async (req,res)=>{
     try {
        const data = await prisma.user.delete({
          where:{
              id : req.params.id
          }
        });
        res.json({data:'data removed successfully'});
     } catch (error) {
       res.json({err:error.message});
     }
});

//------------------ xxxxxx ------------------------//

}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

  app.listen(3000,()=>console.log('server run at port 3000'));