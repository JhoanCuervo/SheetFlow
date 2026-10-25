export interface formProps {
    id?: string | number;
    name: string;
    description: string;
    color: string;
    status: boolean;
}

export interface FormProps {
  initialData?: formProps;
  onSaved?: () => void;
}
