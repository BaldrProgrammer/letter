import Avatar from "@/components/Avatar/Avatar";
import {Box} from "@mui/material";

interface AvatarCardProps{
    Image: string | null
}

export default function AvatarCard({Image}:AvatarCardProps){
    return(
        <Box sx={{width:'100%', height:'150px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Avatar Img={Image}/>
        </Box>
    )
}