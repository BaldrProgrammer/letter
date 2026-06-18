import {Box} from "@mui/material";
import InputLetter from "@/components/Inputs/InputLetter";
import RegForm from "@/components/Forms/RegForm";


export default function ModuleReg(){
    return(
        <Box sx={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <RegForm/>
        </Box>
    )
}