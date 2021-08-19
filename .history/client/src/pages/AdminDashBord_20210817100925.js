import React ,{useContext} from 'react';
import Axios from "axios";
import { useEffect, useState} from "react";
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from '../utils/helpers/AuthContext';

function AdminDashBord() {
   
  const { authState } = useContext(AuthContext);

  let history = useHistory();

    return (
      <>
        <div>
                {console.log(authState)}
        </div>
        <div className="dashbord-contain">
          <div className="users-contain"></div>
          <div className="posts-contain"></div>
          <div className="comments-contain"></div>
        </div>
      </>
    )
}

export default AdminDashBord
