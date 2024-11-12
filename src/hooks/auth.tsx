'use client'

import { api } from '@/services/api'
import type { GitHubUser } from '@/types/github'
import {
    type ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import { toast } from 'sonner'

interface AuthContextType {
    user: GitHubUser | null
    isLoading: boolean
    error: string | null
    login: (username: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<GitHubUser | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('githubUser')

        if (storedUser) {
            login(storedUser)
        }
    }, [])

    const validateGithubUser = async (
        username: string
    ): Promise<GitHubUser | null> => {
        try {
            const response = await api.githubApi.get(`/${username}`)
 
            if (response.status === 200) {
                const { id, avatar_url, login, name } =
                    response.data as GitHubUser

                return {
                    id,
                    avatar_url,
                    login,
                    name,
                }
            }

            return null
        } catch (error) {
            console.error('Erro ao validar o usuário do GitHub:', error)
            return null
        }
    }

    const login = async (username: string) => {
        setIsLoading(true)
        setError(null)

        const userExists = await validateGithubUser(username)

        if (userExists) {
            setUser(userExists)
            localStorage.setItem('githubUser', userExists.login)
        } else {
            toast.error(
                'Usuário do GitHub não encontrado. Verifique o nome e tente novamente.'
            )
        }

        setIsLoading(false)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('githubUser')
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}

export { AuthProvider, useAuth }
