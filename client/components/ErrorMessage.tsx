import { ApolloError } from '@apollo/client/errors/index';

import styled from 'styled-components';

const ErrorStyles = styled.div`
    padding: 2rem;
    background: white;
    margin: 2rem 0;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-left: 5px solid red;
    p {
        margin: 0;
        font-weight: 100;
    }
    strong {
        margin-right: 1rem;
    }
`;

type Props = {
    error: ApolloError | undefined
};

const ErrorMessage: React.FC<Props> = ({ error }) => {
    if (!error || !error.message) return null;
    // @ts-ignore
    if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
        // @ts-ignore
        return error.networkError.result.errors.map((error: ApolloError, i: number) => (
            <ErrorStyles key={i}>
                <p data-test="graphql-error">
                    <strong>Shoot!</strong>
                    {error.message.replace('GraphQL error: ', '')}
                </p>
            </ErrorStyles>
        ));
    }
    return (
        <ErrorStyles>
            <p data-test="graphql-error">
                <strong>Shoot!</strong>
                {error.message.replace('GraphQL error: ', '')}
            </p>
        </ErrorStyles>
    );
};

export default ErrorMessage;