import {Box, Button} from "@mui/material";
import {Input, Typography} from "@mui/material";
import {flexDirection} from "@mui/system";


export default function MailForm() {
    return (
        <Box
            sx={{
                height: 600,
                width: 450,
                borderRadius: 12,
                pading:2,
                overflow: 'hidden',
                display:'flex',
                flexDirection: 'column',

                border: '1px solid transparent',
                background: 'linear-gradient(#070707, #070707) padding-box, linear-gradient(135deg, #E5E4E2, #706f6e) border-box',
            }}
        >
            <Typography
              sx={{color:'#E5E4E2', textAlign:'center'}}
              variant={'h4'}
            >
                Mailformular
            </Typography>
            <Input />
            <Button
                sx={{

                }}
            >
                Получить код
            </Button>
        </Box>
    );
}