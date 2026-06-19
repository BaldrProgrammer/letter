import {Box} from "@mui/material";
import ChatsBar from "@/components/NavBars/ChatsBar";
import SearchBar from "@/components/NavBars/SearchBar";

export default function NavBar(){
    return(
        <Box sx={{height:'100%', borderRadius:12, width:'350px', display:'flex', flexDirection:'column', gap:2}}>
            <SearchBar/>
            <ChatsBar/>
        </Box>
    )
}