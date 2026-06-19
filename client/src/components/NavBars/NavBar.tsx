import {Box} from "@mui/material";
import ChatsBar from "@/components/NavBars/ChatsBar";
import SearchBar from "@/components/NavBars/SearchBar";

export default function NavBar(){
    return(
        <Box sx={{height:'100%', width:'380px', display:'flex', flexDirection:'column', gap:2}}>
            <SearchBar/>
            <ChatsBar/>
        </Box>
    )
}