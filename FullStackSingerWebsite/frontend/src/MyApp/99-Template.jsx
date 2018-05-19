import React from 'react'
import './Style/Template.css'
export default class extends React.Component{
    render(){
        const info = this.props.data
        return(
            <div className="templateCont">
                <div><strong>Name: </strong>{info.name}</div>
                <div><strong>Id: </strong>{info.id}</div>
            </div>
        )
    }
}