import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const CREATE_PRODUCT_MUTATION = gql`
    mutation createProductMutation(
        # which variable are getting pass in
        $name: String!
        $description: String!
        $image: Upload
        $price: Int!
    ) {
        createProduct(
            data: {
                name: $name
                description: $description
                photo: { create: { image: $image, altText: $name } }
                price: $price
                status: "AVAILABLE"
            }
        ) {
            id
            name
            price
            description
        }
    }
`;

const CreateProduct = () => {
    const { inputs, handleChange, resetForm, clearForm } = useForm({
        image: '',
        name: 'Nice Shoes',
        price: 34234,
        description: 'These are the best shoes!',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Submit the inputfields to the backend:
        await createProduct();
        clearForm();
    }

    const [createProduct, { loading, error, data }] = useMutation(
        CREATE_PRODUCT_MUTATION,
        {
            variables: inputs, // preload
        }
    );

    return (
        <Form onSubmit={handleSubmit}>
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="name">
                    Name
                    <input
                        required
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="price">
                    Price
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="price"
                        value={inputs.price}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                {/* <button type="button" onClick={clearForm}>
                    Clear Form
                    </button>
                    <button type="button" onClick={resetForm}>
                    Reset Form
                </button> */}

                <button type="submit">+ Add Product</button>
            </fieldset>
        </Form>
    );
}

export default CreateProduct
