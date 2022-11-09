import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper
} from '@mui/material'
import { ReadCategoryDto } from 'dtos'
import { BackOrConfirmAppBar } from '../../components/back-or-confirm-app-bar'
import Api from '../../lib/api/api'
import withAuthPage from '../../lib/auth/withAuthPage'

import _ from 'lodash'

type Props = {
  categories: ReadCategoryDto[]
}

export const getServerSideProps = withAuthPage<Props>(async context => {
  const api = await Api.fromServer(context)

  return {
    props: {
      categories: await api.categories.getAllTransactions()
    }
  }
})

const CategoriesPage = (props: Props) => {
  return (
    <>
      <BackOrConfirmAppBar />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Paper elevation={2}>
          <List>
            {_(props.categories)
              .map(category => category.type)
              .uniq()
              .value()
              .map(type => (
                <>
                  <Divider />
                  <ListSubheader key={type}>{_.startCase(type)}</ListSubheader>
                  <Divider />

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
        </Paper>
      </Container>
    </>
  )
}

export default CategoriesPage
