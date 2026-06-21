'use client';

import { Box } from "@mui/material";
import Image from "next/image";
import { useState, useRef, ChangeEvent } from "react";

interface AvatarRegProps {
    onFileSelect: (file: File | null) => void;
    defaultImg?: string;
}

export default function AvatarReg({ onFileSelect, defaultImg = "/default-avatar.png" }: AvatarRegProps) {
    const [imgSrc, setImgSrc] = useState<string>(defaultImg);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBoxClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const localUrl = URL.createObjectURL(file);
        setImgSrc(localUrl);
        onFileSelect(file);
    };

    return (
        <Box
            onClick={handleBoxClick}
            sx={{
                width: '100px',
                height: '100px',
                borderRadius: '100%',
                border: '1px solid transparent',
                background: 'linear-gradient(#070707, #070707) padding-box, linear-gradient(135deg, #E5E4E2, #706f6e) border-box',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                alignSelf: 'center',
                transition: 'transform 0.2s ease',
            }}
        >
            <Image
                src={imgSrc}
                alt="avatar preview"
                width={100}
                height={100}
                style={{ objectFit: 'cover' }}
            />

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
        </Box>
    );
}
