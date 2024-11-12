'use client'

import Pokebola from '@/assets/pokebola.png'
import Particles from '@/components/particle'
import { Box, Button, Container, Typography, keyframes } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export default function home() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #1a237e 0%, #4a148c 100%)',
            }}>
            <Image
                alt='Mountains'
                src={'/hero-background.svg'}
                fill
                sizes='(min-width: 120rem) 50vw, 100vw'
                style={{
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                }}
                quality={100}
                priority
            />
            <Particles quantity={100} />
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '100px',
                    height: '100px',
                    animation: `${spin} 20s linear infinite`,
                }}>
                <Image src={Pokebola} alt='Pokebola' width={100} height={100} />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '15%',
                    right: '10%',
                    width: '80px',
                    height: '80px',
                    animation: `${spin} 15s linear infinite reverse`,
                }}>
                <Image src={Pokebola} alt='Pokebola' width={80} height={80} />
            </Box>

            <Container maxWidth='lg'>
                <Box
                    sx={{
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 1,
                    }}>
                    <Typography
                        component='h1'
                        sx={{
                            fontSize: { xs: '3rem', md: '5rem' },
                            fontWeight: 'bold',
                            mb: 2,
                            background:
                                'linear-gradient(45deg, #FFD700, #FFA500)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.5px',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        }}>
                        Pokédex
                    </Typography>
                    <Typography
                        variant='h5'
                        sx={{
                            color: '#ffffff',
                            mb: 4,
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        }}>
                        Veja uma coleção excluiva de Pokémon Únicos!
                    </Typography>
                    <Link href='/catalog'>
                        <Button
                            variant='contained'
                            size='large'
                            sx={{
                                bgcolor: '#FF4081',
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                borderRadius: '50px',
                                boxShadow: '0 4px 20px rgba(255, 64, 129, 0.5)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: '#F50057',
                                    transform: 'translateY(-5px)',
                                    boxShadow:
                                        '0 6px 25px rgba(255, 64, 129, 0.7)',
                                },
                                zIndex: 2,
                            }}>
                            EXPLORAR COLEÇÃO
                        </Button>
                    </Link>
                </Box>
            </Container>

            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '15%',
                    animation: `${float} 6s ease-in-out infinite`,
                }}>
                <Image src={Pokebola} alt='Pokebola' width={150} height={150} />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: '15%',
                    right: '10%',
                    animation: `${float} 5s ease-in-out infinite`,
                    animationDelay: '1s',
                }}>
                <Image src={Pokebola} alt='Pokebola' width={120} height={120} />
            </Box>
        </Box>
    )
}
