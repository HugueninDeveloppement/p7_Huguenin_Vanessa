import React,{useEffect, useState, useContext} from 'react';
import {useParams, useHistory} from "react-router-dom";
import Axios from 'axios';
import {AuthContext} from '../utils/helpers/AuthContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function PersonnelPage() {

    let {id} = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");    
    const { authState ,setAuthState} = useContext(AuthContext);

    let history =useHistory();

    useEffect(() => {
        Axios.get(`http://localhost:3006/api/users/userAllInfo/${id}`,
        {headers:{
          accesToken: localStorage.getItem("accesToken")
        }})
         .then((response)=>{
             console.log(response);
            setUserInfo(response.data)
         }) 
         
     }, [id]);

     const changePassword = () => {
         Axios.put("http://localhost:3006/api/users/changePassword",{oldPassword:oldPassword, newPassword:newPassword},
         {headers:{
           accesToken: localStorage.getItem("accesToken")
         }}).then((response)=>{
             if(response.data.error){
                 alert(response.data.error)
             }
            setOldPassword("");
            setNewPassword("");
                        
         })
    }

    const deleteUser = (id) =>{
        console.log(id);
        Axios.delete(`http://localhost:3006/api/users/deletUser/${id}`,
         {headers :{accesToken: localStorage.getItem("accesToken")}})
            .then(() =>{                
                localStorage.removeItem("accesToken");
                setAuthState({userPseudo:"", id:0,role:0, status:false})               
                history.push("/login");
            })
    }


    return (
        <div id="pagePerso">
            <div className="left-userInfo">
                <div><p>Nom d'utilisateur : {userInfo.userPseudo}</p></div>
                <div><p>Nom de famille : {userInfo.userName}</p></div>
                <div><p>Email enregistré : {userInfo.userEmail}</p></div>
                
                   {userInfo.userRole === "1" &&  
                    <div>
                    <h2>Role dans le site : {userInfo.userRole}</h2>
                    </div>
                    }
                
                
            </div>
            <div className="right-userChangeInfo">
                <div className="right-userChangeInfo-body">
                    <h4>Changer de mot de password</h4>
                    <div>
                    <label>Entrez votre mot de passe actuel</label>
                    <input type="password" placeholder="Mot de passe actuel" value={oldPassword} onChange={(e) => {setOldPassword(e.target.value)}}/>
                    </div>
                    <div>
                    <label>Entrez votre nouveau mot de passe</label>
                    <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>
                    </div>
                    <button id="changepassword" onClick={changePassword}>Valider</button>
                </div>
                <div className="right-userChangeInfo-footer">
                    <h4>Supprimer son profil</h4>
                    {authState.userPseudo === userInfo.userPseudo &&
                        <div>
                        <HighlightOffIcon onClick={()=>{
                            deleteUser(userInfo.id)
                        }}/>
                       </div> 
                    }
                </div>
            </div>                
        </div>
    
    )}

export default PersonnelPage
