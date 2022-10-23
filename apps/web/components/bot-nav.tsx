import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'
import {
  Home,
  AccountBalanceWallet,
  AddBox,
  Savings,
  Person,
} from '@mui/icons-material'
import Link from 'next/link'
import { ReactNode } from 'react'

type BotNavItemProps = {
  label: string
  icon: ReactNode
  href?: string
}
const BotNavItem = (props: BotNavItemProps) =>
  props.href ? (
    <Link href={props.href}>
      <BottomNavigationAction label={props.label} icon={props.icon} />
    </Link>
  ) : (
    <BottomNavigationAction label={props.label} icon={props.icon} />
  )

const BotNav = () => (
  <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation showLabels>
      <BotNavItem label='Home' icon={<Home />} href='/home' />
      <BotNavItem
        label='Transactions'
        icon={<AccountBalanceWallet />}
        href='/transactions'
      />
      <BotNavItem label='Planning' icon={<Savings />} />
      <BotNavItem label='Me' icon={<Person />} href='/me' />
    </BottomNavigation>
  </Paper>
)

export default BotNav
