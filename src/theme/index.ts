'use client'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    cssVariables: true,
    palette: {
        mode: 'light',
    },
})

export default theme
