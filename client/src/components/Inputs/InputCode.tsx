'use client'
import { useRef, useState } from "react";
import { Box, Input } from "@mui/material";

interface InputCodeProps {
    length?: number;
    onComplete: (code: string) => void;
}

export default function InputCode({ length = 6, onComplete }: InputCodeProps) {
    // Внутренний массив для раздельного хранения каждой цифры
    const [codeArray, setCodeArray] = useState<string[]>(new Array(length).fill(""));
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const handleChange = (value: string, index: number) => {
        // Разрешаем только цифры
        if (/[^0-9]/.test(value)) return;

        const newCodeArray = [...codeArray];
        // Берем только последний введенный символ
        newCodeArray[index] = value.slice(-1);
        setCodeArray(newCodeArray);

        // Если цифра введена, фокус на следующую ячейку
        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        // Если заполнили последнюю ячейку, склеиваем код и отдаем наверх
        const fullCode = newCodeArray.join("");
        if (fullCode.length === length) {
            onComplete(fullCode);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // Стирание по Backspace
        if (e.key === "Backspace" && !codeArray[index] && index > 0) {
            const newCodeArray = [...codeArray];
            newCodeArray[index - 1] = "";
            setCodeArray(newCodeArray);
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', my: 4 }}>
            {codeArray.map((num, idx) => (
                <Input
                    key={idx}
                    inputRef={(el) => (inputsRef.current[idx] = el)}
                    value={num} // Индивидуальное значение для КАЖДОЙ ячейки
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onKeyDown={(e:any) => handleKeyDown(e, idx)}
                    slotProps={{
                        input: {
                            maxLength: 1,
                            style: { textAlign: 'center', fontSize: '20px', color: '#fff' }
                        }
                    }}
                    sx={{
                        width: 45,
                        height: 50,
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
