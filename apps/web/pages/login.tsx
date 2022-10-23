import { ReactNode } from 'react'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import Image from 'next/image'
import logoSvg from 'public/branding/logo.svg'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      baseUrl: process.env.WEB_URL,
      backendBaseUrl: process.env.SERVER_URL,
    },
  }
}

const Login: NextPage = ({
  baseUrl,
  backendBaseUrl,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Container maxWidth='sm' sx={{ mt: '10vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Image src={logoSvg} alt="Wallock's logo" height={40} />

          <Button
            fullWidth
            variant='contained'
            startIcon={<GoogleIcon />}
            onClick={redirectToGoogleLogin}
          >
            Log in with Google
          </Button>

          <Divider>or</Divider>

          <TextField disabled label='Email' />
          <TextField disabled label='Password' type='password' />
          <Button fullWidth variant='contained' disabled>
            Login (Coming soon)
          </Button>
        </Box>
      </Container>
    </>
  )

  function redirectToGoogleLogin() {
    window.location.href = `${backendBaseUrl}/auth/login/social-login/google?authorized_uri=${baseUrl}`
  }
}

const CenterPositioned = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  )
}

export default Login
