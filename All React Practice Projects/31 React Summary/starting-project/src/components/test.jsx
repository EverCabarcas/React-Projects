import React from "react";

export default class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = { hasError: null }
    }

    static getDerivedStateFromError(error){
        return { hasError: error }
    }

    render(){
        if(this.state.hasError){
            return <h1>HUBO UN ERROR!!!</h1>
        }
        return <>
        <div>
            {this.props.children}
        </div>
        </>    
    }
}