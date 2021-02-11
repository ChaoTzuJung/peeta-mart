import 'dotenv/config'; // access environment variables
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import User from './schemas/User';
import Product from './schemas/Product';
import ProductImage from './schemas/ProductImage';

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 30, // How long they stay signed in?
    secret: process.env.COOKIE_SECRET,
};

// Have auth in keystone
const { withAuth } = createAuth({
    listKey: 'User', // need to know which schema is going to responsible for being the user
    identityField: 'email',  // which field in user is going to identify the person(Ex: what did they log i with?)
    secretField: 'password',
    initFirstItem: { // How do you auth
        fields: ['name', 'email', 'password'],
        // TODO: Add in initial roles here
    },
});

export default withAuth(
    config({
        server: {
            cors: {
                origin: [process.env.FRONTEND_URL],
                credentials: true, // it will pass along that cookie
            },
        },
        db: {
            adapter: 'mongoose',
            url: databaseUrl,
            // TODO: Add data sending here
        },
        lists: createSchema({
            // Schema items go in here
            User,
            Product,
            ProductImage,
        }),
        ui: {
            // Show the UI only for people who pass this test(make sure they have session and have logged in)
            isAccessAllowed: ({ session }) => {
                console.log(session);
                return session?.data;
            }
        },
        // TODO: Add session values here
        session: withItemData(
            statelessSessions(sessionConfig),
            // GraphQL Query
            {
                User: `id name email`,
            }
        )
    })
)
