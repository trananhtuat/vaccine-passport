import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined'
import { Drawer, List, Toolbar, ListItemButton, ListItemIcon, ListItemText, colors } from '@mui/material'

const sideBarItems = [
    {
        text: 'Dasboard',
        path: '/',
        icon: <DashboardOutlinedIcon/>
    },
    {
        text: 'User',
        path: '/user',
        icon: <PersonOutlineOutlinedIcon/>
    },
    {
        text: 'Place',
        path: '/place',
        icon: <PlaceOutlinedIcon/>
    },
    {
        text: 'Vaccine',
        path: '/vaccine',
        icon: <HealthAndSafetyOutlinedIcon/>
    },
    {
        text: 'QR Scan',
        path: '/qr-scan',
        icon: <QrCodeScannerOutlinedIcon/>
    }
]

const SideBar = () => {
    const location = useLocation()
    const siderBarWidth = 300
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const activeItem = sideBarItems.findIndex(item => window.location.pathname.split('/')[1] === item.path.split('/')[1])
        setActiveIndex(activeItem)
    }, [location])

    return (
        <Drawer
            container={window.document.body}
            variant='permanent'
            sx={{
                width: siderBarWidth,
                height: '100vh',
                boxShadow: '0px 1px 4px 1px rgb(0 0 0 / 12%)',
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: siderBarWidth,
                    borderRight: 0
                }
            }}
            open={true}
        >
            <Toolbar/>
            <List>
                {
                    sideBarItems.map((item, index) => (
                        <ListItemButton
                            key={`siderbar-key-${index}`}
                            selected={index === activeIndex}
                            component={Link}
                            to={item.path}
                            sx={{
                                width: 'calc(100% - 20px)',
                                margin: '5px auto',
                                borderRadius: '10px',
                                '&.Mui-selected': {
                                    color: colors.blue['A700']
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: colors.blue['200']
                                }
                            }}
                        >
                            <ListItemIcon sx={{
                                color: index === activeIndex && colors.blue['A700']
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    '& span': {
                                        fontWeight: index === activeIndex && '500'
                                    }
                                }}
                            />
                        </ListItemButton>
                    ))
                }
            </List>
        </Drawer>
    )
}

export default SideBar
