import React ,{useContext} from 'react';
import Axios from "axios";
import { useEffect, useState} from "react";
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from '../utils/helpers/AuthContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PermIdentityTwoToneIcon from '@material-ui/icons/PermIdentityTwoTone';

function AdminDashBord() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfPostsSignalled, setListOfPostsSignalled] = useState([]);
  const [listOfCommentsSignalled, setListOfCommentsSignalled] = useState([]);
  const [updatedRole, setUpdatedRole] = useState({admin:""});
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

    const updateRole = ({value,row}) => {
      const id = value.id;
      const role = value.role;
      let newRole = ""
        if(role === "0"){
           newRole = true;
          // setUpdatedRole({admin:true});         
        }else{
          newRole = false;
          //setUpdatedRole({admin:false});
        }
          Axios.put("http://localhost:3006/api/users/roleUser",{idUser: id,role:newRole},{headers:{
              accesToken: localStorage.getItem("accesToken")
            }}); 
        
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
              if(value.userRole ==="1"){
                setUpdatedRole({admin:true})
              }
              else {
                setUpdatedRole({admin:false})
              }
              let row = key;
              console.log(row);
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
                  
                  <SupervisorAccountIcon className="SupervisorAccountIcon" onClick={()=>{updateRole({value, row:row})}}/>
                  ):(
                  <PermIdentityTwoToneIcon className="PermIdentityTwoToneIcon" onClick={()=>{updateRole({value, row:row})}}/>
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
          <h3>Liste des commentaires signalés</h3>
          {
          listOfCommentsSignalled.map((value, key) => {
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
