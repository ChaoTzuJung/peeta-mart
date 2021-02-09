import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';

// name epxort 
const User = list({
    // access:
    // ui:
    fields: {
        name: text({ isRequired: true }),
        email: text({ isRequired: true, isUnique: true }),
        password: password(),
        // TODO: addd roles, cart, orders
    }
});

export default User;

