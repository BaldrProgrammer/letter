import {Box} from "@mui/material";
import InputLetter from "@/components/Inputs/InputLetter";


export default function RegForm(){
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
            <InputLetter id={'1'} placeholder={"Vorname"}/>
            <InputLetter id={'2'} placeholder={"Nachname"}/>
        </Box>
    )
}