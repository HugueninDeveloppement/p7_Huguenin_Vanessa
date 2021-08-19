import React ,{useContext} from 'react';
import Axios from "axios";
import { useEffect, useState} from "react";
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from '../utils/helpers/AuthContext';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';

function Home() {

  const [listOfPosts, setListOfPosts ] = useState([]);
  const [listOfLikeInPost, setListOfLikeInPost ] = useState([]);
  const [listOfPostInAlert, setListOfPostInAlert] =useState([]); 
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accesToken")) {
      history.push("/login");
    } else {
    Axios.get("http://localhost:3006/api/posts",
    {headers:{
      accesToken: localStorage.getItem("accesToken")
    }})
         .then((response)=>{
          setListOfPosts(response.data.listOfPosts);
          setListOfLikeInPost(response.data.listOfLikeInPost.map((like)=>{
            return like.PostId
          }));
          setListOfPostInAlert(response.data.listOfPostInAlert.map((alert)=>{
            return alert.PostId
          }));

    }).catch((err)=>{
      console.log(err);
    });}

  },[])

  const likePost = (postId) => {
    Axios.post("http://localhost:3006/api/likes/",
     {PostId:postId},
     {headers:{
       accesToken: localStorage.getItem("accesToken")
     }})
     .then((response)=>{
       setListOfPosts(listOfPosts.map((post)=> {         
         if (post.id === postId){
           if(response.data.liked){
            return{...post, Likes: [...post.Likes, 0]}
          }else {
            const likeInPost = post.Likes;
            likeInPost.pop();
            return{...post, Likes: likeInPost}
          }
         }else{
           return post
         }
       }))

       if(listOfLikeInPost.includes(postId)){
        setListOfLikeInPost(listOfLikeInPost.filter((id) => { return id !== postId}))
       }else{
         setListOfLikeInPost([...listOfLikeInPost, postId])
       }


     })
     .catch((err)=>{
       console.log(err);
     })
 
  }

  const signalPost = (PostId) => {
    const UserId = authState.id;
    Axios.post("http://localhost:3006/api/alert/post",
     {PostId:PostId, UserId:UserId},
     {headers:{
       accesToken: localStorage.getItem("accesToken")
     }})
     .then((response)=>{
      setListOfPostInAlert(listOfPostInAlert.map((post) => { 
        console.log(response);        
         if (post.id === PostId){
           if(response.data.alerted){
            return{...post, PostsSignalled: [...post.PostsSignalled, 0]}
          }else {
            const alertInPost = post.PostsSignalled;
            alertInPost.pop();
            return{...post, PostsSignalled: alertInPost}
          }
         }else{
           return post
         } 
       }))

       if(listOfPostInAlert.includes(PostId)){
        setListOfPostInAlert(listOfPostInAlert.filter((id) => { return id !== PostId}))
       }else{
        setListOfPostInAlert([...listOfPostInAlert, PostId])
       }


     })
     .catch((err)=>{
       console.log(err);
     })
 
  }

    return (
      <div>
        
      <div>
        {authState.role ==="1" &&
        <div>
          <Link to={"/dashbord"}><DashboardIcon /></Link>
        </div>
        }
    </div>

        <div>
            {

    listOfPosts.map((value, key) => {
      console.log(value.createdAt)
        return (
          <div key={key} className="post" >
            <div className="header-card" onClick={() => {
            history.push(`/post/${value.id}`)
          }}>
              <div className="title">
                {value.title}
              </div>
              <div className="textContent">
                {value.postText}
              </div>
            </div>
            <div >
              <div>
                <Link to={`/profile/${value.UserId}`}>{value.userPseudo}</Link>
              </div>
            </div>
            <div className="like-choose">
              { (listOfLikeInPost.includes(value.id)) ?               
                <ThumbUpAltIcon onClick={()=> likePost(value.id)}/> : <ThumbUpAltOutlinedIcon  onClick={()=> likePost(value.id)}/>              
              }            
            <span>{value.Likes.length}</span>
            </div>
            <div>
            { (listOfPostInAlert.includes(value.id)) ?    
              <ReportProblemOutlinedIcon onClick={()=> signalPost(value.id)} titleAccess="signaler un probléme avec ce post" /> :
              <WarningOutlinedIcon onClick={()=> signalPost(value.id)} titleAccess="Vous avez déjà signaler ce problème" color="action"/>
            }
            </div>
            <span>{Date(value.createdAt)}</span>
          </div>
        )
      })}
        </div>
        </div>
    )
}

export default Home