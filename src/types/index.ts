export type Product = {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
    price: Float32Array;
    description: string;
};

export type CartItems = {
    [k: number]: number;
}