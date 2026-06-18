'use client'

import {Box} from "@mui/material";
import VerifyCodForm from "@/components/Forms/VerifyCodForm";

export default function ModuleAuthVefiryCode(){
    return(
        <Box sx={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <VerifyCodForm/>
        </Box>
    )
}