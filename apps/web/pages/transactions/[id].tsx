import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid'
import CategoryIcon from '@mui/icons-material/Category'
import NotesIcon from '@mui/icons-material/Notes'
import { GetServerSideProps, NextPage } from 'next'
import { Close } from '@mui/icons-material'
import withAuthPage from 'lib/auth/withAuthPage'
import Api from 'lib/api/api'
import { useRouter } from 'next/router'
import EditIcon from '@mui/icons-material/Edit'

export const getServerSideProps: GetServerSideProps = withAuthPage(
  async (context) => {
    const api = await Api.fromServer(context)

    const transaction = await api.transactions.getById(context.params?.id)
    console.log(transaction)

    return {
      props: {
        transaction,
      },
    }
  }
)
const TransactionDetail: NextPage = (props) => {
  const router = useRouter()
  return (
    <>
      <AppBar position='sticky' sx={{ px: 2 }}>
        <Toolbar>
          <IconButton onClick={() => router.push('/transactions')}>
            <Close />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}>Transaction detail</Typography>
          <IconButton>
            <EditIcon
              onClick={() => {
                router.push(`/transactions/${props.transaction.id}/edit`)
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md'>
        <List>
          <ListItem>
            <ListItemAvatar>
              <PaidIcon />
            </ListItemAvatar>
            <ListItemText primary={props.transaction.amount} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <CategoryIcon />
            </ListItemAvatar>
            <ListItemText primary={props.transaction.category.name} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <NotesIcon />
            </ListItemAvatar>
            <ListItemText primary={props.transaction.category.note} />
          </ListItem>
        </List>
      </Container>
    </>
  )
}

export default TransactionDetail
