'use client'

import { Box, InputBase, CircularProgress, Typography, Collapse } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useTimeSearch } from "@/hooks/util/useTimeSeatch";
import { URL_SER } from "@/constant/const";
import ChatCard from "@/components/Card/ChatCard";
import { UserF } from "@/types/actions";

export default function SearchBar() {
    const [value, setValue] = useState<string>('');
    const [loading, isLoading] = useState<boolean>(false);
    const [data, setData] = useState<UserF[]>([]);

    const hookTimeSearch = useTimeSearch(value, 500);

    useEffect(() => {
        if (!hookTimeSearch.trim()) {
            isLoading(false);
            setData([]);
            return;
        }

        const fetCH = async () => {
            isLoading(true);
            try {
                const response = await fetch(`${URL_SER}/users/filter_by?username=${encodeURIComponent(hookTimeSearch)}`, {
                    method: 'GET',
                });
                if (response.ok) {
                    const resData = await response.json();
                    setData(resData);
                    console.log("Данные:", resData);
                }
            } catch (err: any) {
                console.error(err);
            } finally {
                isLoading(false);
            }
        };
        fetCH();

    }, [hookTimeSearch]);

    const isDropdownOpen = !!value.trim() && (data.length > 0 || !loading);

    return (

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '50px',
            width: '100%',
            borderRadius: 10,
            border: '1px solid transparent',
            background: 'linear-gradient(#070707, #070707) padding-box, linear-gradient(135deg, #E5E4E2, #706f6e) border-box',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                height: '50px',
                width: '100%',
                px: 2,
                boxSizing: 'border-box',
            }}>
                <SearchIcon sx={{ color: '#706f6e', mr: 1.5, fontSize: '20px' }} />
                <InputBase
                    placeholder="Suche"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    slotProps={{
                        input: { 'aria-label': 'search' },
                    }}
                    sx={{
                        color: '#E5E4E2',
                        width: '100%',
                        '& .MuiInputBase-input': {
                            padding: 0,
                            fontSize: '15px',
                            '&::placeholder': { color: '#706f6e', opacity: 1 },
                        },
                    }}
                />
                {loading && <CircularProgress size={20} sx={{ color: '#E5E4E2', ml: 1 }} />}
            </Box>

            <Collapse in={isDropdownOpen} timeout={300}>
                <Box sx={{ height: '1px', background: 'linear-gradient(90deg, transparent, #706f6e, transparent)', mx: 2 }} />

                <Box sx={{
                    height: '200px',
                    overflowY: 'auto',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                }}>
                    {data.length > 0 ? (
                        data.map((user) => (
                            <ChatCard
                                key={user.id}
                                first_name={user.first_name}
                                last_name={user.last_name}
                                username={user.username}
                                email={user.email}
                                fileUrl={user.fileUrl || undefined}
                            />
                        ))
                    ) : (
                        <Typography sx={{ color: '#706f6e', p: 1, textAlign: 'center', fontSize: '14px' }}>
                            Benutzer nicht gefunden
                        </Typography>
                    )}
                </Box>
            </Collapse>
        </Box>
    );
}
