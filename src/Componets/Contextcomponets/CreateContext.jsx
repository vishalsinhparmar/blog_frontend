import { createContext, useEffect, useState } from "react";
import CONFIG from '../../config'
const myContext = createContext();
const Myprovider = ({children})=>{
    const [usertoken,setuserToken] = useState(localStorage.getItem('token'))

    // const [token,setToken]=useState('');
    // console.log('the usertoken is',token)
    // setToken(usertoken)
    const [user,setUser] = useState(null);
    const [userblog,setUserblog] = useState([]);
    console.log('the authenticate userData',user);

    console.log('the userAuth token',usertoken);
    const userdata = async ()=>{
        if(!usertoken) return;
        const res = await fetch(`${CONFIG.API_BASE_URL}/api/auth/user`,{
          headers:{
            Authorization: `Bearer ${usertoken}`
          },
          method:'GET'
        });
        if(res.ok){
            const data = await res.json();
            console.log('the user data is',data);
            const {username,image} = data;
         
            // console.log('us)
            setUser({username,image});
        }
     }
    
  
     useEffect(() => {
        userdata();
      }, [usertoken]);
    return(
        <myContext.Provider value={{setUserblog,
                                    userblog,
                                    user,
                                    setUser,
                                    setuserToken,
                                   userdata
                                    }}>
            {children}
        </myContext.Provider>
    )
};

export {Myprovider,myContext}