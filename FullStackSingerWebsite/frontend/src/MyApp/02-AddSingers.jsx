import React from 'react'
import gql from "graphql-tag"
import { client } from './PrismaEndPoint/EndPoint'


export default class extends React.Component{
    state = { singerName: '' }

    render(){

        const addToDataBase = async () => {

            let temp1 = await client.mutate({
                mutation: gql`
                    mutation{
                        createUser(data: { name: "${this.state.singerName}" }){
                            id
                            name
                        }
                    }
                `})
            .then((result) => { return result.data.createUser } )


            await console.log("La Data: ", temp1 )
            await this.setState({ singerName: '' })
            window.location.reload()
        }

        return(
            <div>
                <h1>Add Singer</h1>

                <div>
                    <h3>Provide Singer or Group name below</h3>
                    <input className="gralInput" type="text" value={ this.state.singerName } onChange={ (e) => { this.setState({ singerName: e.target.value }) } } />
                    <br/><br/>
                    <button className="gralButton" onClick={ addToDataBase } >Add to DataBase</button>
                </div>
            </div>
        )
    }
}