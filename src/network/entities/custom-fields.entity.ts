export interface CustomField {
    _id: string;
    label: string;
    scope: string;
    visibility: string;
    regexp: string;
    type: string;
    required: boolean;
    defaultValue: string;
    options: string;
    public: boolean;
    _updatedAt: Date;
    id: string;
}

export interface CustomFieldsProps {
    customFields: CustomField[];
    count: number;
    offset: number;
    total: number;
    success: boolean;
}