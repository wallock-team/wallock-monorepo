import { Container, Typography, Stack, Button } from '@mui/material'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import withAuthenticatedUser from '../lib/auth'
import BotNav from '../components/bot-nav'
import Link from 'next/link'
import CategoryIcon from '@mui/icons-material/Category'

export const getServerSideProps: GetServerSideProps = async (context) =>
  withAuthenticatedUser(context)

const Me: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <Container>
        <Typography variant='h5'>Hello {props.user.name}!</Typography>
        <Stack>
          <Link href='/categories'>
            <Button startIcon={<CategoryIcon />}>Categories</Button>
          </Link>
        </Stack>
      </Container>
      <BotNav />
    </>
  )
}

export default Me
