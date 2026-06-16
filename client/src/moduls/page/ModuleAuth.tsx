import {Box} from "@mui/material";
import MailForm from "@/components/Forms/MailForm";

export  default function ModulAuth(){
    return(
        <Box sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
        }}>
            <MailForm/>
        </Box>
    )
}