import { Box, Typography } from "@mui/material";
import { User } from "@/types/actions";
import Avatar from "@/components/Avatar/Avatar";

export default function ChatCard({ first_name, last_name, fileUrl, username }: User) {
    return (
        <Box
            sx={{
                width: '100%',
                height: '75px',
                display: 'flex',
                alignItems: 'center', // Выравнивает аватар и текст строго по центру по вертикали
                px: 1.5, // Небольшие отступы по бокам карточки
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Красивый эффект при наведении, как в ТГ
                }
            }}
        >
            {/* Наш круглый аватар */}
            <Avatar Img={fileUrl || null} />

            {/* Контейнер с текстовой информацией */}
            <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography sx={{
                    color: '#E5E4E2',
                    fontWeight: 600,
                    fontSize: '15px',
                    lineHeight: '1.2'
                }}>
                    {/* Выводим имя и фамилию в одну строку с пробелом */}
                    {first_name} {last_name}
                </Typography>

                <Typography sx={{
                    color: '#706f6e',
                    fontSize: '13px',
                    mt: 0.5
                }}>
                    @{username}
                </Typography>
            </Box>
        </Box>
    );
}
