import { AppBar, IconButton, Toolbar } from '@mui/material'
import Back from '@mui/icons-material/ArrowBack'

export const BackOrConfirmAppBar = () => (
  <AppBar>
    <Toolbar>
      <IconButton>
        <Back />
      </IconButton>
    </Toolbar>
  </AppBar>
)
