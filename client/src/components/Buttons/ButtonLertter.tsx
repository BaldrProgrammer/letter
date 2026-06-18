import React from "react";
import {Button} from "@mui/material";

interface ButtonLetterProps{
    children: React.ReactNode,
    onClick?: () => void
}

export default function ButtonLetter({children, onClick}:ButtonLetterProps) {
    return(
        <Button
            sx={{
                borderRadius:'14px',
                background:'#f8f8f7',
                color:'#070707',
            }}
            variant={'contained'}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}