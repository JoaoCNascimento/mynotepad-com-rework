export interface Note {
    _id: any;
    title: string;
    content: string;
    description?: string;
    tags?: string[];
    color: string;
    created_at: Date;
    updated_at: Date;
}