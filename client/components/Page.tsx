// Reference: https://www.carlrippon.com/react-children-with-typescript/
type Props = {
    children?: React.ReactNode;
}

const Page: React.FC<Props> = ({ children }) => (
    <div>
        <h2>I'm the page components</h2>
        {children}
    </div>
)

export default Page