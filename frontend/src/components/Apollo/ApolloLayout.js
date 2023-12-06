'use client'

import { ApolloProvider as Provider } from '@apollo/client'
import createApolloClient from './apollo-client'

const client = createApolloClient()

export const ApolloProvider = ({ children }) => (
	<Provider client={client}>{children}</Provider>
)
