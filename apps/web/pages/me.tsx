import { Container, Typography, Stack, Button } from '@mui/material'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import BotNav from '../components/bot-nav'
import Link from 'next/link'
import CategoryIcon from '@mui/icons-material/Category'

const Me: NextPage = () => {
  return (
    <>
      <Container>
        <Typography variant="h5">Hello!</Typography>
        <Stack>
          <Link href="/categories">
            <Button startIcon={<CategoryIcon />}>Categories</Button>
          </Link>
        </Stack>
      </Container>
      <BotNav />
    </>
  )
}

export default Me
