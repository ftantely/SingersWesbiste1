import React from 'react'
import gql from "graphql-tag"
import { client } from './PrismaEndPoint/EndPoint'


export default class extends React.Component{
    state = { singerId: '', singerName: '' }

    render(){

        const updateDataBase = async () => {

            let temp1 = await client.mutate({
                mutation: gql`
                    mutation{
                        updateUser(
                            data: { name: "${this.state.singerName}" }
                            where: { id: "${this.state.singerId}" }
                        ){
                            id
                            name
                        }
                    }
                `}).then((result) => { return result.data.createUser } )

            await console.log("User Deleted: ", temp1 )
            await this.setState({ singerName: '', singerId: '' })
            window.location.reload()
        }

        return(
            <div>
                <h1>Update Singer Information</h1>

                <div>
                    <h3>Provide Info to Update</h3>

                    <div>Provide ID of singer to Update:</div>
                    <input className="gralInput" type="text" value={ this.state.singerId } onChange={ (e) => { this.setState({ singerId: e.target.value }) } } />
                    <br/><br/>

                    <div>Provide New Name for this Singer:</div>
                    <input className="gralInput" type="text" value={ this.state.singerName } onChange={ (e) => { this.setState({ singerName: e.target.value }) } } />
                    <br/><br/>
                    <button className="gralButton" onClick={ updateDataBase } >Update DataBase</button>
                </div>
            </div>
        )
    }
}