import {Box} from "@mui/material";
import HeaderChat from "@/components/Headers/HeaderChat";
import InputChat from "@/components/Inputs/InputChat";

export default function ModuleUsername(){
    return(
        <Box sx={{height:'90vh', display:'flex', flexDirection:'column', justifyContent: "space-between"}}>
            <HeaderChat/>
            <InputChat/>
        </Box>
    )
}