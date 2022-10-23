import {
  AppBar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import CategoryIcon from '@mui/icons-material/Category'
import TopicIcon from '@mui/icons-material/Topic'
import withAuthPage from 'lib/auth/withAuthPage'
import { useFormik } from 'formik'
import { CreateCategoryDto } from 'lib/types/categories'
import * as Yup from 'yup'
import Api from 'lib/api/api'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const getServerSideProps = withAuthPage()

const NewCategory = () => {
  const [isCreating, setCreating] = useState<boolean>(false)
  const router = useRouter()
  const api = Api.fromWeb()

  const formik = useFormik<CreateCategoryDto>({
    initialValues: {
      name: '',
      type: 'income',
      group: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required').min(1, 'Required'),
      group: Yup.string().required('Required').min(1, 'Required'),
    }),
    onSubmit: async (createCategoryDto) => {
      setCreating(true)
      await api.categories.create(createCategoryDto)
      setCreating(false)
      router.push('/categories')
    },
  })

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton edge='start' color='inherit' sx={{ mr: 1 }}>
            <ClearIcon />
          </IconButton>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            New category
          </Typography>
          <Button
            variant='contained'
            sx={{ ml: 1 }}
            onClick={() => formik.handleSubmit()}
            disabled={isCreating}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField
            name='name'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <CategoryIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <FormControl>
            <RadioGroup
              row
              name='type'
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value='income'
                control={<Radio />}
                label='Income'
              />
              <FormControlLabel
                value='expense'
                control={<Radio />}
                label='Expense'
              />
            </RadioGroup>
          </FormControl>
          <TextField
            name='group'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <TopicIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.group}
            onChange={formik.handleChange}
            error={formik.touched.group && Boolean(formik.errors.group)}
            helperText={formik.touched.group && formik.errors.group}
          />
        </Stack>
      </Container>
    </>
  )
}

export default NewCategory
