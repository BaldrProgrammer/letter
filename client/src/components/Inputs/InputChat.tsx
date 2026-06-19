import {Box} from "@mui/material";
import InputLetter from "@/components/Inputs/InputLetter";

export default function InputChat(){
    return(
        <Box sx={{width:'80%'}}>
            <InputLetter id={'1'} placeholder={'Nachricht'}/>
        </Box>
    )
}