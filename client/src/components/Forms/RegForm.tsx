'use client'

import {Box} from "@mui/material";
import InputLetter from "@/components/Inputs/InputLetter";
import ButtonLetter from "@/components/Buttons/ButtonLertter";
import {useState} from "react";
import useReg from "@/hooks/actions/useReg";


export default function RegForm(){

    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const {error, post, loading} = useReg()

    const handleReg = async () => {
        if (loading)return


    }

    return(
        <Box
            sx={{
                height: 600,
                width: 450,
                borderRadius: 12,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid transparent',
                background: 'linear-gradient(#070707, #070707) padding-box, linear-gradient(135deg, #E5E4E2, #706f6e) border-box',
            }}
        >
            <InputLetter id={'1'} placeholder={"Vorname"} value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
            <InputLetter id={'2'} placeholder={"Nachname"} value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}/>
            <ButtonLetter>
                Registrieren
            </ButtonLetter>
        </Box>
    )
}