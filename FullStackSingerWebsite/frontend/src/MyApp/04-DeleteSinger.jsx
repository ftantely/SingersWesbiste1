import React from 'react'
import gql from "graphql-tag"
import { client } from './PrismaEndPoint/EndPoint'


export default class extends React.Component{
    state = { singerId: '' }

    render(){

        const deleteById = async () => {
            console.log("Delete by Id: ")


            let temp1 = await client.mutate({
                mutation: gql`
                    mutation{
                        deleteUser(where: { id: "${this.state.singerId}" }){
                            id
                            name
                        }
                    }
                `}).then((result) => { return result.data.createUser } )

            await console.log("User Deleted: ", temp1 )
            await this.setState({ singerId: '' })
            window.location.reload()
        }

        return(
            <div>

                <h1>Delete Singer</h1>

                <div>
                    <h3>ID of Singer to Delete</h3>
                    <input className="gralInput" type="text" value={ this.state.singerId } onChange={ (e) => { this.setState({ singerId: e.target.value }) } } />
                    <br/><br/>
                    <button className="gralButton" onClick={ deleteById } >Delete Singer from DataBase</button>
                </div>

            </div>
        )
    }
}