"use client"; // Добавьте эту директиву в самый верх, так как MUI ThemeProvider работает на клиенте

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import UserContext from "@/context/userContext";
import "./globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const poppins = Poppins({
    subsets: ["latin", "latin-ext"],
    weight: ["300", "400", "500", "600", "700"],
});

const theme = createTheme({
    typography: {
        fontFamily: poppins.style.fontFamily,
    },
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de" style={{ background: '#070707', color:'#9c9c9b' }}>
        <UserContext>
            <ThemeProvider theme={theme}>
                <body className={poppins.className} style={{background: '#070707'}}>
                    <CssBaseline />
                    {children}
                </body>
            </ThemeProvider>
        </UserContext>
        </html>
    );
}
