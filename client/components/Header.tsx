import Link from 'next/link';
import Nav from './Nav';

const Header = () => (
    <header>
        <div className="bar">
            <Link href="/">Silk fit</Link>
        </div>
        <div className="sub-bar">
            <p>Search</p>
        </div>
        <Nav />
    </header>
)

export default Header;