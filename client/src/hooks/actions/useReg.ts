import {useState} from "react";
import {URL} from "@/constant/const";
import {Reg} from "@/types/actions";

export default function useReg() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState<boolean>(false)

    const post = async (data:Reg) => {
        setLoading(true)
        try{
            const response = await fetch(`${URL}/auth/reg`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body:JSON.stringify({
                    first_name: data.first_name,
                    last_name:data.last_name,
                    email:data.email,
                    username: data.username
                })
            })

            if(!response.ok){
                throw new Error(`Error: ${response.status}`);
            }else {
                setLoading(false)
                return true
            }
        }catch (err:any){
            setError(err)
            setLoading(false)
            return false
        }
    }

    return{post, error, loading}
}