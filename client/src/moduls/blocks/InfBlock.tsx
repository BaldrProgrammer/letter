'use client'

import {Box} from "@mui/material";
import Avatar from "@/components/Avatar/Avatar";
import {useUser} from "@/context/userContext";
import UserCard from "@/components/Card/UserCard";
import ButtonLertter from "@/components/Buttons/ButtonLertter";
import AvatarCard from "@/components/Card/AvatarCard";

export default function infBlock(){

    const { user, isLoading,logout } = useUser();

    return(
        <Box sx={{
            height:'100%',
            width:'380px',
            padding:3,
            borderRadius:8,
            border: '1px solid transparent',
            background: 'linear-gradient(#070707, #070707) padding-box, linear-gradient(135deg, #E5E4E2, #706f6e) border-box',
        }}>
            <AvatarCard/>
            <UserCard
                first_name={user?.first_name || ''}
                last_name={user?.last_name || ''}
                username={user?.username || ''}
            />
        </Box>
    )
}