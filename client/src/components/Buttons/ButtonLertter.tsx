import React from "react";
import {Button} from "@mui/material";

interface ButtonLetterProps{
    children: React.ReactNode
}

export default function ButtonLetter({children}:ButtonLetterProps) {
    return(
        <Button
            sx={{
                borderRadius:'14px',
                background:'#f8f8f7',
                color:'#070707',
            }}
            variant={'contained'}
        >
            {children}
        </Button>
    )
}