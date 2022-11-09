import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'

import TransactionList from 'components/transaction/transaction-list'
import withAuthPage from 'lib/auth/withAuthPage'
import Api from 'lib/api/api'
import { ReadTransactionDto } from 'dtos'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = withAuthPage(
  async context => {
    let apiServer = await Api.fromServer(context)
    return {
      props: {
        transactions: await apiServer.transactions.getAllTransactions()
      }
    }
  }
)

const Transactions: NextPage = (props: any) => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            {props.transactions.reduce(
              (totalBalance: number, currentTransaction: ReadTransactionDto) =>
                currentTransaction.category.type === 'income'
                  ? (totalBalance += currentTransaction.amount)
                  : (totalBalance -= currentTransaction.amount),
              0
            )}
          </Typography>
          <Link href="/transactions/new">
            <Button variant="contained" onClick={() => {}}>
              Add transaction
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Container>
        <TransactionList transactions={props.transactions} />
      </Container>
    </>
  )
}

export default Transactions
