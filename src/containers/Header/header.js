import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Header extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar menuClick={this.sideDrawerHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerHandler} />
            </Aux>
        );
    }
}

export default Header;