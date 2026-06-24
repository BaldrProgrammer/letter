'use client';

import React from 'react';
import Button from '@mui/material/Button';
import { Box, SxProps } from '@mui/material';


interface IButtonLetterVolumetric {
    children: React.ReactNode;
    sx?: SxProps;
    onClick?: () => void;
    isDisabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    endIcon?: React.ReactNode;
    startIcon?: React.ReactNode;
    isLoading?: boolean;
    loaderSize?: number;
    loaderColor?: string;
    showTextOnLoading?: boolean;
}

const ButtonLetterVolumetric: React.FC<IButtonLetterVolumetric> = ({
                                                                       children,
                                                                       sx = {},
                                                                       onClick,
                                                                       isDisabled,
                                                                       type = 'button',
                                                                       endIcon,
                                                                       startIcon,
                                                                       isLoading = false,
                                                                       showTextOnLoading = false,
                                                                   }) => {
    const disabled = isDisabled || isLoading;

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    return (
        <Box
            sx={{
                borderRadius: '45px',
            }}
        >
            <Button
                type={type}
                disabled={disabled}
                disableRipple
                onClick={handleClick}
                endIcon={isLoading ? undefined : endIcon}
                startIcon={startIcon}
                sx={{
                    fontFamily: 'Tilda_Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

                    width: '100%',
                    height: '37px',
                    fontSize: '1rem',
                    borderRadius: '40px',
                    fontWeight: 600,
                    textTransform: 'none',
                    backgroundImage: 'linear-gradient(to bottom, #FFFFFF 20%, #EAEAEA 100%)',
                    transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.2s ease, background-image 0.2s ease',
                    p: '8px 16px',
                    color: '#070707',
                    boxShadow:
                        '0 12px 24px -4px rgba(0, 0, 0, 0.18), ' +
                        '0 4px 6px -2px rgba(0, 0, 0, 0.1), ' +
                        'inset 0 -4px 6px -1px rgba(0, 0, 0, 0.4), ' +
                        'inset 0 3px 4px -1px rgba(255, 255, 255, 0.9), ' +
                        'inset 0 0 4px 1px rgba(255, 255, 255, 1), ' +
                        'inset 0 15px 25px 0 rgba(255, 255, 255, 0.5)',

                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    '@keyframes shadowSequenceWhite': {
                        '0%': {
                            boxShadow:
                                '0 6px 12px -4px rgba(0, 0, 0, 0.15), ' +
                                'inset 0 -8px 25px 1px rgba(255, 255, 255, 0.9), ' +
                                'inset 0 6px 20px 0 rgba(0, 0, 0, 0.15), ' +
                                'inset 0 0 10px 1px rgba(0, 0, 0, 0.05)',
                        },
                        '20%': {
                            boxShadow:
                                'inset 0 2px 4px 0 rgba(255, 255, 255, 0.9), ' +
                                '0 4px 8px -4px rgba(0, 0, 0, 0.1), ' +
                                'inset 0 -8px 22px 1px rgba(255, 255, 255, 0.8), ' +
                                'inset 0 8px 12px 0 rgba(0, 0, 0, 0.2), ' +
                                'inset 0 0 12px 1px rgba(0, 0, 0, 0.08)',
                        },
                        '100%': {
                            boxShadow:
                                'inset 0 2px 4px 0 rgba(255, 255, 255, 0.9), ' +
                                '0 4px 8px -4px rgba(0, 0, 0, 0.05), ' +
                                'inset 0 -3px 5px -1px rgba(0, 0, 0, 0.05), ' +
                                'inset 0 -8px 14px -1px rgba(255, 255, 255, 0.9), ' +
                                'inset 0 5px 12px 0 rgba(0, 0, 0, 0.18), ' +
                                'inset 0 0 5px 1px rgba(0, 0, 0, 0.05)',
                        },
                    },

                    '&:active': {
                        transform: 'none',
                        animation: 'shadowSequenceWhite 0.5s ease',
                        boxShadow:
                            'inset 0 2px 4px 0 rgba(255, 255, 255, 0.9), ' +
                            '0 4px 8px -4px rgba(0, 0, 0, 0.05), ' +
                            'inset 0 -3px 5px -1px rgba(0, 0, 0, 0.05), ' +
                            'inset 0 -8px 14px -1px rgba(255, 255, 255, 0.9), ' +
                            'inset 0 5px 12px 0 rgba(0, 0, 0, 0.18), ' +
                            'inset 0 0 5px 1px rgba(0, 0, 0, 0.05)',
                    },

                    '&:hover': {
                        backgroundImage: 'linear-gradient(to bottom, #FFFFFF 10%, #E2E2E0 100%)',
                        boxShadow:
                            '0 16px 28px -4px rgba(0, 0, 0, 0.22), ' +
                            '0 6px 10px -2px rgba(0, 0, 0, 0.12), ' +
                            'inset 0 -4px 6px -1px rgba(0, 0, 0, 0.4), ' +
                            'inset 0 3px 4px -1px rgba(255, 255, 255, 0.9), ' +
                            'inset 0 0 4px 1px rgba(255, 255, 255, 1), ' +
                            'inset 0 15px 25px 0 rgba(255, 255, 255, 0.5)',
                        transform: 'none',
                    },
                    '&:focus': {
                        transform: 'none !important',
                    },
                    '&:focus-visible': {
                        outline: 'none',
                        transform: 'none !important',
                    },
                    '&:disabled': {
                        opacity: 0.4,
                        color: '#A0A0A0',
                        border: '2px solid #E0E0E0',
                        backgroundImage: 'none',
                        backgroundColor: '#F5F5F5',
                        boxShadow: 'none',
                    },
                    ...sx,
                }}

            >
                <div
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        transition: 'transform 0.2s ease, opacity 0.2s ease',
                        transform: 'scale(1)',
                        fontFamily: 'inherit',
                    }}
                    className="button-text"
                >
          <span
              style={{
                  opacity: isLoading ? 0 : 1,
                  transition: 'opacity 0.2s ease',
                  display: 'inline-block',
                  fontFamily: 'inherit',
              }}
          >
            {children}
          </span>
                </div>

                {isLoading && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: showTextOnLoading ? '12px' : '0',
                        }}
                    >
                        {showTextOnLoading && <span style={{ color: '#070707', fontSize: '14px', fontFamily: 'inherit' }}>{children}</span>}
                    </div>
                )}
            </Button>
        </Box>
    );
};

const addGlobalStyles = () => {
    if (typeof document !== 'undefined') {
        const styleId = 'button-letter-volumetric-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
        .button-text {
          transition: transform 0.2s ease !important;
          font-family: inherit;
        }
        
        button:active .button-text {
          transform: scale(0.98+9) !important;
          color: rgba(7, 7, 7, 0.7);
        }
        
        button:disabled .button-text {
          transform: scale(1) !important;
        }
      `;
            document.head.appendChild(style);
        }
    }
};

if (typeof window !== 'undefined') {
    addGlobalStyles();
}

export default ButtonLetterVolumetric;
