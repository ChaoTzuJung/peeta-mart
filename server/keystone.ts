import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 30, // How long they stay signed in?
    secret: process.env.COOKIE_SECRET,
};

export default config({
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
    }),
    ui: {
        // TODO: change this for roles
        isAccessAllowed: () => true,
    },
    // TODO: Add session values here
})

