import React, { ReactNode } from 'react'
import { Box, TextField, Typography, useTheme, SxProps, Theme } from "@mui/material";


interface InputLetterProps{
    value?: string;
    label?: string;
    id: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    sx?: SxProps<Theme>;
    placeholder?: string;
    error?: boolean;
    helperText?: ReactNode | string;
    required?: boolean;
    disabled?: boolean;
    type: string;
    compact?: boolean;

}

export default function InputLetter({value, label, id, onChange, onBlur, sx, placeholder, error, helperText, required, type}:InputLetterProps){
    return(
        <Box>
            {label && (<Typography>
                {label}
                {required ? ' *' : ''}
            </Typography>)}
            <TextField
                fullWidth
                id={id}
                size="small"
                variant="outlined"
                hiddenLabel
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                error={error}
                helperText={helperText}
                required={required}
                type={type}
            />
        </Box>
    )
}