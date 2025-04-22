export interface Articles {
    id: string;
    name: string;
    description: string;
    price: number;
    pictures: string[] | string;
    likes: number;
    views: number;
    condition: string;
    categories?: string[] | string;
    userId: string;
    size?: string;
    color?: string;
}