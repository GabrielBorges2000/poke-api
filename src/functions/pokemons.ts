import { api } from '@/services/api'
import type { GitHubUser } from '@/types/github'
import type { Pokemon, PokemonDetails } from '@/types/pokemon'
import axios from 'axios'

export async function getAllPokemons(): Promise<Pokemon[] | Error> {
    try {
        const response = await api.pokeApi.get('/pokemon?limit=2000')

        const results = response.data.results

        const revalidateData = 60 * 60 * 4

        const pokemonData = await Promise.all(
            results.map(async (pokemon: Pokemon, index: number) => {
                const response = await fetch(pokemon.url, {
                    cache: 'force-cache',
                    next: {
                        revalidate: revalidateData,
                    },
                })

                const detailResponse = (await response.json()) as Pokemon

                return {
                    id: `#${String(index + 1).padStart(4, '0')}`,
                    name: pokemon.name,
                    url: pokemon.url,
                    sprite: detailResponse.sprites.front_default,
                    types: detailResponse.types.map(
                        (type: { type: { name: string } }) => type.type.name
                    ),
                }
            })
        )
        return pokemonData
    } catch (error) {
        return error as Error
    }
}

export async function getPokemon(
    pokemon: Pokemon,
    user: GitHubUser | null
): Promise<PokemonDetails> {
    try {

        const pokemonResponse = await axios.get(pokemon.url)
        const pokemonData = pokemonResponse.data

        let userData = null

        if (user) {
            const userDataResponse = await api.mockApi.get('/pokemon', {
                params: {
                    idPokemon: Number.parseInt(pokemon.id.toString().replace('#', '')),
                    gitHubId: user.id,
                },
            })

            const userDataArray = userDataResponse.data
            userData =
                Array.isArray(userDataArray) && userDataArray.length > 0
                    ? userDataArray[0]
                    : null
        }

        const newPokemon: PokemonDetails = {
            ...pokemonData,
            userComment: userData?.comentarioPokemon || '',
            userLiked: userData?.likeDislike || false,
        }

        return newPokemon
    } catch (error) {
        console.error('Erro ao buscar dados do Pokémon:', error)
        throw new Error('Falha ao buscar dados do Pokémon')
    }
}

