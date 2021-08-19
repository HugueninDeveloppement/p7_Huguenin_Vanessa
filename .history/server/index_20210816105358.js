const express = require ('express');
const cors = require ('cors');

const db = require('./models');


const app = express();
app.use(express.json());
app.use(cors());

///////// Routers ///////////
const postRouter = require('./routes/Posts')
app.use("/api/posts", postRouter);

const commentRouter = require('./routes/Comments')
app.use("/api/comments", commentRouter);

const UserRouter = require('./routes/Users')
app.use("/api/users", UserRouter);

const LikeRouter = require('./routes/Likes')
app.use("/api/likes", LikeRouter);

const AlertRouter = require('./routes/Alert');
app.use("/api/Signalled", AlertRouter);

/////////// dataBase + server init /////////////
db.sequelize.sync().then(()=> {
    app.listen(3006, ()=>{
    console.log("server running on port 3006");
});
})


