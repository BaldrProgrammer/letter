'use client'
import { useRef, useState } from "react";
import { Box, Input } from "@mui/material";

interface CodeInputProps {
    length?: number;
    onComplete: (code: string) => void;
}

export default function InputCode({ length = 4, onComplete }: CodeInputProps) {
    const [code, setCode] = useState<string[]>(new Array(length).fill(""));
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const handleChange = (value: string, index: number) => {
        if (/[^0-9]/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        const fullCode = newCode.join("");
        if (fullCode.length === length) {
            onComplete(fullCode);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {

        if (e.key === "Backspace" && !code[index] && index > 0) {
            const newCode = [...code];
            newCode[index - 1] = "";
            setCode(newCode);
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', my: 4 }}>
            {code.map((num, idx) => (
                <Input
                    key={idx}
                    inputRef={(el) => (inputsRef.current[idx] = el)}
                    value={num}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onKeyDown={(e:any) => handleKeyDown(e, idx)}
                    slotProps={{
                        input: {
                            maxLength: 1,
                            style: { textAlign: 'center', fontSize: '24px', color: '#fff' }
                        }
                    }}
                    sx={{
                        width: 56,
                        height: 56,
                        backgroundColor: '#1c1c1c',
                        border: '1px solid #706f6e',
                        borderRadius: 2,
                        '&:after': { borderColor: '#E5E4E2' },
                        '&.Mui-focused': { borderColor: '#E5E4E2' }
                    }}
                />
            ))}
        </Box>
    );
}
