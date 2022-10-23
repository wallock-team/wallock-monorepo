import { Typography, Button, Grid } from '@mui/material'
import { Wallet, Menu, ArrowDropDown, Search, Today, Visibility } from '@mui/icons-material';
type Props = {
  balance: number
}

const WalletBalance = (props: Props) => (
  <Grid container justifyContent='space-between' sx={{ my: 2 }}>
    <Grid container justifyContent='flex-start' align-items='center' item xs='auto'>
      <Menu sx={{ fontSize: 35,margin: 'auto' }}></Menu>
      <Wallet sx={{ fontSize: 50, marginLeft: 2 }} ></Wallet>
      <Grid sx={{ margin: 'auto', marginLeft: 1 }} item xs='auto' >
        <Grid container justifyContent='flex-start'>
          <Typography variant='body2'>Total Balance</Typography>
          <ArrowDropDown></ArrowDropDown>
        </Grid>
        <Typography variant='h6'>{props.balance}</Typography>
      </Grid>
    </Grid>
    <Grid container alignContent={'center'} item xs='auto'>
      <Grid sx={{ margin: 'auto' }}>
        <Today sx={{marginLeft: '15px', fontSize: 30}}></Today>
        <Visibility sx={{marginLeft: '15px', fontSize: 30}}></Visibility>
        <Search sx={{marginLeft: '15px', fontSize: 30}}></Search>
      </Grid>
      <Button sx={{ marginLeft: '10px', height: '30px' }} variant='contained'>ADD TRANSACTION</Button>
    </Grid>
  </Grid>
)

export default WalletBalance
