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
                height: 600,
                width: 450,
                borderRadius: 12,
                padding:4,

                display:'flex',
                flexDirection: 'column',

                border: '1px solid transparent',
                background: 'linear-gradient(#1E1E1EFF, #121212) padding-box, linear-gradient(135deg, #5a5a5a, #706f6e) border-box',
            }}
        >
            <Typography
                sx={{
                    mb:4,
                    textAlign:'center',
                    backgroundImage: 'linear-gradient(135deg, #5a5a5a 30%, #e0e0e0 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
                variant={'h4'}
            >
                Mailformular
            </Typography>
            <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', py:4}}>
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
    );
}