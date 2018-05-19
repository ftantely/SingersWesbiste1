import React from 'react'
import gql from "graphql-tag"
import { client } from './PrismaEndPoint/EndPoint'

import Template from './99-Template'


export default class extends React.Component{
    state = { singers: [] }

    render(){

        const loadSingers = async () => {
            let temp1 = await client.query({
                query: gql`
                    query {
                        users {
                            name
                            id
                        }
                    }
                `}).then((result) => { return result.data.users } )

            await console.log("La Data: ", temp1 )
            await this.setState({ singers: temp1 })
        }



        return(
            <div>
                <h1>Read Singers from DataBase</h1>
                <button className="gralButton" onClick={ loadSingers } >Get All Singers</button>
                <br/><br/>

                { this.state.singers[0] ? this.state.singers.map((x) => { return <Template key={x.id} data={x} /> }) : <div>Click to get singers</div> }
            </div>
        )
    }
}