import React, { Component } from 'react';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
                <Toolbar
                auth={this.props.isAuth}
                sidebarShow={this.toggleSideBarHandler} />
                <SideDrawer show={this.state.showBackDrop} closed={this.removeDropHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>   
        )
    }
}

const mapStateToprops = state=>{
    return{
        isAuth: state.auth.token!==null
    }
}

export default connect(mapStateToprops, null)(Layout);