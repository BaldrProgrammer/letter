import {Box} from "@mui/material";
import Image from "next/image";

interface AvatarProps{
    Img:string
}

export default function Avatar({Img}:AvatarProps){
    return(
        <Box sx={{
            width:'100px',
            height:'100px',
            borderRadius:'100%',
            border: '1px solid transparent',
            background: 'linear-gradient(#070707, #070707) padding-box, linear-gradient(135deg, #E5E4E2, #706f6e) border-box'
        }}>
            <Image src={Img} alt={'logo'} width={100} height={100}/>
        </Box>
    )
}