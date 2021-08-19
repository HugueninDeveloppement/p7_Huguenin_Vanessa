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
  const [arrayOfPostAlert, setArrayOfPostAlert] = useState([]);
  const [arrayOfCommentAlert, setArrayOfCommentAlert] = useState([]);
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
          setArrayOfPostAlert(response.data.listOfPostsSignalled.map((alert)=>{
            return alert.PostId
          }))
           setListOfPostsSignalled(response.data.listOfPostsSignalled);
          
    }).catch((err)=>{
      console.log(err);
    });

    Axios.get("http://localhost:3006/api/alert/comment",
    {headers:{
      accesToken: localStorage.getItem("accesToken")
    }})
         .then((response)=>{
           console.log(response.data.listOfCommentsSignalled);
           setArrayOfCommentAlert(response.data.listOfCommentsSignalled.map((alert)=>{
            return alert.CommentId
          }))
           setListOfCommentsSignalled(response.data.listOfCommentsSignalled);
          
    }).catch((err)=>{
      console.log(err);
    });
    
    }
  },[])

  const deletePost = (data) =>{
    console.log(data.id + data.userId);

    /**Axios.delete(`http://localhost:3006/api/alert/post/${id}`,
         {headers :{accesToken: localStorage.getItem("accesToken")}})
            .then(() =>{
              setListOfPostsSignalled(
                listOfPostsSignalled.filter((val)=>{
                       return val.id !== id;
                   })
               )
            })*/
  }

  const deleteComment = ({data}) =>{
    console.log(data);
    /**Axios.delete(`http://localhost:3006/api/alert/post/${id}`,
         {headers :{accesToken: localStorage.getItem("accesToken")}})
            .then(() =>{
              setListOfCommentsSignalled(
                listOfCommentsSignalled.filter((val)=>{
                       return val.id !== id;
                   })
               )
            })*/
    
}

    return (
      <>
        <div>
                {console.log(authState)}
        </div>
        <div className="dashbord-contain">
          
            {listOfUsers.map((value, key) => {
              return (
            <div key={key} className="userDashbord">
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
          
          <div className="posts-contain">
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
                Nombre de signalement : {arrayOfPostAlert.length}
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
          <div className="comments-contain">
          {listOfCommentsSignalled.map((value, key) => {
              return (
            <div key={key} className="postWithAlertDashbord">
                <div className="Name">
                Nom de l'utilisateur : {value.userName}
                  <Link to={`/profile/${value.userId}`}>{value.userPseudo}</Link>
                </div>
                <div className="postText">
                Commentaire concerné : {value.postText}
                </div>
                <div className="postText">
                Nombre de signalement : {arrayOfCommentAlert.length}
                </div>
                <div >
                <HighlightOffIcon onClick={()=>{
                            deleteComment(value.id)
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
