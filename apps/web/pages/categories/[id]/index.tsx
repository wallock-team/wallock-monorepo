import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Category } from 'lib/types/categories'
import withAuthPage from 'lib/auth/withAuthPage'
import Api from '../../../lib/api/api'

type Props = {
  category: Category
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
        category: category,
      },
    }
  }
)

const CategoryDetails = ({ category }: Props) => (
  <>
    <AppBar position='sticky' sx={{ px: 2 }}>
      <Toolbar>
        <IconButton>
          <CloseIcon />
        </IconButton>
        <Typography sx={{ flexGrow: 1 }}>Category details</Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth='md' sx={{ p: 2 }}>
      <Typography variant='h5'>{category.name}</Typography>
      <Typography>{category.type}</Typography>
      <Typography>{category.group}</Typography>
    </Container>
  </>
)

export default CategoryDetails
