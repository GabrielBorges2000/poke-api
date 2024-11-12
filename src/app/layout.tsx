import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/hooks/auth'
import theme from '@/theme'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import { Roboto } from 'next/font/google'
import { Toaster } from 'sonner'

const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
    variable: '--font-roboto',
})

export const metadata: Metadata = {
    title: 'Pokedex',
    description: 'Teste para desenvolvedor frontend utilizando a PokeAPI',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='pt-BR'>
            <body className={roboto.variable}>
                <AppRouterCacheProvider options={{ key: 'css' }}>
                    <ThemeProvider theme={theme}>
                        <AuthProvider>
                            {children}
                            <Toaster expand position='top-right' richColors />
                        </AuthProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
