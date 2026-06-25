import {Box} from "@mui/material";
import {User} from "@/types/actions";
import ButtonLertter from "@/components/Buttons/ButtonLertter";

interface UserCArdProps{
    first_name:string,
    last_name:string,
    username:string
}


export default function UserCard({first_name, last_name, username}:UserCArdProps){
    return(
        <Box
            sx={{
                color:'red'
            }}
        >
            {first_name}
            <br/>
            {last_name}
            <br/>
            @{username}
        </Box>
    )
}