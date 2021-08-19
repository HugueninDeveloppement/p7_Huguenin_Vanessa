import React ,{useContext} from 'react';
import Axios from "axios";
import { useEffect, useState} from "react";
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from '../utils/helpers/AuthContext';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

function Home() {

  const [listOfPosts, setListOfPosts ] = useState([]);
  const [listOfLikeInPost, setListOfLikeInPost ] = useState([]);
  const {authStatus} = useContext(AuthContext);
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
          }))
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

    return (
        <div>
            {listOfPosts.map((value, key) => {
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
              <Link to={`/profile/${value.UserId}`}>{value.userPseudo}</Link>
            </div>
            <div className="like-choose">
              { (listOfLikeInPost.includes(value.id)) ?               
                <ThumbUpAltIcon onClick={()=> likePost(value.id)}/> : <ThumbUpAltOutlinedIcon  onClick={()=> likePost(value.id)}/>              
              }            
            <span>{value.Likes.length}</span>
            </div>
          </div>
        )
      })}
        </div>
    )
}

export default Home