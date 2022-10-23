import { Close } from '@mui/icons-material'
import { AppBar, Button, Grid, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NewTransactionForm from '../../../../components/transaction/new-transaction-form'
import Api from '../../../../lib/api/api'
import withAuthPage from '../../../../lib/auth/withAuthPage'

export const getServerSideProps: GetServerSideProps = withAuthPage(
  async (context) => {
    let apiServer = await Api.fromServer(context)
    console.log(context)
    let id = context.params.id
    let response = await apiServer.transactions.getById(id)
    return {
      props: {
        transaction: response.data,
        id: id,
      },
    }
  }
)

const edit: NextPage = (props) => {
  let api = Api.fromWeb()
  let router = useRouter()
  let [transaction, setTransaction] = useState(props.transaction)
  const handleEdit = async () => {
    await api.transactions.update(transaction)
    router.push('/transactions')
  }

  return transaction ? (
    <>
      <AppBar position='sticky' sx={{ px: 2 }}>
        <Grid container justifyContent='space-between' sx={{ my: 2 }}>
          <Grid container alignContent={'center'} item xs='auto'>
            <Close sx={{ fontSize: 35, margin: 'auto' }}></Close>
            <Typography sx={{ fontSize: 20, margin: 'auto' }}>
              Transaction
            </Typography>
          </Grid>
          <Grid>
            <Button
              onClick={() => handleEdit()}
              sx={{ marginLeft: '10px' }}
              color='success'
            >
              {' '}
              Update{' '}
            </Button>
          </Grid>
        </Grid>
      </AppBar>
      <NewTransactionForm
        transaction={transaction}
        setTransaction={setTransaction}
      />
    </>
  ) : (
    <></>
  )
}

export default edit
