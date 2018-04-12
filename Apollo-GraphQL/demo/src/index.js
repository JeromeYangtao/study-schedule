import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { ApolloProvider, Query } from 'react-apollo'

ReactDOM.render(<App/>, document.getElementById('root'))
// const client = new ApolloClient({
//   uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql'
// })
//
// client
//   .query({
//     query: gql`
//       {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(data => console.log({data}))
//
// const GET_DOGS = gql`
//   {
//     dogs {
//       id
//       breed
//     }
//   }
// `
//
// const ExchangeRates = () => (
//   <Query
//     query={gql`
//       {
//         rates(currency: "USD") {
//           currency
//           rate
//         }
//       }
//     `}
//   >
//     {({loading, error, data}) => {
//       if (loading) return <p>Loading...</p>
//       if (error) return <p>Error :(</p>
//
//       return data.rates.map(({currency, rate}) => (
//         <div key={currency}>
//           <p>{`${currency}: ${rate}`}</p>
//         </div>
//       ))
//     }}
//   </Query>
// )
//
// const Dogs = ({onDogSelected}) => (
//   <Query query={GET_DOGS}>
//     {({loading, error, data}) => {
//       if (loading) return 'Loading...'
//       if (error) return `Error! ${error.message}`
//
//       return (
//         <select name="dog" onChange={onDogSelected}>
//           {data.dogs.map(dog => (
//             <option key={dog.id} value={dog.breed}>
//               {dog.breed}
//             </option>
//           ))}
//         </select>
//       )
//     }}
//   </Query>
// )
//
// const App = () => (
//   <ApolloProvider client={client}>
//     <div>
//       <h2>My first Apollo app 🚀</h2>
//     </div>
//     <ExchangeRates></ExchangeRates>
//   </ApolloProvider>
// )

ReactDOM.render(<App/>, document.getElementById('root'))

registerServiceWorker()



