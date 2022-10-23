import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
} from '@mui/material'
import { Work } from '@mui/icons-material'

type CategoryReport = {
  id: number
  isExpense: boolean
  name: string
  amount: number
  percentage: number
}

type Props = {
  transactions: CategoryReport[]
}

const TopCategoriesSpent = (props: Props) => (
  <Box>
    <Typography variant='h6'>Top categories spent</Typography>
    <List>
      {props.transactions
        .filter((t) => t.isExpense)
        .sort((t1, t2) => +t2.amount - +t1.amount)
        .slice(0, 3)
        .map((t) => (
          <ListItem
            key={t.id}
            secondaryAction={
              <Typography variant='body1'>{t.percentage}%</Typography>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <Work />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t.name}
              secondary={t.amount.toLocaleString()}
            />
          </ListItem>
        ))}
    </List>
  </Box>
)

export default TopCategoriesSpent
