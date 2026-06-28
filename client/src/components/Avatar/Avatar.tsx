import {Box} from "@mui/material";
import Image from "next/image";
import {useUser} from "@/context/userContext";

interface AvatarProps{
    Img:string|null
}

export default function Avatar({Img}:AvatarProps){

    const {user} = useUser()

    return(
        <Box sx={{
            width:'80px',
            height:'80px',
            borderRadius:'100%',
            border: '1px solid transparent',
            background: 'linear-gradient(#070707, #070707) padding-box, linear-gradient(135deg, #E5E4E2, #706f6e) border-box'
        }}>
            {Img ?
                (
                    <Image
                        src={Img}
                        alt={'logo'}
                        width={80}
                        height={80}/>)
                :
                (
                    <Box
                        sx={{
                            width:'80px',
                            height:'80px',
                            borderRadius:'100%',
                            color:'white',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            fontSize:'2rem',
                        }}
                    >
                        {user?.first_name[0]}
                    </Box>
                )
            }
        </Box>
    )
}