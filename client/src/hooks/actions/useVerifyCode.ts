import {useState} from "react";
import {URL} from "@/constant/const";
import {check_code} from "@/types/actions";

export default function useVerifyCode() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState<boolean>(false)

    const post = async (data:check_code) => {
        setLoading(true)
        try{
            const response = await fetch(`${URL}/auth/check_code`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body:JSON.stringify({
                    email:data.email,
                    code:data.code,
                    is_login:data.is_Login,
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