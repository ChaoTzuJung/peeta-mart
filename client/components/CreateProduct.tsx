import useForm from '../lib/useForm';
import Form from './styles/Form';

const CreateProduct = () => {
    const { inputs, handleChange, resetForm, clearForm } = useForm({
        image: '',
        name: 'Nice Shoes',
        price: 34234,
        description: 'These are the best shoes!',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <fieldset aria-busy={true}>
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
