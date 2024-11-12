'use client'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'

import {
    Box,
    Button,
    CircularProgress,
    Modal,
    TextField,
    Typography,
} from '@mui/material'

interface ModalLoginWithGitHubProps {
    open: boolean
    onClose: () => void
}

export function ModalLoginWithGitHub({
    open,
    onClose,
}: ModalLoginWithGitHubProps) {
    const { login, isLoading, error, user } = useAuth()
    const [username, setUsername] = useState('')

    const handleLogin = async () => {
        await login(username)
    }

    useEffect(() => {
        if (user) {
            onClose()
        }
    }, [user, onClose])

    return (
        <Modal open={open} onClose={onClose} aria-labelledby='login-modal'>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                <Typography variant='h6' component='h2' mb={2}>
                    Login com GitHub
                </Typography>
                <Typography variant='subtitle2' component='p' mb={2}>
                    Insira o seu nome de usuário do GitHub para utilizar todos
                    os recursos do Pokedex
                </Typography>
                <TextField
                    fullWidth
                    label='Login'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin='normal'
                    error={!!error}
                    helperText={error}
                />
                <Button
                    fullWidth
                    variant='contained'
                    onClick={handleLogin}
                    disabled={!username || isLoading}
                    sx={{ mt: 2 }}>
                    {isLoading ? <CircularProgress size={24} /> : 'Entrar'}
                </Button>
            </Box>
        </Modal>
    )
}
