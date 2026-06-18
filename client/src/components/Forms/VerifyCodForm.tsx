'use client'

import { Box, Typography } from "@mui/material";
import ButtonLetter from "@/components/Buttons/ButtonLertter";
import InputCode from "@/components/Inputs/InputCode";
import useVerifyCode from "@/hooks/actions/useVerifyCode";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function VerifyCodForm() {

    const [email, setEmail] = useState<string>('');
    const [auth, setAuth] = useState<boolean>(false);
    const { post, error, loading } = useVerifyCode();
    const search = useSearchParams();
    const navigate = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        setAuth(!!token);
        const emailParam = search.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [search]);

    const handleVerify = async (completedCode: string) => {
        if (!completedCode || completedCode.length !== 6 || loading || !email) return;

        const numericCode = parseInt(completedCode, 10);
        const success = await post({
            email: email,
            code: numericCode,
            is_Login: auth,
        });
        if (success) {
            console.log("Успешная авторизация/подтверждение!");
            if (!auth) {
                navigate.push('/auth/reg');
            } else {
                navigate.push('/p/chats');
            }
        }
    };

    return (
        <Box
            sx={{
                height: 600,
                width: 450,
                borderRadius: 12,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid transparent',
                background: 'linear-gradient(#070707, #070707) padding-box, linear-gradient(135deg, #E5E4E2, #706f6e) border-box',
            }}
        >
            <Typography sx={{ color: '#9c9c9b', textAlign: 'center' }} variant={'h4'}>
                Bestätigung
            </Typography>

            {email && (
                <Typography sx={{ color: '#666', textAlign: 'center', mt: 1, fontSize: '14px' }}>
                    Код отправлен на {email}
                </Typography>
            )}
            <InputCode onComplete={handleVerify} length={6} />
            <ButtonLetter>
                {loading ? "Überprüfung..." : "Absenden"}
            </ButtonLetter>
        </Box>
    );
}
