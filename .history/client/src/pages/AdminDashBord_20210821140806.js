import React  from 'react';
import Axios from "axios";
import { useEffect, useState} from "react";
import {useHistory, Link} from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PermIdentityTwoToneIcon from '@material-ui/icons/PermIdentityTwoTone';

function AdminDashBord() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfPostsSignalled, setListOfPostsSignalled] = useState([]);
  const [listOfCommentsSignalled, setListOfCommentsSignalled] = useState([]);

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
    const postId = data.id;
    const ArrayOfPostSignalledId = data.PostsSignalleds.map((alert)=>{
      return alert.id
    });            

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
    const commentId = data.id;
    const ArrayOfCommentSignalledId = data.CommentsSignalleds.map((alert)=>{
      return alert.id
    });

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

    const updateRole = ({value}) => {
      const id = value.id;
      const role = value.userRole;
      let newRole = ""
        if(role === "0"){
           newRole = true;                
        }else{
          newRole = false;
          
        }
          Axios.put("http://localhost:3006/api/users/roleUser",{idUser: id,role:newRole},{headers:{
              accesToken: localStorage.getItem("accesToken")
            }}); 
        
        window.location.reload()
  };

    return (
      <>
        
        <div className="dashbord-contain">
          
            <ul>
              <li><a href="#users">Liste des utilisateurs</a></li>
              <li><a href="#posts">Listes des publications signalés</a></li>
              <li><a href="#comments">Listes des commentaires signalés</a></li>
            </ul>
         
          <div className="user-contain">
            <h3>Liste des utilisateurs</h3>
            {listOfUsers.map((value, key) => {
              return (
            <div key={key} className="oneuser" id="users">
                <div className="Name">
                Nom de l'utilisateur : {value.userName}
                </div>
                <div className="pseudo">
                Pseudo de l'utilisateur : {value.userPseudo}
                </div>
                <div className="Email">
                Email utilisateur : {value.userEmail}
                </div>
                <div className="oneuser-footer">
                  <Link to={`/profile/${value.id}`}>{value.userPseudo}</Link>
                  {value.userRole ==="1" ? (
                  
                  <SupervisorAccountIcon className="SupervisorAccountIcon" onClick={()=>{updateRole({value})}}/>
                  ):(
                  <PermIdentityTwoToneIcon className="PermIdentityTwoToneIcon" onClick={()=>{updateRole({value})}}/>
                  )}
                  
                </div>
            </div>
            )
            })}
          
          </div>
          <div className="posts-contain" id="posts">
          <h3>Liste des publications signalés</h3>
          {listOfPostsSignalled.map((value, key) => {
              return (
            <div key={key} className="postWithAlertDashbord">
                <div className="postWithAlertDashbord-Name">
                <p>Nom de l'utilisateur : {value.userName}</p>
                  <Link to={`/profile/${value.userId}`}>{value.userPseudo}</Link>
                </div>
                <div className="postText">
                Post concerné : {value.postText}
                </div>
                <div className="postWithAlertDashbord-count">
                Nombre de signalement : {value.PostsSignalleds.length}
                </div>
                <div className="postWithAlertDashbord-delete" ><p>Supprimer la publication</p>
                <HighlightOffIcon onClick={()=>{
                            deletePost(value)
                        }}/>
                </div>
            </div>
            )
            })}
          </div>
          <div className="comments-contain" id="comments">
          <h3>Liste des commentaires signalés</h3>
          {
          listOfCommentsSignalled.map((value, key) => {
              return (
            <div key={key} className="postWithAlertDashbord">
                <div className="postWithAlertDashbord-Name">
                <p>Nom de l'utilisateur :</p>
                  <Link to={`/profile/${value.userId}`}>{value.userPseudo}</Link>
                </div>
                <div className="postText">
                Commentaire concerné : {value.commentText}
                </div>
                <div className="postWithAlertDashbord-count">
                Nombre de signalement : {value.CommentsSignalleds.length}
                </div>
                <div className="postWithAlertDashbord-delete" >
                <p>Supprimer le commentaire</p>
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