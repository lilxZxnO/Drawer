export interface MenuItem {
  key: string;
  label: string;
  children?: MenuItem[];
  formKey?: string;
}

export interface FormSchema {
  schema: any;
  uischema: any;
  data?: any;
}

export interface FormSchemaCollection {
  [key: string]: FormSchema;
}