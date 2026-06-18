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
                background: 'linear-gradient(#070707, #070707) padding-box, linear-gradient(135deg, #E5E4E2, #706f6e) border-box',
            }}
        >
            <Typography
              sx={{color:'#9c9c9b', textAlign:'center'}}
              variant={'h4'}
            >
                Mailformular
            </Typography>
            <InputLetter
                id={'1'}
                placeholder={'ein E-Mail-Adresse'}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
            <ButtonLetter onClick={handlePost}>
                Code erhalten
            </ButtonLetter>
        </Box>
    );
}