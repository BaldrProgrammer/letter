'use client'
import {useEffect, useState} from "react";

export const useTimeSearch = (value:string, delay:number) => {
    const [debValue, setDebValue] = useState<string>(value)

    useEffect(()=>{
        const handlerTime = setTimeout(()=>{
            setDebValue(value)
        }, delay)
        return () => {
            clearTimeout(handlerTime);
        };
    }, [value, delay])

    return debValue
}