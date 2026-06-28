'use client'

import { Box, Typography } from "@mui/material";
import ButtonLetter from "@/components/Buttons/ButtonLertter";
import InputCode from "@/components/Inputs/InputCode";
import useVerifyCode from "@/hooks/actions/useVerifyCode";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyCodForm() {
    const [email, setEmail] = useState<string>('');
    const [code, setCode] = useState<string>(''); // Хранит код для нажатия по кнопкам

    const { post, error, loading } = useVerifyCode();
    const search = useSearchParams();
    const navigate = useRouter();

    useEffect(() => {
        const emailParam = search.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [search]);
    const handleVerifyR = async (completedCode: string) => {
        if (!completedCode || completedCode.length !== 6 || loading || !email) return;

        const numericCode = parseInt(completedCode, 10);
        const success = await post({
            email: email,
            code: numericCode,
            is_Login: false,
        });

        if (success) {
            navigate.push(`/auth/reg?email=${encodeURIComponent(email)}`);
        }
    };
    const handleVerifyL = async (completedCode: string) => {
        if (!completedCode || completedCode.length !== 6 || loading || !email) return;

        const numericCode = parseInt(completedCode, 10);
        const success = await post({
            email: email,
            code: numericCode,
            is_Login: true,
        });

        if (success) {
            navigate.push('/p/chats');
        }
    };

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
                Bestätigung
            </Typography>
            <Box
                sx={{
                    zIndex:23,
                    height: 350,
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
                        top: '300px',
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
                {email && (
                    <Typography sx={{ color: '#666', textAlign: 'center', mt: 1, fontSize: '14px' }}>
                        Der Code wurde an {email} gesendet
                    </Typography>
                )}
                <InputCode
                    onComplete={()=> {}}
                    onChange={setCode}
                    length={6}
                />

                <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <ButtonLetter
                        onClick={() => handleVerifyR(code)}
                    >
                        {loading ? "Überprüfung..." : "Registrieren"}
                    </ButtonLetter>
                    <ButtonLetter
                        onClick={() => handleVerifyL(code)}
                    >
                        {loading ? "Überprüfung..." : "Einloggen"}
                    </ButtonLetter>
                </Box>

                {error && (
                    <Typography color="error" sx={{ mt: 2, textAlign: 'center', fontSize: '14px' }}>
                        Ungültiger Code. Bitte versuchen Sie es erneut.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
