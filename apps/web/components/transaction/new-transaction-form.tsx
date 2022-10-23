import { NextComponentType } from 'next'
import { Container } from '@mui/system'
import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import PaidIcon from '@mui/icons-material/Paid'
import NotesIcon from '@mui/icons-material/Notes'
import CategoryIcon from '@mui/icons-material/Category'
import { default as DateIcon } from '@mui/icons-material/CalendarToday'

const NewTransactionForm: NextComponentType = () => {
  return (
    <Container maxWidth='md' sx={{ p: 2 }}>
      <Stack spacing={2}>
        <TextField
          type='number'
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <PaidIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          select
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <CategoryIcon />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </TextField>
        <TextField
          type='text'
          fullWidth
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <NotesIcon />
              </InputAdornment>
            ),
          }}
        />
        <MobileDatePicker
          value={Date.now()}
          onChange={() => {}}
          renderInput={(params: any) => (
            <TextField
              {...params}
              type='text'
              size='small'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <DateIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Stack>
    </Container>
  )
}

export default NewTransactionForm
