import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from "@mui/material/styles";


export default function Footer() {
  const theme = useTheme();
  return (
    <Box sx={{background: theme.palette.primary.main, height: '6rem'}}>
      <Typography >some</Typography>
    </Box>
  )
}
