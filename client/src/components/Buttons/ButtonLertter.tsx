import React from "react";
import {Button} from "@mui/material";

interface ButtonLetterProps{
    children: React.ReactNode
}

export default function ButtonLetter({children}:ButtonLetterProps) {
    return(
        <Button>
            {children}
        </Button>
    )
}