import React, {ReactNode, createContext, useContext, useState, useEffect} from "react";
import {User} from "@/types/actions";

interface UserContext{
    user: User | null,
    isLoading: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContext | undefined>(undefined)
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const logout = () =>{
        setUser(null)
    }


export default function userContext({children}:{children: ReactNode}){
    return(
        <UserContext.Provider value={{ user, isLoading, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}