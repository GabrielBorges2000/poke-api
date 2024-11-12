'use client'

import { DrawerPokemon } from '@/components/drawer'
import { Header } from '@/components/header'
import { getAllPokemons, getPokemon } from '@/functions/pokemons'
import { useAuth } from '@/hooks/auth'
import { api } from '@/services/api'
import { getTypeColor } from '@/theme/colors'
import { getTypeIcon } from '@/theme/icons'
import type { Pokemon, PokemonDetails } from '@/types/pokemon'
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Drawer,
    Typography,
} from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import axios from 'axios'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'

export default function Home() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedPokemon, setSelectedPokemon] =
        useState<PokemonDetails | null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [comment, setComment] = useState('')
    const [liked, setLiked] = useState(true)
    const { user } = useAuth()

    useEffect(() => {
        getAllPokemons()
            .then((data) => {
                setPokemons(data as Pokemon[])
                setLoading(false)
            })
            .catch((error) => {
                toast.error(
                    'Erro ao buscar Pokémons. Por favor, recarregue a página.'
                )
                setLoading(false)
            })
    }, [])

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 70,
        },
        {
            field: 'sprite',
            headerName: 'Imagem',
            width: 130,
            renderCell: (params) => (
                <Image
                    src={params.value}
                    alt={params.row.name}
                    width={50}
                    height={50}
                />
            ),
        },
        { field: 'name', headerName: 'Nome', width: 130 },
        {
            field: 'type',
            headerName: 'Tipo',
            minWidth: 400,
            flex: 1,
            renderCell: (params) =>
                params.row.types.map((type: string, index: number) => (
                    <Chip
                        key={`${params.row.id}-${type}-${index}`}
                        label={type}
                        sx={{
                            mr: 1,
                            borderRadius: 2,
                            backgroundColor: getTypeColor(type),
                            '&:hover': {
                                backgroundColor: getTypeColor(type),
                                filter: 'brightness(90%)',
                            },
                        }}
                        icon={getTypeIcon(type)}
                    />
                )),
        },

        {
            field: 'action',
            headerName: 'Detalhes',
            width: 130,
            renderCell: (params) => (
                <Button
                    variant='contained'
                    onClick={() => handleSetPokemon(params.row)}
                    sx={{
                        '&:hover': {
                            filter: 'brightness(90%)',
                        },
                    }}>
                    Detalhes
                </Button>
            ),
        },
    ]

    const handleSetPokemon = async (pokemon: Pokemon) => {
        try {
            const newPokemon = (await getPokemon(
                pokemon,
                user
            )) as PokemonDetails

            if (newPokemon) {
                setSelectedPokemon(newPokemon as PokemonDetails)
                setComment(newPokemon.userComment)
                setLiked(newPokemon.userLiked)
                setDrawerOpen(true)
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                const pokemonData = await axios
                    .get(pokemon.url)
                    .then((res) => res.data)
                const newPokemon = {
                    ...pokemonData,
                    userComment: '',
                    userLiked: false,
                }

                setSelectedPokemon(newPokemon)
                setComment('')
                setLiked(false)
                setDrawerOpen(true)
            } else {
                toast.error(
                    'Falha ao buscar detalhes do Pokémon. Por favor, tente novamente.'
                )
            }
        }
    }

    const handleCommentSubmit = async () => {
        if (!selectedPokemon) {
            toast.error(
                'Nenhum Pokémon selecionado. Por favor, selecione um Pokémon.'
            )
            return
        }


        try {
            const commentExists = await api.mockApi.get('/pokemon', {
                    params: {
                        idPokemon:  selectedPokemon.id,
                        gitHubId: user?.id || 'not-found',
                    },
                })

            console.log('commentExists', commentExists.data)

            if (commentExists.data.length > 0) {
                await api.mockApi.put(
                    `/pokemon/${commentExists.data[0].id}?gitHubId=${user?.id || 'not-found'}`,
                    {
                        comentarioPokemon: comment,
                        likeDislike: liked,
                    }
                )
            } else {
                await api.mockApi.post('/pokemon', {
                    nomePokemon: selectedPokemon.name,
                    idPokemon: selectedPokemon.id,
                    comentarioPokemon: comment,
                    likeDislike: liked,
                    gitHubId: user?.id || 'not-found',
                })
            }

            toast.success('Comentário enviado com sucesso!')
            handleDrawerClose()
        } catch (error) {
            toast.error(
                'Erro ao enviar comentário. Por favor, tente novamente.'
            )
        }
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false)
        setSelectedPokemon(null)
        setComment('')
        setLiked(false)
    }

    return (
        <>
            <Header />
            <Box
                sx={{
                    padding: '1rem',
                    '@media (min-width: 768px)': {
                        padding: '2rem',
                    },
                }}>
                <Typography variant='h6' fontWeight='bold' mt={3} mb={2}>
                    Lista de Pokémons
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <DataGrid
                        sx={{
                            maxHeight: '70vh',
                            padding: '1rem',
                        }}
                        rows={pokemons}
                        columns={columns}
                        onRowClick={(params) => handleSetPokemon(params.row)}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    page: 0,
                                    pageSize: 20,
                                },
                            },
                        }}
                    />
                )}

                <DrawerPokemon
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                    selectedPokemon={selectedPokemon}
                    comment={comment}
                    setComment={setComment}
                    liked={liked}
                    setLiked={setLiked}
                    handleCommentSubmit={handleCommentSubmit}
                />
            </Box>
        </>
    )
}
