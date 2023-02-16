import React from 'react'
import { GridView } from '@mui/icons-material';
import { Timeline } from '@mui/icons-material';
import { Wallet } from '@mui/icons-material';
import { DataSaverOff } from '@mui/icons-material';
import { Settings } from '@mui/icons-material';
import { Logout } from '@mui/icons-material';
import { color } from '@mui/system';


export const SidebarData = [
    {
        title:"Overview",
        icon:<GridView style={{color:"#7289DA"}} className='icon' color="#7289DA"/>,
        path:"/"
    },
    {
        title:"Trade",
        icon:<Timeline style={{color:"#7289DA"}} className='icon'/>,
        path:"/trade"
    },
    {
        title:"Wallet",
        icon:<Wallet style={{color:"#7289DA"}} className='icon'/>,
        path:"/wallet"
    },
    {
        title:"Analytics",
        icon:<DataSaverOff style={{color:"#7289DA"}} className='icon'/>,
        path:"/data"
    },
    {
        title:"Settings",
        icon:<Settings style={{color:"#7289DA"}} className='icon'/>,
        path:"/settings"
    },
    // {
    //     title:"Logout",
    //     icon:<Logout style={{color:"#7289DA"}} className='icon'/>,
    //     path:"/logout"
    // }
];