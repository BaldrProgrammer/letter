'use client'
import React, {ReactNode, createContext, useContext, useState, useEffect} from "react";
import {User} from "@/types/actions";
import {useRouter, usePathname} from "next/navigation";
import {URL_SER} from "@/constant/const";

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
    const pathname = usePathname()

    const getCur = async () => {
        try {
            const response = await fetch(`${URL_SER}/users/current`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            if (response.ok) {
                setUser(await response.json())
            } else {
                setUser(null)

            }
        }catch (err:any){
            console.error(err)
            setUser(null)
        }finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (pathname?.startsWith('/p')) {
            getCur();
        } else {
            setIsLoading(false);
        }
    }, [pathname])

    const logout = async () => {
        try {
            await fetch(`${URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (err) {
            console.error("\n" +
                "Fehler beim Backend-Logout:", err);
        } finally {
            setUser(null);
            router.push('/auth');
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
