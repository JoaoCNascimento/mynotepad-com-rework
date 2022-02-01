export interface Note {
    _id: any;
    title: string;
    content: string;
    description?: string;
    tags?: string[];
    color: string;
    createdAt?: Date; // é terrível
    updatedAt?: Date; // eu sei
    created_at: Date;
    updated_at: Date;
}