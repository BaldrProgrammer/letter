'use client'

import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from "react";

export default function SearchBar() {
    const [value, setValue] = useState<string>('')


    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            height: '50px',
            width: '100%',
            borderRadius: 12,
            border: '1px solid transparent',
            background: 'linear-gradient(#070707, #070707) padding-box, linear-gradient(135deg, #E5E4E2, #706f6e) border-box',
            px: 2,
            boxSizing: 'border-box',
            transition: 'all 0.2s ease',
            '&:focus-within': {
                boxShadow: '0 0 0 2px rgba(229, 228, 226, 0.2)',
            }
        }}>
            <SearchIcon sx={{
                color: '#706f6e',
                mr: 1.5,
                fontSize: '20px'
            }} />
            <InputBase
                placeholder="Поиск"
                value={value}
                slotProps={{
                    input: {
                        'aria-label': 'search',
                    },
                }}
                sx={{
                    color: '#E5E4E2',
                    width: '100%',
                    '& .MuiInputBase-input': {
                        padding: 0,
                        fontSize: '15px',
                        '&::placeholder': {
                            color: '#706f6e',
                            opacity: 1,
                        },
                    },
                }}
            />
        </Box>
    );
}
