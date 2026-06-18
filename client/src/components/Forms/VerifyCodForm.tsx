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
                    Der Code wurde an {email} gesendet
                </Typography>
            )}
            <InputCode
                onComplete={handleVerifyL}
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
    );
}
