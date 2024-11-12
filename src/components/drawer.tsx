'use client'

import {
    Box,
    Button,
    Chip,
    Divider,
    Drawer,
    IconButton,
    Skeleton,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

import { useAuth } from '@/hooks/auth'
import { api } from '@/services/api'
import { getTypeColor } from '@/theme/colors'
import { getTypeIcon } from '@/theme/icons'
import type { Evolution, PokemonDetails } from '@/types/pokemon'
import axios from 'axios'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { ModalLoginWithGitHub } from './modal-login'

export interface DrawerPokemonProps {
    selectedPokemon: PokemonDetails | null
    comment: string
    setComment: (comment: string) => void
    liked: boolean
    setLiked: (liked: boolean) => void
    handleCommentSubmit: () => void
    open: boolean
    onClose: () => void
}

function PokemonEvolutionSkeleton() {
    return (
        <Box
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            mt={4}
            gap={2}>
            <Skeleton variant='circular' width={50} height={50} />
            <Skeleton variant='text' width={50} height={20} />
        </Box>
    )
}

export function DrawerPokemon({
    open,
    onClose,
    selectedPokemon,
    comment,
    setComment,
    liked,
    setLiked,
    handleCommentSubmit,
}: DrawerPokemonProps) {
    const [evolutions, setEvolutions] = useState<Evolution[]>([])
    const [loadingEvolutions, setLoadingEvolutions] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        if (selectedPokemon) {
            fetchEvolutions()
        }
    }, [selectedPokemon])

    const fetchEvolutions = async () => {
        if (!selectedPokemon) return

        setLoadingEvolutions(true)

        try {
            const speciesResponse = await axios.get(selectedPokemon.species.url)
            const evolutionChainUrl = speciesResponse.data.evolution_chain.url
            const evolutionResponse = await axios.get(evolutionChainUrl)

            const evoChain: Evolution[] = []
            let evoData = evolutionResponse.data.chain

            do {
                const evoDetails = evoData.species
                const pokemonResponse = await api.pokeApi.get(
                    `/pokemon/${evoDetails.name}`
                )

                evoChain.push({
                    id: pokemonResponse.data.id,
                    name: evoDetails.name,
                    sprite: pokemonResponse.data.sprites.front_default,
                })

                evoData = evoData.evolves_to[0]
                // biome-ignore lint/complexity/useOptionalChain: ignore type for biome
                // biome-ignore lint/suspicious/noPrototypeBuiltins: ignore type for biome
            } while (evoData && evoData.hasOwnProperty('evolves_to'))

            setEvolutions(evoChain)
        } catch (error) {
            toast.error('Erro ao buscar as evoluções')
        } finally {
            setLoadingEvolutions(false)
        }
    }

    if (!selectedPokemon) return null

    return (
        <Drawer anchor='right' open={open} onClose={onClose}>
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                }}>
                <Box
                    sx={{
                        p: 3,
                        backgroundImage: `
                      linear-gradient(to bottom right, 
                      ${getTypeColor(selectedPokemon.types[0].type.name)}, 
                      ${getTypeColor(selectedPokemon.types[selectedPokemon.types.length - 1].type.name)})
                    `,
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                    }}>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'white',
                        }}
                        aria-label='Close drawer'>
                        <X />
                    </IconButton>
                    <img
                        src={
                            selectedPokemon.sprites.other['official-artwork']
                                .front_default ||
                            selectedPokemon.sprites.front_default
                        }
                        alt={selectedPokemon.name}
                        style={{
                            width: '150px',
                            height: '150px',
                            marginBottom: '1rem',
                        }}
                    />
                    <Typography variant='h4' fontWeight='bold' mb={2}>
                        {selectedPokemon.name.charAt(0).toUpperCase() +
                            selectedPokemon.name.slice(1)}
                    </Typography>
                    <Box display='flex' gap={1} mb={2}>
                        {selectedPokemon.types.map((type) => (
                            <Chip
                                key={type.type.name}
                                label={type.type.name}
                                icon={getTypeIcon(type.type.name)}
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    borderRadius: 2,
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
                    <Typography variant='h6' fontWeight='bold' mt={2} mb={1}>
                        Habilidades
                    </Typography>
                    <Box display='flex' gap={1} mb={2}>
                        {selectedPokemon.abilities.map((ability) => (
                            <Chip
                                key={ability.ability.name}
                                label={ability.ability.name}
                                variant='outlined'
                                sx={{
                                    borderRadius: 2,
                                    backgroundColor: getTypeColor(
                                        ability.ability.name
                                    ),
                                }}
                            />
                        ))}
                    </Box>

                    <Typography variant='h6' fontWeight='bold' mt={2} mb={1}>
                        Status
                    </Typography>
                    {selectedPokemon.stats.map((stat) => (
                        <Box key={stat.stat.name} mb={1}>
                            <Typography variant='body2' color='text.secondary'>
                                {String(stat.stat.name).replaceAll('-', ' ')}
                            </Typography>
                            <Box
                                sx={{
                                    width: '100%',
                                    bgcolor: 'grey.300',
                                    borderRadius: 1,
                                    height: 10,
                                }}>
                                <Box
                                    sx={{
                                        width: `${(stat.base_stat / 255) * 100}%`,
                                        bgcolor: getTypeColor(
                                            selectedPokemon.types[0].type.name
                                        ),
                                        borderRadius: 1,
                                        height: '100%',
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}

                    <Typography variant='h6' fontWeight='bold' mt={2} mb={1}>
                        Evoluções
                    </Typography>
                    {loadingEvolutions ? (
                        <Box display='flex' justifyContent='center' gap={4}>
                            <PokemonEvolutionSkeleton />
                            <PokemonEvolutionSkeleton />
                            <PokemonEvolutionSkeleton />
                        </Box>
                    ) : (
                        <Box
                            display='flex'
                            justifyContent='space-around'
                            mb={2}>
                            {evolutions.map((evolution) => (
                                <Box
                                    key={evolution.id}
                                    display='flex'
                                    flexDirection='column'
                                    alignItems='center'>
                                    <img
                                        src={evolution.sprite}
                                        alt={evolution.name}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                        }}
                                    />
                                    <Typography variant='caption'>
                                        {evolution.name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}

                    <Divider orientation='horizontal' flexItem />

                    {user ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography
                                variant='h6'
                                fontWeight='bold'
                                mt={3}
                                mb={2}>
                                Escreva um comentário
                            </Typography>
                            <TextField
                                label='Digite seu comentário aqui...'
                                multiline
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                fullWidth
                                variant='outlined'
                                sx={{ mb: 2 }}
                            />
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='space-between'
                                mb={2}>
                                <Typography>
                                    {liked ? 'Curtir' : 'Descurtir'}
                                </Typography>
                                <Switch
                                    checked={liked}
                                    onChange={(e) => setLiked(e.target.checked)}
                                    color='primary'
                                />
                            </Box>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleCommentSubmit}
                                fullWidth
                                sx={{ mt: 2 }}>
                                Enviar comentário
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            display='flex'
                            flexDirection='column'
                            gap={2}
                            mt={2}>
                            <Typography>
                                Realize o login para comentar e curtir um
                                Pokémon
                            </Typography>
                            <Button
                                variant='contained'
                                onClick={() => setOpenModal(true)}>
                                Login
                            </Button>
                        </Box>
                    )}

                    <ModalLoginWithGitHub
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                    />
                </Box>
            </Box>
        </Drawer>
    )
}
