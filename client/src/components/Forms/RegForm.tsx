'use client'

import { Box, Typography } from "@mui/material";
import InputLetter from "@/components/Inputs/InputLetter";
import ButtonLetter from "@/components/Buttons/ButtonLertter";
import { useState, useEffect } from "react";
import useReg from "@/hooks/actions/useReg";
import { useSearchParams, useRouter } from "next/navigation";
import AvatarReg from "@/components/Avatar/AvatarReg";


export default function RegForm(){
    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const [password, setPassword] = useState<string>('')

    const [step, setStep] = useState<number>(1)


    const { error, post, loading } = useReg()
    const search = useSearchParams()
    const navigate = useRouter()

    useEffect(() => {
        const emailParam = search.get('email')
        if (emailParam) {
            setEmail(emailParam)
        }
    }, [search])

    const handleReg = async () => {
        if (loading || !name.trim() || !lastName.trim() || !username.trim()) return
        const cleanUsername = username.replace('@', '').trim()

        const success = await post({
            first_name: name,
            last_name: lastName,
            email: email,
            username: cleanUsername,
            password:password,
        })

        if (success) {
            navigate.push('/p/chats')
        }
    }

    const NextStep = () => {
        setStep(2)
    }

    return(
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
            {
                step == 1 ? (
                    <>
                        <Typography sx={{ color: '#9c9c9b', textAlign: 'center', mb: 3 }} variant={'h4'}>
                            Registrierung
                        </Typography>
                        <Box sx={{
                            display:'flex',
                            flexDirection:'column',
                            gap:2,
                            mb:4,
                        }}>
                            <AvatarReg onFileSelect={()=>console.log('')}/>

                            <InputLetter
                                id={'1'}
                                placeholder={"Vorname"}
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            />
                            <InputLetter
                                id={'2'}
                                placeholder={"Nachname"}
                                value={lastName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                            />
                            <InputLetter
                                id={'3'}
                                placeholder={"@username"}
                                value={username}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const val = e.target.value;
                                    if (val && !val.startsWith('@')) {
                                        setUsername('@' + val);
                                    } else {
                                        setUsername(val);
                                    }
                                }}
                            />
                        </Box>
                        <ButtonLetter
                            onClick={NextStep}
                        >
                            Weiter
                        </ButtonLetter>

                        {error && (
                            <Typography color="error" sx={{ mt: 2, textAlign: 'center', fontSize: '14px' }}>
                                Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.
                            </Typography>
                        )}
                    </>
                ) :
                    (
                        <>
                            <Typography sx={{ color: '#9c9c9b', textAlign: 'center', mb: 3 }} variant={'h4'}>
                                Möchten Sie ein Passwort?
                            </Typography>
                            <InputLetter
                                id={'4'}
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                            <ButtonLetter
                                onClick={handleReg}
                            >
                                {password === '' ? 'Weiter' : 'Speichern'}
                            </ButtonLetter>
                        </>
                    )
            }
        </Box>
    )
}
