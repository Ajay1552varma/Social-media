import { createContext,useContext,useState } from "react";
import api from "../Service/api";
import { UserContext } from "./UserContext";


export const PostContext = createContext();

export const PostProvider = ({children})=>{
    const{token} = useContext(UserContext)
    const [posts,setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
    
    const createPost = ({hashtags,caption},image)=>{
        return new Promise((resolve,reject)=>{
            api.post('/post/createPost',{
                image,hashtags,caption
            },{
                headers:{
                    Authorization:token
                }
            }
            )
            .then(res=>resolve(res))
            .catch(err=>reject(err))
        })
    }

    const fetchPost = ()=>{
        return new Promise((resolve,reject)=>{
            api.get("/post/getPost",{
                headers:{
                    Authorization:token
                }
            })
            .then(res=>resolve(res))
            .catch(err=>reject(err))
        })
    }
    const values={createPost,posts,setPosts,fetchPost,loading, setLoading }

    return(
        <>
            <PostContext.Provider value={values}>
                {children}
            </PostContext.Provider>
        </>
    )
}