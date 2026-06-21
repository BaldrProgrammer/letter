import React, {ReactNode, createContext, useContext, useState, useEffect} from "react";
import {User} from "@/types/actions";
import {URL} from "@/constant/const";


interface UserContext{
    user: User | null,
    isLoading: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContext | undefined>(undefined)


export default function userContext({children}:{children: ReactNode}){
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getCur = async () => {
        try {
            const response = await fetch(`${URL}/users/current`,{
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                setUser(await response.json())
            } else {
                setUser(null)
                setIsLoading(false)
            }
        }catch (err:any){
            console.error(err)
            setIsLoading(false)
        }finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getCur()
    }, [])

    const logout = () =>{
        setUser(null)
    }

    return(
        <UserContext.Provider value={{ user, isLoading, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("bbbbbbbb");
    }
    return context;
}