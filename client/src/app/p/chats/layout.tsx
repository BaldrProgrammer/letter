import {Box} from "@mui/material";
import NavBar from "@/components/NavBars/NavBar";

export default function ChatLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
       <Box sx={{height:'100vh', padding:3,}}>
           <NavBar/>
           {children}
       </Box>
    );
}
