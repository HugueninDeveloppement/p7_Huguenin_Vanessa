import React,{useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import Axios from 'axios';

function Profile() {
    let {id} = useParams();
    const [userPseudo, setUserPseudo] = useState("")
    const [postOfUser, setPostOfUser] = useState([])
    let history = useHistory();

    useEffect(() => {
       Axios.get(`http://localhost:3006/api/users/userInfo/${id}`,
       {headers:{
         accesToken: localStorage.getItem("accesToken")
       }})
        .then((response)=>{
            setUserPseudo(response.data.userPseudo)
        })

        Axios.get(`http://localhost:3006/api/posts/byUserId/${id}`)
        .then((response)=>{
            setPostOfUser(response.data)
        })

    }, [id])

    return (
        <div className="profilePage">
            <div className="userInfo">
                <h1>Profil de {userPseudo} </h1>
            </div>
            <div className="userPost">
              <p>Ces publications</p>
            {postOfUser.map((value, key) => {
        return (
          <div key={key} className="postOfUser" >
            <div className="postOfUser-header-card" onClick={() => {
            history.push(`/post/${value.id}`)
          }}>
              <div className="postOfUser-title">
                {value.title}
              </div>
              <div className="postOfUser-textContent">
                {value.postText}
              </div>
            </div>
            <div >
              {value.userPseudo}
            </div>
            <p>{Date(value.createdAt).slice(3,15)}</p>
          </div>
        )
      })}
            </div>
        </div>
    )
}

export default Profile
