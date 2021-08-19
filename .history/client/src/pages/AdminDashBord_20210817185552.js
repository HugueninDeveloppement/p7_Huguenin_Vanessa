import React ,{useContext} from 'react';
import Axios from "axios";
import { useEffect, useState} from "react";
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from '../utils/helpers/AuthContext';

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
           console.log(response.data.listOfPostsSignalled);
           listOfPostsSignalled(response.data.listOfPostsSignalled);
          
    }).catch((err)=>{
      console.log(err);
    });

    Axios.get("http://localhost:3006/api/alert/comment",
    {headers:{
      accesToken: localStorage.getItem("accesToken")
    }})
         .then((response)=>{
           console.log(response.data.listOfCommentsSignalled);
           setListOfCommentsSignalled(response.data.listOfCommentsSignalled);
          
    }).catch((err)=>{
      console.log(err);
    });
    
    }



  },[])

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
                {value.userName}
                </div>
                <div className="Email">
                  {value.userEmail}
                </div>
                <div >
                  <Link to={`/profile/${value.id}`}>{value.userPseudo}</Link>
                </div>
            </div>
            )
            })}
          
          <div className="posts-contain">

          </div>
          <div className="comments-contain">

          </div>
        </div>
      </>
    )
}

export default AdminDashBord
