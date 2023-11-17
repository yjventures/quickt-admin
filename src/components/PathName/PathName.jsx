import { Box } from '@mui/material'
import React from 'react'

const PathName = ({path}) => {
    return (
        <Box sx={{
            mt: 3,
            color: '#999',
        }}>
            Admin / {path.charAt(0) + path.slice(1).toLowerCase()}
        </Box>
    )
}

export default PathName