import { list } from '@keystone-next/keystone/schema';
import { integer, select, text } from '@keystone-next/fields';

// name epxort 
const Product = list({
    // access:
    // ui:
    fields: {
        name: text({ isRequired: true }),
        description: text({
            ui: {
                displayMode: 'textarea'
            }
        }),
        status: select({
            options: [
                { label: 'Draft', value: 'DRAFT' },
                { label: 'Available', value: 'AVAILABLE' },
                { label: 'Unavailable', value: 'UNAVAILABLE' },
            ],
            defaultValue: 'DRAFT',
            ui: {
                displayMode: 'segmented-control',
                createView: { fieldMode: 'hidden' },

            }
        }),
        price: integer(),
    }
});

export default Product;