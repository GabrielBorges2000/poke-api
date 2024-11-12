'use client'

import Pokebola from '@/assets/pokebola.png'
import { useAuth } from '@/hooks/auth'
import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ModalLoginWithGitHub } from './modal-login'

export function Header() {
    const [openModal, setOpenModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { user, logout } = useAuth()

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box
            component='header'
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                gap: '1rem',
                backgroundColor: '#ececec',
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Link href='/'>
                    <Image
                        src={Pokebola}
                        alt='Pokebola'
                        width={50}
                        height={50}
                    />
                </Link>
                <Typography variant='h5'>Pokedex</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {user ? (
                    <>
                        <Typography
                            variant='subtitle1'
                            sx={{
                                '@media (max-width: 768px)': {
                                    display: 'none',
                                },
                            }}>
                            {user.name}
                        </Typography>
                        <Avatar
                            alt={user.name}
                            src={user.avatar_url}
                            onClick={handleAvatarClick}
                            sx={{ cursor: 'pointer' }}
                        />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}>
                            <MenuItem
                                onClick={() => {
                                    logout()
                                    handleMenuClose()
                                }}>
                                Sair
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button
                        variant='contained'
                        onClick={() => setOpenModal(true)}>
                        Login
                    </Button>
                )}
            </Box>
            <ModalLoginWithGitHub
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
        </Box>
    )
}
