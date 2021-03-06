// Ref: https://stackoverflow.com/questions/64119385/difference-between-apollo-client-apollo-client-and-apollo-boost
import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';

// @ts-ignore
const createClient: ApolloClient<NormalizedCacheObject> = ({ headers, initialState }) => {
    return new ApolloClient({
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({ message, locations, path }) =>
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        )
                    );
                if (networkError)
                    console.log(
                        `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
                    );
            }),
            // this uses apollo-link-http under the hood, so all the options here come from that package
            createUploadLink({
                uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
                fetchOptions: {
                    credentials: 'include',
                },
                // pass the headers along from this request. This enables SSR with logged in state
                headers,
            }),
        ]),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        // TODO: We will add this together!
                        // allProducts: paginationField(),
                    },
                },
            },
        }).restore(initialState || {}),
    });
}

/* withApollo is a higher order function designed to work specifically with NextJS. We will pass our createClient function to it. */
// @ts-ignore
export default withApollo(createClient, { getDataFromTree });