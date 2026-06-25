'use client'

import {Box} from "@mui/material";
import ChatsBar from "@/components/NavBars/ChatsBar";
import SearchBar from "@/components/NavBars/SearchBar";
import {useUser} from "@/context/userContext";

export default function NavBar(){
    const {user} = useUser()

    return(
        <Box sx={{height:'100%', width:'380px', display:'flex', flexDirection:'column', gap:2, color:'red'}}>
            <SearchBar/>
            <ChatsBar/>
        </Box>
    )
}