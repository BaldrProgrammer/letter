import {URL} from "@/constant/const";
import {useState} from "react";


export default function useMail(){
    const [date, setDate] = useState(null)
    const [error, setError] = useState<null | object>(null)
    const [loading, setLoading] = useState(false)

    const post = async (data:string) =>{
        setLoading(true)

        try{
            const response = await fetch(`${URL}/auth/send_code`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body:JSON.stringify({email:data})
            })

            if(!response.ok) {
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

    return{post, date, error, loading}
}