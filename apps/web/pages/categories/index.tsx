import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListSubheader
} from '@mui/material'
import { ReadCategoryDto } from 'dtos'
import { BackOrConfirmAppBar } from '../../components/back-or-confirm-app-bar'
import Api from '../../lib/api/api'
import withAuthPage from '../../lib/auth/withAuthPage'

type Props = {
  categories: ReadCategoryDto[]
}

export const getServerSideProps = withAuthPage<Props>(async context => {
  const api = await Api.fromServer(context)

  return {
    props: {
      categories: await api.categories.getAll()
    }
  }
})

const CategoriesPage = (props: Props) => {
  return (
    <>
      <BackOrConfirmAppBar />
      <Container>
        <List>
          {props.categories
            .map(category => category.type)
            .map(type => (
              <>
                <ListSubheader key={type}>{type}</ListSubheader>
                {props.categories
                  .filter(category => category.type === type)
                  .map(category => (
                    <ListItem key={category.id}>
                      <ListItemText primary={category.name} />
                    </ListItem>
                  ))}
              </>
            ))}
        </List>
      </Container>
    </>
  )
}

export default CategoriesPage
