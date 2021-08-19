import React, {useEffect, useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Axios from "axios";
import {AuthContext} from '../utils/helpers/AuthContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';

function Post() {
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});    
    const [listOfAlertInComment, setListOfAlertInComment] =useState([]);
    const [comments, setcomments] = useState([]);
    const [newComment, setNewComments] = useState("");
    const { authState } = useContext(AuthContext);
    
    let history =useHistory();

    useEffect(() => {
        Axios.get(`http://localhost:3006/api/posts/byId/${id}`)
             .then((response)=>{
                setPostObject(response.data)
        });

        Axios.get(`http://localhost:3006/api/comments/${id}`)
                    .then((response)=>{
                        setcomments(response.data)
                });
      },[id]);

      const addComment =() => {
          Axios.post("http://localhost:3006/api/comments",
           {commentText: newComment ,PostId: id },
           {
               headers:{
                   accesToken: localStorage.getItem("accesToken")
               }
           })
            .then((response) => {
              if(response.data.error){
                  if(response.data.error.name==="JsonWebTokenError"){
                  alert("Merci de vous connecter")}
                  history.push("/login")
              } else {
              const commentToAdd = {id:response.data.id , commentText: newComment, userPseudo: response.data.userPseudo}
              setcomments([...comments, commentToAdd ])
              setNewComments("")
              }
            })
      }

    const deleteComment = (id) =>{
        Axios.delete(`http://localhost:3006/api/comments/${id}`,
         {headers :{accesToken: localStorage.getItem("accesToken")}})
            .then(() =>{
               setcomments(
                   comments.filter((val)=>{
                       return val.id !== id;
                   })
               )
            })
    }

    const deletePost = (id)=> {
        Axios.delete(`http://localhost:3006/api/posts/${id}`,
         {headers :{accesToken: localStorage.getItem("accesToken")}})
            .then(() =>{
                history.push("/");
            })
    }

    const editPost = (partOfPost) => {
        if (partOfPost === "title"){
            let newTitle = prompt("Entrez le nouveau titre");
            Axios.put("http://localhost:3006/api/posts/postTitle",{newTitle: newTitle,id:id},{headers:{
                accesToken: localStorage.getItem("accesToken")
              }});
              setPostObject({...postObject, title: newTitle})
        }else{
            let newPostText = prompt("Entrez le nouveau texte");
            Axios.put("http://localhost:3006/api/posts/postText",{newPostText: newPostText,id:id},{headers:{
                accesToken: localStorage.getItem("accesToken")
              }});
              setPostObject({...postObject, postText: newPostText})
        }
    };

    const signalComment = (CommentId) => {
        const UserId = authState.id;
        Axios.post("http://localhost:3006/api/alert/post",
         {PostId:PostId, UserId:UserId},
         {headers:{
           accesToken: localStorage.getItem("accesToken")
         }})
         .then((response)=>{
            setListOfAlertInComment(listOfAlertInComment.map((post) => { 
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
        <div className="postPage">
            <div className="postContainer" >
                <div className="tilte"> 
                    {postObject.title || " "}
                    {authState.userPseudo === postObject.userPseudo &&
                    <div>
                        <EditIcon onClick={()=>{
                        editPost("title")
                        }}/>
                    </div>  
                    }
                </div>
                <div className="postText">
                     {postObject.postText}
                     {authState.userPseudo === postObject.userPseudo && 
                     <div>
                         <EditIcon onClick={()=>{
                        editPost("postText")
                        }}/>
                     </div> 
                    }
                </div>


                <div className="userPseudo"> <h1> {postObject.userPseudo}</h1>
                {authState.userPseudo === postObject.userPseudo && 
                     <div>
                     <HighlightOffIcon onClick={()=>{
                        deletePost(postObject.id)
                        }}/>
                    </div>
                }
                </div>
            </div>
            <div className="commentContainer">
                <div>
                    <input type="text" placeholder="commentaire..." autoComplete="off" value={newComment} onChange={(e) => {
                        setNewComments(e.target.value)
                    }}/>
                    <button onClick={addComment} >Ajouter le commentaire</button>
                </div>
                <div>
                    {comments.map((comment , key) => {
                        console.log(comment);
                        return (
                            
                            <div  key= {key} className="comment">
                                <div>{comment.commentText}</div>
                                <div>{comment.userPseudo}</div>
                                {authState.userPseudo === comment.userPseudo && 
                                <div>
                                    <HighlightOffIcon onClick={()=>{
                                    console.log(comment);
                                    deleteComment(comment.id)
                                    }}/>
                                </div>
                                }
                                <div>
                                { (listOfAlertInComment.includes(comment.id)) ? 
                                    <ReportProblemOutlinedIcon titleAccess="Signaler un probléme avec ce commentaire"/>:
                                    <WarningOutlinedIcon titleAccess="Vous avez déjà signalé ce commentaire"/>
                                }
                                </div>
                            </div>
                            
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post
