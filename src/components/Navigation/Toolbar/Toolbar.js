import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Cookies from 'js-cookie';


const toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.menuClick} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            {
                document.location.pathname === ('/builder') && <div className={classes.heading}>
                    <h4>Welcome {Cookies.get('name')}</h4>
                </div>
            }

            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar;