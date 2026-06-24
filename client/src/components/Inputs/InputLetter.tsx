import React, { ReactNode } from 'react';
import { Box, Typography, SxProps, Theme } from "@mui/material";

interface InputLetterProps {
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
}

export default function InputLetter({
                                        value,
                                        label,
                                        id,
                                        onChange,
                                        onBlur,
                                        sx,
                                        placeholder,
                                        error,
                                        helperText,
                                        required,
                                        disabled
                                    }: InputLetterProps) {


    const gradient = error
        ? 'linear-gradient(to right,#9c9c9b, #706f6e)'
        : 'linear-gradient(to right,#9c9c9b, #706f6e)';

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ...sx }}>
            {label && (
                <Typography component="label" htmlFor={id} variant="body2" sx={{ mb: 0.5 }}>
                    {label} {required && '*'}
                </Typography>
            )}

            <input
                id={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                style={{
                    padding: '8px 12px',
                    fontSize: '16px',
                    height:'40px',
                    outline: 'none',
                    borderRadius: '24px',

                    border: '1px solid transparent',
                    backgroundImage: `linear-gradient(#070707, #070707), ${gradient}`,
                    backgroundClip: 'padding-box, border-box',
                    backgroundOrigin: 'border-box',

                    color: '#ffffff',
                    opacity: disabled ? 0.6 : 1,
                }}
            />

            {helperText && (
                <Typography
                    variant="caption"
                    sx={{ color: error ? 'error.main' : 'text.secondary', mt: 0.5 }}
                >
                    {helperText}
                </Typography>
            )}
        </Box>
    );
}
