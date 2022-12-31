import { Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './AccountNav.css'

export const AccountNav = ({user}) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const handleClose = () => {
        setAnchorEl(null)
        setOpen(false)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true)
    }

    const handleLogout = () => {
        setAnchorEl(null)
        setOpen(false)
        localStorage.removeItem("auth_token")
        navigate('/login')
    }

    return <>
        <button 
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}className="navbar-account">
            <img src={user?.profile_img} alt="Profile Image" className="account-img"></img>
        </button>
        <Menu
                keepMounted
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="menu-account"
                >
                    <MenuItem 
                        onClick={handleClose}
                        component={Link}
                        to={`/account/${user.id}`}
                        className="accountnav-menu">
                        Profile</MenuItem>
                    <MenuItem 
                        onClick={handleClose}
                        component={Link}
                        to={`/my-trips`}
                        className="accountnav-menu menu-projects">My Trips</MenuItem>
                    <MenuItem 
                        onClick={handleLogout} 
                        className="accountnav-menu menu-logout">Logout</MenuItem>
        </Menu>
    </>
   
} 