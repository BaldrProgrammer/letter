import {Box} from "@mui/material";
import Avatar from "@/components/Avatar/Avatar";

export default function infBlock(){
    return(
        <Box sx={{
            height:'100%',
            width:'380px',
            borderRadius:8,
            border: '1px solid transparent',
            background: 'linear-gradient(#070707, #070707) padding-box, linear-gradient(135deg, #E5E4E2, #706f6e) border-box',
        }}>
            <Avatar Img={'/'}/>
        </Box>
    )
}