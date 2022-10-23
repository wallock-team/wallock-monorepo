import { Typography, Grid, Avatar, Box } from '@mui/material'
import { LunchDining, Payment, Subject, CalendarMonth } from '@mui/icons-material'
const TransactionDetail = (props: any) => {
    let { transaction } = props

    return (
        <Grid container>
            <Grid  item xs={12}>
                <Grid item xs={1}>
                    <LunchDining />
                </Grid>
                <Grid item xs={11} >
                    <Typography variant='h5'>{transaction.categories.name}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={1}>
                    <Payment/>
                </Grid>
                <Grid item xs={11} >
                    <Typography variant='h5'>{transaction.amount}</Typography>
                </Grid>
            </Grid >
            <Grid item xs={12}>
                <Grid item xs={1}>
                    <Subject/>
                </Grid>
                <Grid item xs={11} >
                    <Typography variant='h5'>{transaction.note}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={1}>
                    <CalendarMonth/>
                </Grid>
                <Grid item xs={11} >
                    <Typography variant='h5'>{transaction.date}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default TransactionDetail