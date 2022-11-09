import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material'
import { Work } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { ReadTransactionDto } from 'dtos'

type Props = {
  transactions: ReadTransactionDto[]
}

const TransactionList = (props: Props) => {
  const router = useRouter()
  function handleOnClick(id: number): void {
    router.push(`transactions/${id}`)
  }
  return (
    <List>
      {props.transactions.map((t: any) => (
        <ListItem
          key={t.id}
          secondaryAction={<Typography variant="body1">{t.amount}</Typography>}
          onClick={() => handleOnClick(t.id)}
        >
          <ListItemText primary={t.category.name} secondary={t.note} />
        </ListItem>
      ))}
    </List>
  )
}

export default TransactionList
