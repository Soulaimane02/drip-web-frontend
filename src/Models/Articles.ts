export interface Articles {
    id?: string;
    name: string;
    description: string;
    price: number;
    pictures: string[];
    likes: number;
    views: number;
    condition: string;
    categories?: string[];
    size?: string;
    color?: string;
}