import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Box, Button, Container, Divider, TextField } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import Image from 'next/image'
import logoSvg from 'public/branding/logo.svg'
import Api from '../lib/api/api'

const Login: NextPage = () => {
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: '10vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Image src={logoSvg} alt="Wallock's logo" height={40} />

          <Button
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={redirectToGoogleLogin}
          >
            Log in with Google
          </Button>

          <Divider>or</Divider>

          <TextField disabled label="Email" />
          <TextField disabled label="Password" type="password" />
          <Button fullWidth variant="contained" disabled>
            Login (Coming soon)
          </Button>
        </Box>
      </Container>
    </>
  )

  function redirectToGoogleLogin() {
    window.location.href = `${process.env.url.api}/login-with-google?success_url=${process.env.url.web}/transactions`
  }
}

export default Login
