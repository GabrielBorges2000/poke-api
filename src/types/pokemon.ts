export interface Pokemon {
    id: number
    name: string
    url: string
    sprites: {
        front_default: string
        other: {
            'official-artwork': {
                front_default: string
            }
        }
    }
    types: Array<{
        type: {
            name: string
        }
    }>
}

export interface PokemonDetails extends Omit<Pokemon, 'types'> {
    abilities: Array<{
        ability: {
            name: string
        }
    }>
    types: Array<{
        type: {
            name: string
        }
    }>
    height: number
    weight: number
    base_experience: number
    stats: Array<{
        base_stat: number
        stat: {
            name: string
        }
    }>
    species: {
        url: string
    }
    userComment: string
    userLiked: boolean
}

export interface Evolution {
    id: number
    name: string
    sprite: string
}

export interface ComentarioPokemon {
    id: string
    nomePokemon: string
    comentarioPokemon: string
    likeDislike: boolean
    gitHubId: number
    idPokemon: string
}
