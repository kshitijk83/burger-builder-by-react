import React, { Component } from 'react';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state ={
        showBackDrop: false
    }

    removeDropHandler=()=>{
        this.setState({showBackDrop:false});
    }

    toggleSideBarHandler=()=>{
        this.setState((prevState)=>{
            return { showBackDrop: !prevState.showBackDrop };
        });
    }

    render(){
        return(
            <>
                <Toolbar sidebarShow={this.toggleSideBarHandler} />
                <SideDrawer show={this.state.showBackDrop} closed={this.removeDropHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>   
        )
    }
}

export default Layout;