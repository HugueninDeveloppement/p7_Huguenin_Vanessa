import React from 'react'

function HomeUser() {

    const [authState, setAuthState] = useState({userPseudo:"", id:0, status:false}); 

  useEffect(()=>{
    
    Axios.get("http://localhost:3006/api/users/checkToken" , {
      headers:{
        accesToken: localStorage.getItem("accesToken")
      }
    }).then((response)=>{
      if(response.data.error){
        setAuthState({...authState, status: false})       
      }else{
        setAuthState({userPseudo:response.data.userPseudo, id:response.data.id, status:true})
      }
    })
  },[])

  const logout = () =>{ 
    localStorage.removeItem("accesToken");
    setAuthState({userPseudo:"", id:0, status:false});
  }

    return (
        <div>
            
        </div>
    )
}

export default HomeUser
