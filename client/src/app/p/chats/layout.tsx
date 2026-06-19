import {Box} from "@mui/material";
import NavBar from "@/components/NavBars/NavBar";

export default function ChatLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
       <Box sx={{height:'100vh',width:'100wh', padding:3,display:'flex'}}>
           <NavBar/>
           <Box sx={{width:'45%', margin:'0px auto'}}>
               {children}
           </Box>
       </Box>
    );
}
