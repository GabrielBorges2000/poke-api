import {
    BicepsFlexed,
    Bug,
    Circle,
    Droplet,
    Eye,
    Flame,
    Ghost,
    Leaf,
    Moon,
    Mountain,
    Shield,
    Skull,
    Snowflake,
    Star,
    Wind,
    Zap,
} from 'lucide-react'

export const icons: { [key: string]: JSX.Element } = {
    normal: <Circle />,
    fire: <Flame />,
    water: <Droplet />,
    electric: <Zap />,
    grass: <Leaf />,
    ice: <Snowflake />,
    fighting: <BicepsFlexed />,
    poison: <Skull />,
    ground: <Mountain />,
    flying: <Wind />,
    psychic: <Eye />,
    bug: <Bug />,
    rock: <Mountain />,
    ghost: <Ghost />,
    dragon: <Flame />,
    dark: <Moon />,
    steel: <Shield />,
    fairy: <Star />,
}

// Função para retornar o ícone correspondente ao tipo
export const getTypeIcon = (type: string): JSX.Element => {
    return icons[type.toLowerCase()] || <Circle />
}
