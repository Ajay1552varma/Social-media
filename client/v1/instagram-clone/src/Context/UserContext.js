import { createContext,useState } from "react";
import api from "../Service/api";
import followLogic from "../Utils/folowLogic";


export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [invalid,setInvalid] = useState(false);
    const [token,setToken] = useState(localStorage.getItem('jwt'));
    const [userProfileImage, setUserProfileImage] = useState({});
    const [user,setUser ] = useState({});
    const [error, setError] = useState(false);
    const [email,setEmail] = useState();
    const [userId,setUserId] = useState();
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [errorOpen,setErrorOpen] = useState(false);



    const login =  ({username,password})=>{
        return new Promise((resolve,reject)=>{
        api.post('/auth/login',{
            username:username,
            password:password
        }).then(res=>{
            setToken(res.data.Bearer)
            fetchUserData(res.data.Bearer)
            .then(re=>{
                const user = re.data
                setUserProfileImage(user.profilePic);
            })
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
        })
    }
    const register = ({ name, dob, bio, email, username, password },file)=>{
            const data = new FormData();
            data.append("profilePic", file);
            data.append("name", name);
            data.append("dob", dob);
            data.append("bio", bio);
            data.append("email", email);
            data.append("username", username);
            data.append("password", password);
            return new Promise((resolve,reject)=>{
                api.post('/auth/register',data)
                .then(res=>resolve(res))
                .catch(err=>reject(err))
            })
    }

    const clearStorage = ()=>{
        localStorage.clear();
    }

    const fbLogin = ()=>{
        try {            
            api.get('/auth/facebook')
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUserData = (token) => {
    return new Promise((resolve,reject)=>{
      api.get("/user/getUser", {
        headers: {
          Authorization: token,
        },
      })
      .then(res=>resolve(res))
      .catch(err=>reject(err))
   })
}
    const updateUserData = (token,name,bio,file)=>{
        const data = new FormData();
        data.append("profilePic", file);
        data.append("name", name);
        data.append("bio", bio);
        return new Promise((resolve,reject)=>{
        api.put("/user/updateUser", data, {
            headers: {
                Authorization: token,
            },
            }).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })    
        })
    }

    const clearStates = ()=>{
        setUserId("");
        setUser("");
        setEmail("");
        setToken("");
    }

    const getFollowers = () => {
    api
      .get("/user/getFollowers", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          const data = followLogic(res.data, following);
          setFollowers([...data]);
        } else setFollowers([]);
      })
      .catch((err) => {
        console.log(err);
        setErrorOpen(true);
      });
  };
    const getFollowing = () => {
    api
      .get("/user/getFollowing", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.length > 0) setFollowing([...res.data]);
        else setFollowing([]);
      })
      .catch((err) => {
        console.log(err);
        setErrorOpen(true);
      });
  };


  const followUser = (userToFollow) => {
    api
      .get(`friends/follow/${userToFollow}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.operation === "follow") {
          if (followers) {
            const u = followers.filter((u) => {
              if (u.user._id == userToFollow) {
                u.user['following']=true;
                return u;
              }
            });
            setFollowing([...following, ...u]);
          }
        }
        if (res.status === 200 && res.data.operation === "unfollow") {
          const u = followers.filter((u) => {
            if (u.user._id == userToFollow) {
              u.user['following'] = false
              return u;
            }
          });
          const d = following.filter((user) => {
            if (u[0].user._id !== user.user._id) {
              return user;
            }
          });
          setFollowing([...d]);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorOpen(true);
      });
  };




    const values={
        followers, setFollowers,
        following, setFollowing,
        userId,setUserId,
        error,email,setEmail, 
        setError,
        user,setUser,userProfileImage,
        setToken,updateUserData,
        setUserProfileImage,setInvalid,
        fetchUserData,token,invalid,
        login,register,fbLogin,
        clearStorage,
        clearStates,
        errorOpen,setErrorOpen,
        getFollowers,
        getFollowing,
        followUser


    }

    return(
        <>
            <UserContext.Provider value={values}>
                {children}
            </UserContext.Provider>
        </>
    )
}