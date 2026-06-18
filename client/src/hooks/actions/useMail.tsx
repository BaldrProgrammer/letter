import {URL} from "@/constant/const";
import {useState} from "react";


export default function useMail(){
    const [date, setDate] = useState(null)
    const [error, setError] = useState<null | object>(null)

    const post = async (data:string) =>{
        try{
            const response = await fetch(URL, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({email:data})
            })

            if(!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
        }catch (err:any){
            setError(err)
        }
    }

    return{post, date, error}
}