import React,{useContext} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'; 
import Axios from "axios";
import {AuthContext} from '../utils/helpers/AuthContext';

import {useHistory} from 'react-router-dom';

function CreatePost() {

    let history = useHistory();
    
    const { authState } = useContext(AuthContext)

    const initailValues = {
        title:"",
        postText:""
    };    

    const validationSchema = Yup.object().shape({
        title:Yup.string().required(),
        postText:Yup.string().required()
    });
    
    const onSubmit = (data) => {
        Axios.post("http://localhost:3006/api/posts", {title:data.title, postText:data.postText, userPseudo:authState.userPseudo,UserId:authState.id},
        {
            headers:{
                accesToken: localStorage.getItem("accesToken")
            }
        })
         .then((response)=>{
         history.push("/")
    });
    }

    return (
        <div className="createPost-contain">
            <Formik initialValues={initailValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formPostContainer">
                    <div className="createPost-contain-title">
                        <div>
                        <label>Titre: </label>
                        <Field autoComplete="off" id="inputCreatePost" name="title" placeholder="(ex: Belle journée)"/>                    
                         </div>
                        <ErrorMessage name="title" component="span"/>                     
                    </div>
                    <div className="createPost-contain-body">
                        <div>
                        <label>Contenu: </label>
                        <Field component="textarea" autoComplete="off" id="inputCreatePost" name="postText" placeholder="(ex: Texte )"/>
                        </div>
                    <ErrorMessage name="postText" component="span"/>
                    </div>

                    <button type="submit">Valider la publication</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost