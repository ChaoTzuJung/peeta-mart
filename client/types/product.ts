export type Image = {
    publicUrlTransformed: string;
};

export type Photo = {
    id: string;
    image: Image;
};

export type ProductType = {
    id: string;
    name: string;
    price: number;
    description: string;
    photo: Photo;
};