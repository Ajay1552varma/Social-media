import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import api from "../Service/api";
import { UserContext } from "./UserContext";


export const ChatContext = createContext();

export const ChatProvider = ({children})=>{
    const {token} = useContext(UserContext)
    const [selectedChat,setSelectedChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [loadinChat,setLoadingChat] = useState(true);
    


    const accessChat = async (userId) => {
            const response = await api.post("/chat",{ userId },
            {
                headers: {
                Authorization: token,
                },
            }
            );
            return response.data;
    };


    const values = {
        selectedChat,setSelectedChat,
        accessChat,
        messages, setMessages,
        users, setUsers,
        loadinChat,setLoadingChat
    }
    return(
    <ChatContext.Provider value={values}>
        {children}
    </ChatContext.Provider>
    );
}