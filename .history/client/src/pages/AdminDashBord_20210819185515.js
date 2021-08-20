import React ,{useContext} from 'react';
import Axios from "axios";
import { useEffect, useState} from "react";
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from '../utils/helpers/AuthContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function AdminDashBord() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfPostsSignalled, setListOfPostsSignalled] = useState([]);
  const [listOfCommentsSignalled, setListOfCommentsSignalled] = useState([]);
  const { authState } = useContext(AuthContext);

  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accesToken")) {
      history.push("/login");
    } else {
    Axios.get("http://localhost:3006/api/users/userControl",
    {headers:{
      accesToken: localStorage.getItem("accesToken")
    }})
         .then((response)=>{
           console.log(response.data.listOfUsers);
          setListOfUsers(response.data.listOfUsers);
          
    }).catch((err)=>{
      console.log(err);
    });
  
    Axios.get("http://localhost:3006/api/alert/post",
    {headers:{
      accesToken: localStorage.getItem("accesToken")
    }})
         .then((response)=>{
           setListOfPostsSignalled(response.data.listOfPostsSignalled);
          
    }).catch((err)=>{
      console.log(err);
    });

    Axios.get("http://localhost:3006/api/alert/comment",
    {headers:{
      accesToken: localStorage.getItem("accesToken")
    }})
         .then((response)=>{
           setListOfCommentsSignalled(response.data.listOfCommentsSignalled);
          
    }).catch((err)=>{
      console.log(err);
    });
    
    }
  },[])

  const deletePost = (data) =>{
    console.log(data);
    console.log( data.UserId);
    const postId = data.id;
    const ArrayOfPostSignalledId = data.PostsSignalleds.map((alert)=>{
      return alert.id
    });
    console.log(ArrayOfPostSignalledId); 
            

    ArrayOfPostSignalledId.map((alert) => {
      console.log(alert);
      Axios.delete(`http://localhost:3006/api/alert/post/${alert}`,
         {headers :{accesToken: localStorage.getItem("accesToken")}})
            
    });

      Axios.delete(`http://localhost:3006/api/posts/${postId}`,
      {headers :{accesToken: localStorage.getItem("accesToken")}}).then(()=> {
        setListOfPostsSignalled(
          listOfPostsSignalled.filter((value)=>{
            return value.id !== postId
          })
        )
      })
  }

  const deleteComment = (data) =>{
    console.log(data);
    const commentId = data.id;
    const ArrayOfCommentSignalledId = data.CommentsSignalleds.map((alert)=>{
      return alert.id
    });
    console.log(ArrayOfCommentSignalledId); 
            

    ArrayOfCommentSignalledId.map((alert) => {
      console.log(" commentaire pointé" + alert);
      Axios.delete(`http://localhost:3006/api/alert/comment/${alert}`,
         {headers :{accesToken: localStorage.getItem("accesToken")}})
            
    });

      Axios.delete(`http://localhost:3006/api/comments/${commentId}`,
      {headers :{accesToken: localStorage.getItem("accesToken")}}).then(()=> {
        setListOfCommentsSignalled(
          listOfCommentsSignalled.filter((value)=>{
            return value.id !== commentId
          })
        )
      })
    
}

    return (
      <>
        
        <div className="dashbord-contain">
          <div>
            <ul>
              <li><a href="#users">Liste des utilisateurs</a></li>
              <li><a href="#posts">Listes des publications signalés</a></li>
              <li><a href="#comments">Listes des commentaires signalés</a></li>
            </ul>
          </div>
          <div>
            {listOfUsers.map((value, key) => {
              return (
            <div key={key} className="userDashbord" id="users">
                <div className="Name">
                Nom de l'utilisateur : {value.userName}
                </div>
                <div className="Email">
                Email utilisateur : {value.userEmail}
                </div>
                <div >
                  <Link to={`/profile/${value.id}`}>{value.userPseudo}</Link>
                </div>
            </div>
            )
            })}
          
          </div>
          <div className="posts-contain" id="posts">
          {listOfPostsSignalled.map((value, key) => {
              return (
            <div key={key} className="postWithAlertDashbord">
                <div className="Name">
                Nom de l'utilisateur : {value.userName}
                  <Link to={`/profile/${value.userId}`}>{value.userPseudo}</Link>
                </div>
                <div className="postText">
                Post concerné : {value.postText}
                </div>
                <div className="postText">
                Nombre de signalement : {value.PostsSignalleds.length}
                </div>
                <div >
                <HighlightOffIcon onClick={()=>{
                            deletePost(value)
                        }}/>
                </div>
            </div>
            )
            })}
          </div>
          <div className="comments-contain" id="comments">
          {
          listOfCommentsSignalled.map((value, key) => {
            console.log(value);
              return (
            <div key={key} className="postWithAlertDashbord">
                <div className="Name">
                Nom de l'utilisateur :
                  <Link to={`/profile/${value.userId}`}>{value.userPseudo}</Link>
                </div>
                <div className="postText">
                Commentaire concerné : {value.commentText}
                </div>
                <div className="postText">
                Nombre de signalement : {value.CommentsSignalleds.length}
                </div>
                <div >
                <HighlightOffIcon onClick={()=>{
                            deleteComment(value)
                        }}/>
                </div>
            </div>
            )
            })}
          </div>
        </div>
      </>
    )
}

export default AdminDashBord
