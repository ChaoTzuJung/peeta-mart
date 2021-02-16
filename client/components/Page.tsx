import styled from 'styled-components';
import StyledGlobal from './styles/GlobalStyles';
import Header from './Header';

const StyledInner = styled.div`
    max-width: var(--maxWidth);
    margin: 0 auto;
    padding: 2rem;
`;

type Props = {
    children?: React.ReactNode;
}

const Page: React.FC<Props> = ({ children }) => (
    <div>
        <StyledGlobal />
        <Header />
        <StyledInner>{children}</StyledInner>
    </div>
)

export default Page