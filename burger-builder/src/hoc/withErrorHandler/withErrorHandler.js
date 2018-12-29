import React, { Component } from 'react';
import Model from '../../UI/Modal/Modal';

const withErrorHandler =(WrappedComponent, axios)=>{
    return class extends Component{

        state={
            error: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(res=>{
                this.setState({ error: null });
                return res;
            }, err=>err)
            this.resInterceptor = axios.interceptors.response.use(res=>res, err=>{
                this.setState({ error: err });
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        removeErrorBox=()=>{
            this.setState({ error: null });
        }

        render(){



            return(
                <>
                    <Model
                     show={this.state.error?this.state.error:null}
                     modalClosed={this.removeErrorBox} >There is something wrong with the network!</Model>
                    <WrappedComponent {...this.props}/>
                </>
            )
        }
    }
}

export default withErrorHandler;