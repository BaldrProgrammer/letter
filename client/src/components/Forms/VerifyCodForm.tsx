'use client'

import {Box, Typography} from "@mui/material";
import ButtonLetter from "@/components/Buttons/ButtonLertter";
import InputCode from "@/components/Inputs/InputCode";
import useVerifyCode from "@/hooks/actions/useVerifyCode";
import {useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import {check_code} from "@/types/actions";

export default function VerifyCodForm(){

    const [code, setCode] = useState<number>(0)
    const {post, error, loading} = useVerifyCode()

    const search = useSearchParams()


    const VerifyCode = (code:string) =>{
        if(code || loading) return

    }

    return(
        <Box
            sx={{
                height: 600,
                width: 450,
                borderRadius: 12,
                padding:4,

                display:'flex',
                flexDirection: 'column',

                border: '1px solid transparent',
                background: 'linear-gradient(#070707, #070707) padding-box, linear-gradient(135deg, #E5E4E2, #706f6e) border-box',
            }}
        >
            <Typography>

            </Typography>
            <InputCode onComplete={VerifyCode} length={6} value={code}/>
            <ButtonLetter>
                dfgdfgdf
            </ButtonLetter>
        </Box>
    )
}