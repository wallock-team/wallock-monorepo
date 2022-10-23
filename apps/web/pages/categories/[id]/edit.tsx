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
import { Category, UpdateCategoryDto } from 'lib/types/categories'
import * as Yup from 'yup'
import Api from 'lib/api/api'
import { useRouter } from 'next/router'
import { useState } from 'react'

type Props = {
  categoryToBeEdited: Category
}

type Query = {
  id?: string | string[] | undefined
}

export const getServerSideProps = withAuthPage<Props, Query>(
  async (context) => {
    /**
     * On-error redirection: should be returned if an unexpected error is encountered.
     */
    const onErrorRedirect = {
      redirect: {
        permanent: false,
        destination: '/categories',
      },
    }

    const id = context.query?.id

    // Why id must be of type string?
    // Because id can be of type string, strings array or undefined
    // and only string can be passed to parseInt
    if (!id || typeof id !== 'string') return onErrorRedirect

    const parsedId = parseInt(id)

    if (!id) return onErrorRedirect

    const api = await Api.fromServer(context)

    const category = await api.categories.getById(parsedId)

    // TODO: handle when getting non-existing category
    return {
      props: {
        categoryToBeEdited: category,
      },
    }
  }
)

const EditCategory = ({ categoryToBeEdited }: Props) => {
  const [isUpdating, setUpdating] = useState<boolean>(false)
  const router = useRouter()
  const api = Api.fromWeb()

  const formik = useFormik<UpdateCategoryDto>({
    initialValues: {
      id: categoryToBeEdited.id,
      name: categoryToBeEdited.name,
      group: categoryToBeEdited.group,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required').min(1, 'Required'),
      group: Yup.string().required('Required').min(1, 'Required'),
    }),
    onSubmit: async (updateCategoryDto) => {
      setUpdating(true)
      await api.categories.update(updateCategoryDto)
      setUpdating(false)
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
            Edit category
          </Typography>
          <Button
            variant='contained'
            sx={{ ml: 1 }}
            onClick={() => formik.handleSubmit()}
            disabled={isUpdating}
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
              value={categoryToBeEdited.type}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value='income'
                control={<Radio disabled />}
                label='Income'
              />
              <FormControlLabel
                value='expense'
                control={<Radio disabled />}
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

export default EditCategory
