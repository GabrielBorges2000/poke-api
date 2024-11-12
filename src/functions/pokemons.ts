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
): Promise<PokemonDetails | Error> {
    try {
        const [pokemonResponse, userDataResponse] = await Promise.all([
            axios.get(pokemon.url),
            api.mockApi.get('/pokemon', {
                params: {
                    // biome-ignore lint/style/useNumberNamespace: <explanation>
                    idPokemon: parseInt(pokemon.id.replace('#', '')),
                    gitHubId: user?.id || 'not-found',
                },
            }),
        ])

        console.log('userDataResponse', userDataResponse.data)

        const pokemonData = pokemonResponse.data
        let userData = null

        if (
            userDataResponse.status === 304 ||
            userDataResponse.data.length > 0
        ) {
            userData = userDataResponse.data
        }

        const newPokemon = {
            ...pokemonData,
            userComment: userDataResponse.data
                ? userDataResponse.data[0].comentarioPokemon
                : '',
            userLiked: userDataResponse.data
                ? userDataResponse.data[0].likeDislike
                : false,
        }

        return newPokemon
    } catch (error) {
        return error as Error
    }
}
