import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    key: 'utilisateur',
    label: 'Première catégorie',
    children: [
      {
        key: 'utilisateur-form1',
        label: 'Informations personnelles',
        formKey: 'form1_1'
      },
      {
        key: 'utilisateur-form2',
        label: 'Informations professionnelles',
        formKey: 'form1_2'
      },
      {
        key: 'utilisateur-form3',
        label: 'Préférences utilisateur',
        formKey: 'form1_3'
      }
    ]
  },
  {
    key: 'category2',
    label: 'Deuxième catégorie',
    children: [
      {
        key: 'category2-form1',
        label: 'Informations du projet',
        formKey: 'form2_1'
      },
      {
        key: 'category2-form2',
        label: 'Information budgétaire',
        formKey: 'form2_2'
      }
    ]
  }
];