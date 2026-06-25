'use client'
import React, {ReactNode, createContext, useContext, useState, useEffect} from "react";
import {User} from "@/types/actions";
import {useRouter} from "next/navigation";

interface UserContext{
    user: User | null,
    isLoading: boolean;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContext | undefined>(undefined)

export default function userContext({children}:{children: ReactNode}){
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const router = useRouter()

    const getCur = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/current`,{
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                setUser(await response.json())
            } else {
                setUser(null)
                router.push('/auth');
            }
        }catch (err:any){
            console.error(err)
            setUser(null)
            router.push('/auth');
        }finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getCur()
    }, [])

    const logout = async () => {
        try {
            await fetch(`http://localhost:8000/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (err) {
            console.error("Ошибка при логауте на бэкенде:", err);
        } finally {
            setUser(null);
        }
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
