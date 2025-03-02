import { FormSchemaCollection } from '../types';

export const formSchemas: FormSchemaCollection = {
  form1_1: {
    schema: {
      type: 'object',
      properties: {
        personalInfo: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              title: 'Prénom'
            },
            lastName: {
              type: 'string',
              title: 'Nom'
            },
            email: {
              type: 'string',
              format: 'email',
              title: 'Email'
            }
          },
          required: ['firstName', 'lastName', 'email']
        },
        address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
              title: 'Rue'
            },
            city: {
              type: 'string',
              title: 'Ville'
            },
            zipCode: {
              type: 'string',
              title: 'Code postal'
            }
          }
        }
      }
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Category',
          label: 'Informations personnelles',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/personalInfo/properties/firstName'
            },
            {
              type: 'Control',
              scope: '#/properties/personalInfo/properties/lastName'
            },
            {
              type: 'Control',
              scope: '#/properties/personalInfo/properties/email'
            }
          ]
        },
        {
          type: 'Category',
          label: 'Adresse',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/address/properties/street'
            },
            {
              type: 'Control',
              scope: '#/properties/address/properties/city'
            },
            {
              type: 'Control',
              scope: '#/properties/address/properties/zipCode'
            }
          ]
        }
      ]
    },
    data: {}
  },
  form1_2: {
    schema: {
      type: 'object',
      properties: {
        professionalInfo: {
          type: 'object',
          properties: {
            company: {
              type: 'string',
              title: 'Entreprise'
            },
            position: {
              type: 'string',
              title: 'Poste'
            },
            experience: {
              type: 'number',
              title: 'Années d\'expérience'
            }
          }
        },
        skills: {
          type: 'array',
          title: 'Compétences',
          items: {
            type: 'string'
          }
        }
      }
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Category',
          label: 'Informations professionnelles',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/professionalInfo/properties/company'
            },
            {
              type: 'Control',
              scope: '#/properties/professionalInfo/properties/position'
            },
            {
              type: 'Control',
              scope: '#/properties/professionalInfo/properties/experience'
            }
          ]
        },
        {
          type: 'Category',
          label: 'Compétences',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/skills'
            }
          ]
        }
      ]
    },
    data: {}
  },
  form1_3: {
    schema: {
      type: 'object',
      properties: {
        preferences: {
          type: 'object',
          properties: {
            theme: {
              type: 'string',
              enum: ['light', 'dark', 'system'],
              title: 'Thème'
            },
            notifications: {
              type: 'boolean',
              title: 'Activer les notifications'
            },
            language: {
              type: 'string',
              enum: ['fr', 'en', 'es', 'de'],
              title: 'Langue'
            }
          }
        }
      }
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Category',
          label: 'Préférences utilisateur',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/preferences/properties/theme',
              options: {
                format: 'radio'
              }
            },
            {
              type: 'Control',
              scope: '#/properties/preferences/properties/notifications'
            },
            {
              type: 'Control',
              scope: '#/properties/preferences/properties/language'
            }
          ]
        }
      ]
    },
    data: {
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'fr'
      }
    }
  },

 
  form2_1: {
    schema: {
      type: 'object',
      properties: {
        projectInfo: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              title: 'Nom du projet'
            },
            description: {
              type: 'string',
              title: 'Description'
            },
            startDate: {
              type: 'string',
              format: 'date',
              title: 'Date de début'
            },
            endDate: {
              type: 'string',
              format: 'date',
              title: 'Date de fin'
            }
          },
          required: ['name', 'startDate']
        },
        team: {
          type: 'array',
          title: 'Équipe',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                title: 'Nom'
              },
              role: {
                type: 'string',
                title: 'Rôle'
              }
            }
          }
        }
      }
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Category',
          label: 'Informations du projet',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/projectInfo/properties/name'
            },
            {
              type: 'Control',
              scope: '#/properties/projectInfo/properties/description',
              options: {
                multi: true
              }
            },
            {
              type: 'Control',
              scope: '#/properties/projectInfo/properties/startDate'
            },
            {
              type: 'Control',
              scope: '#/properties/projectInfo/properties/endDate'
            }
          ]
        },
        {
          type: 'Category',
          label: 'Membres de l\'équipe',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/team'
            }
          ]
        }
      ]
    },
    data: {}
  },
  form2_2: {
    schema: {
      type: 'object',
      properties: {
        budget: {
          type: 'object',
          properties: {
            total: {
              type: 'number',
              title: 'Budget total'
            },
            currency: {
              type: 'string',
              enum: ['EUR', 'USD', 'GBP'],
              title: 'Devise'
            },
            allocated: {
              type: 'boolean',
              title: 'Budget alloué'
            }
          }
        },
        expenses: {
          type: 'array',
          title: 'Dépenses',
          items: {
            type: 'object',
            properties: {
              description: {
                type: 'string',
                title: 'Description'
              },
              amount: {
                type: 'number',
                title: 'Montant'
              },
              date: {
                type: 'string',
                format: 'date',
                title: 'Date'
              }
            }
          }
        }
      }
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Category',
          label: 'Information budgétaire',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/budget/properties/total'
            },
            {
              type: 'Control',
              scope: '#/properties/budget/properties/currency'
            },
            {
              type: 'Control',
              scope: '#/properties/budget/properties/allocated'
            }
          ]
        },
        {
          type: 'Category',
          label: 'Liste des dépenses',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/expenses'
            }
          ]
        }
      ]
    },
    data: {
      budget: {
        currency: 'EUR'
      }
    }
  }
};