import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { Work } from '@mui/icons-material'
import { useRouter } from 'next/router'

type Transaction = {
  id: number
  amount: number
  categories: {
    name: string
    isExpense: boolean
  }
  timestamp: Date
  note?: string
}

const TransactionList = (props: Props) => {
  const router = useRouter()
  function handleOnClick(id: number): void {
    router.push(`transactions/${id}`)
  }
  return (
    <List>
      {props.transactions.map((t) => (
        <ListItem
          key={t.id}
          secondaryAction={<Typography variant='body1'>{t.amount}</Typography>}
          onClick={() => handleOnClick(t.id)}
        >
          <ListItemAvatar>
            <Avatar>
              <Work />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={t.category.name} secondary={t.note} />
        </ListItem>
      ))}
    </List>
  )
}

export default TransactionList
