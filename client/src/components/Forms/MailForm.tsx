'use client'
import {Box, Button} from "@mui/material";
import {Input, Typography} from "@mui/material";
import ButtonLetter from "@/components/Buttons/ButtonLertter";
import InputLetter from "@/components/Inputs/InputLetter";
import useMail from "@/hooks/actions/useMail";
import {useState} from "react";
import {useRouter} from "next/navigation";


export default function MailForm() {
    const {post, error,date, loading} = useMail()
    const [email, setEmail] = useState("")
    const navigation = useRouter()


    const handlePost = async () => {
        if (!email || loading) return;
        const p = await post(email);
        if(p) {
            navigation.push(`/auth/verify-code?email=${encodeURIComponent(email)}`);
        }
    }

    return (
        <Box
            sx={{
                display:'flex',
                flexDirection:'column',
                position:'relative',
            }}
        >
            <Typography
                sx={{
                    mb:4,
                    textAlign:'center',
                    backgroundImage: 'linear-gradient(135deg, #fff 100%, #e0e0e0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    zIndex:1
                }}
                variant={'h1'}
            >
                Mailformular
            </Typography>
            <Box
                sx={{
                    zIndex:23,
                    height: 220,
                    width: 450,
                    borderRadius: 12,
                    padding:4,
                    margin:'0px auto',
                    bottom:80,

                    display:'flex',
                    flexDirection: 'column',

                    border: '1px solid #b3b3b3',
                    background: 'rgb(255 255 255 / 0,96)',

                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(10px)',

                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '200px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '350px',
                        height: '80px',
                        zIndex: 1,
                        background: '#b3b3b3',
                        borderRadius:'100%',
                        filter: 'blur(80px)',
                    }}
                />

                <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'end', py:3,gap:3, zIndex:2}}>
                    <InputLetter
                        id={'1'}
                        placeholder={'ein E-Mail-Adresse'}
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
                    <ButtonLetter onClick={handlePost}>
                        Code erhalten
                    </ButtonLetter>
                </Box>
            </Box>
        </Box>
    );
}
