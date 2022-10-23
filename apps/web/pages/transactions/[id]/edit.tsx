import { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import {
  AppBar,
  Button,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import PaidIcon from '@mui/icons-material/Paid'
import NotesIcon from '@mui/icons-material/Notes'
import CategoryIcon from '@mui/icons-material/Category'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import Api from 'lib/api/api'
import withAuthPage from 'lib/auth/withAuthPage'
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from 'lib/types/transactions'
import { Category } from 'lib/api/types'

type Props = {
  transactionToBeEdited: Transaction
  categories: Category[]
}

export const getServerSideProps = withAuthPage<Props>(async (context: any) => {
  const api = await Api.fromServer(context)

  const transactionToBeEdited = await api.transactions.getById(
    context.params?.id
  )

  return {
    props: {
      transactionToBeEdited,
      categories: await api.categories.getAll(),
    },
  }
})

const UpdateTransaction: NextPage<Props> = (props) => {
  const [isCreating, setCreating] = useState<boolean>(false)
  const router = useRouter()
  const api = Api.fromWeb()

  const formik = useFormik<UpdateTransactionDto>({
    initialValues: {
      ...props.transactionToBeEdited,
      categoryId: props.transactionToBeEdited.category.id,
    },
    validationSchema: Yup.object({
      amount: Yup.number().min(0, 'Must be positive').required('Required'),
    }),
    onSubmit: async (values) => {
      setCreating(true)
      await api.transactions.update(values)
      setCreating(false)
      router.push('/transactions')
    },
  })

  return (
    <>
      <AppBar position='sticky' sx={{ px: 2 }}>
        <Toolbar>
          <IconButton onClick={() => router.push('/home')}>
            <Close />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}>Edit transaction</Typography>
          <Button
            disabled={isCreating}
            variant='contained'
            onClick={() => {
              formik.handleSubmit()
            }}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TextField
            name='amount'
            size='medium'
            type='number'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PaidIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />

          <TextField
            name='categoryId'
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
            value={formik.values.categoryId}
            onChange={formik.handleChange}
            error={
              formik.touched.categoryId && Boolean(formik.errors.categoryId)
            }
            helperText={formik.touched.categoryId && formik.errors.categoryId}
          >
            <MenuItem key={0} value={0} disabled>
              Select category
            </MenuItem>
            {props.categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name='note'
            type='text'
            size='small'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <NotesIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.note}
            onChange={formik.handleChange}
            error={formik.touched.note && Boolean(formik.errors.note)}
            helperText={formik.touched.note && formik.errors.note}
          />
        </Stack>
      </Container>
    </>
  )
}

export default UpdateTransaction
