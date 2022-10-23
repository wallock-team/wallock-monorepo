// THIS IS TEMPORARY
// In the future, the Logo component should be a image (preferably .svg) file.

import { NextComponentType } from 'next'
import '@fontsource/righteous'

import style from './logo.module.css'
import { Typography } from '@mui/material'

const Logo: NextComponentType = () => {
  return <Typography
      variant="h2"
      className={style.logo}
    >
      Wallock  
    </Typography>
}

export default Logo