import {
  AppBar,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BotNav from 'components/bot-nav'
import withAuthPage from 'lib/auth/withAuthPage'
import Api from 'lib/api/api'
import { Category } from 'lib/types/categories'
import Link from 'next/link'

type PageProps = {
  categories: Category[]
}

export const getServerSideProps: GetServerSideProps = withAuthPage<PageProps>(
  async (context) => {
    const api = await Api.fromServer(context)

    const categories = await api.categories.getAll()

    return {
      props: {
        categories,
      },
    }
  }
)

const Categories: NextPage<PageProps> = (props) => {
  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton edge='start' color='inherit'>
            <ArrowBackIcon />
          </IconButton>
          <TextField
            placeholder='Find a category'
            variant='outlined'
            size='small'
            sx={{ m: 1, flexGrow: 1 }}
          />
        </Toolbar>
      </AppBar>
      <Container sx={{ mb: 8 }}>
        <List>
          <Link href='/categories/new'>
            <ListItemButton>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary='New category' />
            </ListItemButton>
          </Link>
          {
            // [...new Set(arr)] is to remove duplicated item
            [
              ...new Set(props.categories.map((category) => category.group)),
            ].map((group) => (
              <>
                <ListSubheader key={group}>{group}</ListSubheader>
                {props.categories
                  .filter((category) => category.group === group)
                  .map((category) => (
                    <>
                      <Link key={category.id} href={`categories/${category.id}`}>
                        <ListItemButton key={category.id}>
                          <ListItemText primary={category.name} />
                        </ListItemButton>
                      </Link>
                      <Divider />
                    </>
                  ))}
              </>
            ))
          }
        </List>
      </Container>
      <BotNav />
    </>
  )
}

export default Categories
