import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Layout',
    icon: 'layout-outline',
    children: [
      {
        title: 'Stepper',
        link: '/pages/layout/stepper',
      },
      {
        title: 'List',
        link: '/pages/layout/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/layout/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/layout/accordion',
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker',
      },
    ],
  },
  {
    title: 'UI Features',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Modal & Overlays',
    icon: 'browser-outline',
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover',
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr',
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip',
      },
    ],
  },
  {
    title: 'Extra Components',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-components/calendar',
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner',
      },
      {
        title: 'Alert',
        link: '/pages/extra-components/alert',
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-components/calendar-kit',
      },
      {
        title: 'Chat',
        link: '/pages/extra-components/chat',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'map-outline',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'text-outline',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
      {
        title: 'Créer Article',
        link: '/pages/Articles/create-article',
      },
    ],
  },
  {
    title: 'Chariot',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Chariots',
        link: '/pages/Chariots/chariot-list',
      },
      {
        title: 'Créer Chariot',
        link: '/pages/Chariots/create-chariot',
      },
    ],
  },
  {
    title: 'Bon Preparation',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Préparation',
        link: '/pages/Bon_Preps/bon-prep-list',
      },
      {
        title: 'Créer Bon Préparation',
        link: '/pages/Bon_Preps/create-bon-prep',
      },
    ],
  },
  {
    title: 'Bon Livraison',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Livraison',
        link: '/pages/Bon_Livs/bon-liv-list',
      },
      {
        title: 'Créer Bon Livraison',
        link: '/pages/Bon_Livs/create-bon-liv',
      },
    ],
  },
  {
    title: 'Bon Sortie',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Sortie',
        link: '/pages/Bon_Sorts/bon-sort-list',
      },
      {
        title: 'Créer Bon Sortie',
        link: '/pages/Bon_Sorts/create-bon-sort',
      },
    ],
  },
  {
    title: 'Achats',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Achats',
        link: '/pages/Achatss/achats-list',
      },
    ],
  },
  {
    title: 'Affaires',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Affaires',
        link: '/pages/Affaires/affaire-list',
      },
    ],
  },
  {
    title: 'Emballage',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Emballages',
        link: '/pages/Det_Embas/det-emba-list',
      },
      {
        title: 'Créer Emballage',
        link: '/pages/Det_Embas/create-det-emba',
      },
    ],
  },
  {
    title: 'Fournisseur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Fournisseurs',
        link: '/pages/Fourniss/fournis-list',
      },
    ],
  },
  {
    title: 'Etat Liv~',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Etat Liv~',
        link: '/pages/Etat_Livs/etat-liv-list',
      },
    ],
  },
  {
    title: 'Livreur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Livreurs',
        link: '/pages/Livreurs/livreur-list',
      },
      {
        title: 'Créer Livreur',
        link: '/pages/Livreurs/create-livreur',
      },
    ],
  },
  {
    title: 'Marque',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Marques',
        link: '/pages/Marques/marque-list',
      },
      {
        title: 'Créer Marque',
        link: '/pages/Marques/create-marque',
      },
    ],
  },
  {
    title: 'Modéles',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Modéles',
        link: '/pages/Models/model-list',
      },
      {
        title: 'Créer Model',
        link: '/pages/Models/create-model',
      },
    ],
  },
  {
    title: 'Expide',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Expides',
        link: '/pages/Expides/expide-list',
      },
      {
        title: 'Créer Expide',
        link: '/pages/Expides/create-expide',
      },
    ],
  },
  {
    title: 'Prime',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Primes',
        link: '/pages/Primes/prime-list',
      },
      {
        title: 'Créer Prime',
        link: '/pages/Primes/create-prime',
      },
    ],
  },
  {
    title: 'Vehicule',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Vehicules',
        link: '/pages/Vehicules/vehicule-list',
      },
      {
        title: 'Créer Vehicule',
        link: '/pages/Vehicules/create-vehicule',
      },
    ],
  },
  {
    title: 'Rectif',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Rectifs',
        link: '/pages/Rectifs/rectif-list',
      },
      {
        title: 'Créer Rectif',
        link: '/pages/Rectifs/create-rectif',
      },
    ],
  },
  {
    title: 'Utilisateur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Utilisateurs',
        link: '/pages/Utilisateurs/utilisateur-list',
      },
      {
        title: 'Créer Utilisateur',
        link: '/pages/Utilisateurs/create-utilisateur',
      },
    ],
  },
  {
    title: 'Tables & Data',
    icon: 'grid-outline',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Tree Grid',
        link: '/pages/tables/tree-grid',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
/** menu de utilisateur */

export const MENU_User: NbMenuItem[] = [
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
    ],
  },
];

/** menu de acheteur */
export const MENU_Acheteur: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
    ],
  },
  {
    title: 'Etat Liv~',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Etat Liv~',
        link: '/pages/Etat_Livs/etat-liv-list',
      },
    ],
  },
];

/** menu de admin */
export const MENU_Admin: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
      {
        title: 'Créer Article',
        link: '/pages/Articles/create-article',
      },
    ],
  },
  {
    title: 'Chariot',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Chariots',
        link: '/pages/Chariots/chariot-list',
      },
      {
        title: 'Créer Chariot',
        link: '/pages/Chariots/create-chariot',
      },
    ],
  },
  {
    title: 'Bon Preparation',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Préparation',
        link: '/pages/Bon_Preps/bon-prep-list',
      },
      {
        title: 'Créer Bon Préparation',
        link: '/pages/Bon_Preps/create-bon-prep',
      },
    ],
  },
  {
    title: 'Bon Livraison',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Livraison',
        link: '/pages/Bon_Livs/bon-liv-list',
      },
      {
        title: 'Créer Bon Livraison',
        link: '/pages/Bon_Livs/create-bon-liv',
      },
    ],
  },
  {
    title: 'Bon Sortie',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Sortie',
        link: '/pages/Bon_Sorts/bon-sort-list',
      },
      {
        title: 'Créer Bon Sortie',
        link: '/pages/Bon_Sorts/create-bon-sort',
      },
    ],
  },
  {
    title: 'Achats',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Achats',
        link: '/pages/Achatss/achats-list',
      },
    ],
  },
  {
    title: 'Affaires',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Affaires',
        link: '/pages/Affaires/affaire-list',
      },
    ],
  },
  {
    title: 'Emballage',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Emballages',
        link: '/pages/Det_Embas/det-emba-list',
      },
      {
        title: 'Créer Emballage',
        link: '/pages/Det_Embas/create-det-emba',
      },
    ],
  },
  {
    title: 'Fournisseur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Fournisseurs',
        link: '/pages/Fourniss/fournis-list',
      },
    ],
  },
  {
    title: 'Etat Liv~',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Etat Liv~',
        link: '/pages/Etat_Livs/etat-liv-list',
      },
    ],
  },
  {
    title: 'Livreur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Livreurs',
        link: '/pages/Livreurs/livreur-list',
      },
      {
        title: 'Créer Livreur',
        link: '/pages/Livreurs/create-livreur',
      },
    ],
  },
  {
    title: 'Marque',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Marques',
        link: '/pages/Marques/marque-list',
      },
      {
        title: 'Créer Marque',
        link: '/pages/Marques/create-marque',
      },
    ],
  },
  {
    title: 'Modéles',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Modéles',
        link: '/pages/Models/model-list',
      },
      {
        title: 'Créer Model',
        link: '/pages/Models/create-model',
      },
    ],
  },
  {
    title: 'Expide',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Expides',
        link: '/pages/Expides/expide-list',
      },
      {
        title: 'Créer Expide',
        link: '/pages/Expides/create-expide',
      },
    ],
  },
  {
    title: 'Prime',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Primes',
        link: '/pages/Primes/prime-list',
      },
      {
        title: 'Créer Prime',
        link: '/pages/Primes/create-prime',
      },
    ],
  },
  {
    title: 'Vehicule',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Vehicules',
        link: '/pages/Vehicules/vehicule-list',
      },
      {
        title: 'Créer Vehicule',
        link: '/pages/Vehicules/create-vehicule',
      },
    ],
  },
  {
    title: 'Rectif',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Rectifs',
        link: '/pages/Rectifs/rectif-list',
      },
      {
        title: 'Créer Rectif',
        link: '/pages/Rectifs/create-rectif',
      },
    ],
  },
  {
    title: 'Utilisateur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Utilisateurs',
        link: '/pages/Utilisateurs/utilisateur-list',
      },
      {
        title: 'Créer Utilisateur',
        link: '/pages/Utilisateurs/create-utilisateur',
      },
    ],
  },
];

/** menu de agent Code a barre */
export const MENU_Agent_CAB: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
      {
        title: 'Créer Article',
        link: '/pages/Articles/create-article',
      },
    ],
  },
  {
    title: 'Chariot',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Chariots',
        link: '/pages/Chariots/chariot-list',
      },
    ],
  },
  {
    title: 'Bon Livraison',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Livraison',
        link: '/pages/Bon_Livs/bon-liv-list',
      },
    ],
  },
  {
    title: 'Affaires',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Affaires',
        link: '/pages/Affaires/affaire-list',
      },
    ],
  },
  {
    title: 'Marque',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Marques',
        link: '/pages/Marques/marque-list',
      },
    ],
  },
  {
    title: 'Modéles',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Modéles',
        link: '/pages/Models/model-list',
      },
    ],
  },
];

/** menu de Client */
export const MENU_Client: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
    ],
  },
  {
    title: 'Etat Liv~',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Etat Liv~',
        link: '/pages/Etat_Livs/etat-liv-list',
      },
    ],
  },
];

/** menu de Emballeur */
export const MENU_Emballeur: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
    ],
  },
  {
    title: 'Bon Livraison',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Livraison',
        link: '/pages/Bon_Livs/bon-liv-list',
      },
    ],
  },
  {
    title: 'Bon Sortie',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Sortie',
        link: '/pages/Bon_Sorts/bon-sort-list',
      },
    ],
  },
  {
    title: 'Emballage',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Emballages',
        link: '/pages/Det_Embas/det-emba-list',
      },
      {
        title: 'Créer Emballage',
        link: '/pages/Det_Embas/create-det-emba',
      },
    ],
  },
];

/** menu de Expediteur */
export const MENU_Expediteur: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
    ],
  },
  {
    title: 'Bon Livraison',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Livraison',
        link: '/pages/Bon_Livs/bon-liv-list',
      },
    ],
  },
  {
    title: 'Bon Sortie',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Sortie',
        link: '/pages/Bon_Sorts/bon-sort-list',
      },
    ],
  },
  {
    title: 'Emballage',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Emballages',
        link: '/pages/Det_Embas/det-emba-list',
      },
      {
        title: 'Créer Emballage',
        link: '/pages/Det_Embas/create-det-emba',
      },
    ],
  },
  {
    title: 'Fournisseur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Fournisseurs',
        link: '/pages/Fourniss/fournis-list',
      },
    ],
  },
  {
    title: 'Etat Liv~',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Etat Liv~',
        link: '/pages/Etat_Livs/etat-liv-list',
      },
    ],
  },
  {
    title: 'Livreur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Livreurs',
        link: '/pages/Livreurs/livreur-list',
      },
      {
        title: 'Créer Livreur',
        link: '/pages/Livreurs/create-livreur',
      },
    ],
  },
  {
    title: 'Expide',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Expides',
        link: '/pages/Expides/expide-list',
      },
      {
        title: 'Créer Expide',
        link: '/pages/Expides/create-expide',
      },
    ],
  },
  {
    title: 'Vehicule',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Vehicules',
        link: '/pages/Vehicules/vehicule-list',
      },
      {
        title: 'Créer Vehicule',
        link: '/pages/Vehicules/create-vehicule',
      },
    ],
  },
];

/** menu de Preparateur */
export const MENU_Preparateur: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
    ],
  },
  {
    title: 'Chariot',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Chariots',
        link: '/pages/Chariots/chariot-list',
      },
    ],
  },
  {
    title: 'Bon Preparation',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Préparation',
        link: '/pages/Bon_Preps/bon-prep-list',
      },
    ],
  },
  {
    title: 'Bon Sortie',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Sortie',
        link: '/pages/Bon_Sorts/bon-sort-list',
      },
    ],
  },
];


/** menu de PREPARATEUR_Bon Réception */
export const MENU_Preparateur_BR: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
      {
        title: 'Créer Article',
        link: '/pages/Articles/create-article',
      },
    ],
  },
  {
    title: 'Bon Livraison',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Livraison',
        link: '/pages/Bon_Livs/bon-liv-list',
      },
      {
        title: 'Créer Bon Livraison',
        link: '/pages/Bon_Livs/create-bon-liv',
      },
    ],
  },
  {
    title: 'Achats',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Achats',
        link: '/pages/Achatss/achats-list',
      },
    ],
  },
  {
    title: 'Affaires',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Affaires',
        link: '/pages/Affaires/affaire-list',
      },
    ],
  },
  {
    title: 'Fournisseur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Fournisseurs',
        link: '/pages/Fourniss/fournis-list',
      },
    ],
  },
  {
    title: 'Livreur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Livreurs',
        link: '/pages/Livreurs/livreur-list',
      },
      {
        title: 'Créer Livreur',
        link: '/pages/Livreurs/create-livreur',
      },
    ],
  },
  {
    title: 'Marque',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Marques',
        link: '/pages/Marques/marque-list',
      },
      {
        title: 'Créer Marque',
        link: '/pages/Marques/create-marque',
      },
    ],
  },
  {
    title: 'Modéles',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Modéles',
        link: '/pages/Models/model-list',
      },
      {
        title: 'Créer Model',
        link: '/pages/Models/create-model',
      },
    ],
  },
  {
    title: 'Vehicule',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Vehicules',
        link: '/pages/Vehicules/vehicule-list',
      },
      {
        title: 'Créer Vehicule',
        link: '/pages/Vehicules/create-vehicule',
      },
    ],
  },
  {
    title: 'Rectif',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Rectifs',
        link: '/pages/Rectifs/rectif-list',
      },
      {
        title: 'Créer Rectif',
        link: '/pages/Rectifs/create-rectif',
      },
    ],
  },
];

/** menu de RESPONSABLE_DISPATCHING_BP */
export const MENU_Responsable_Dispatching_BP: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
    ],
  },
  {
    title: 'Chariot',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Chariots',
        link: '/pages/Chariots/chariot-list',
      },
      {
        title: 'Créer Chariot',
        link: '/pages/Chariots/create-chariot',
      },
    ],
  },
  {
    title: 'Bon Preparation',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Préparation',
        link: '/pages/Bon_Preps/bon-prep-list',
      },
      {
        title: 'Créer Bon Préparation',
        link: '/pages/Bon_Preps/create-bon-prep',
      },
    ],
  },
  {
    title: 'Bon Livraison',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Livraison',
        link: '/pages/Bon_Livs/bon-liv-list',
      },
      {
        title: 'Créer Bon Livraison',
        link: '/pages/Bon_Livs/create-bon-liv',
      },
    ],
  },
  {
    title: 'Bon Sortie',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Sortie',
        link: '/pages/Bon_Sorts/bon-sort-list',
      },
      {
        title: 'Créer Bon Sortie',
        link: '/pages/Bon_Sorts/create-bon-sort',
      },
    ],
  },
  {
    title: 'Achats',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Achats',
        link: '/pages/Achatss/achats-list',
      },
    ],
  },
  {
    title: 'Emballage',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Emballages',
        link: '/pages/Det_Embas/det-emba-list',
      },
    ],
  },
  {
    title: 'Fournisseur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Fournisseurs',
        link: '/pages/Fourniss/fournis-list',
      },
    ],
  },
  {
    title: 'Livreur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Livreurs',
        link: '/pages/Livreurs/livreur-list',
      },
    ],
  },
  {
    title: 'Expide',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Expides',
        link: '/pages/Expides/expide-list',
      },
    ],
  },
  {
    title: 'Rectif',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Rectifs',
        link: '/pages/Rectifs/rectif-list',
      },
      {
        title: 'Créer Rectif',
        link: '/pages/Rectifs/create-rectif',
      },
    ],
  },
];
/** menu de DECIDEUR_BP */
export const MENU_DECIDEUR_BP: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
    ],
  },
  {
    title: 'Bon Preparation',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Préparation',
        link: '/pages/Bon_Preps/bon-prep-list',
      },
      {
        title: 'Créer Bon Préparation',
        link: '/pages/Bon_Preps/create-bon-prep',
      },
    ],
  },
  {
    title: 'Chariot',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Chariots',
        link: '/pages/Chariots/chariot-list',
      },
      {
        title: 'Créer Chariot',
        link: '/pages/Chariots/create-chariot',
      },
    ],
  },
  {
    title: 'Emballage',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Emballages',
        link: '/pages/Det_Embas/det-emba-list',
      },
    ],
  },
  {
    title: 'Fournisseur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Fournisseurs',
        link: '/pages/Fourniss/fournis-list',
      },
    ],
  },
  {
    title: 'Livreur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Livreurs',
        link: '/pages/Livreurs/livreur-list',
      },
    ],
  },
  {
    title: 'Expide',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Expides',
        link: '/pages/Expides/expide-list',
      },
    ],
  },
  {
    title: 'Rectif',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Rectifs',
        link: '/pages/Rectifs/rectif-list',
      },
      {
        title: 'Créer Rectif',
        link: '/pages/Rectifs/create-rectif',
      },
    ],
  },
];


/** menu de RESPONSABLE_POINTAGE */
export const MENU_Responsable_Pointage: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Chariot',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Chariots',
        link: '/pages/Chariots/chariot-list',
      },
    ],
  },
  {
    title: 'Bon Preparation',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Préparation',
        link: '/pages/Bon_Preps/bon-prep-list',
      },
    ],
  },
  {
    title: 'Bon Livraison',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Livraison',
        link: '/pages/Bon_Livs/bon-liv-list',
      },
      {
        title: 'Créer Bon Livraison',
        link: '/pages/Bon_Livs/create-bon-liv',
      },
    ],
  },
  {
    title: 'Bon Sortie',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Sortie',
        link: '/pages/Bon_Sorts/bon-sort-list',
      },
    ],
  },
  {
    title: 'Emballage',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Emballages',
        link: '/pages/Det_Embas/det-emba-list',
      },
    ],
  },
];

/** menu de Validateur_De_Chariot */
export const MENU_Validateur_De_Chariot: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
    ],
  },
  {
    title: 'Chariot',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Chariots',
        link: '/pages/Chariots/chariot-list',
      },
    ],
  },
  {
    title: 'Bon Sortie',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Sortie',
        link: '/pages/Bon_Sorts/bon-sort-list',
      },
    ],
  },
];

/** menu de livreur */
export const MENU_Livreur: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Bon Livraison',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Livraison',
        link: '/pages/Bon_Livs/bon-liv-list',
      },
    ],
  },
  {
    title: 'Bon Sortie',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Bons Sortie',
        link: '/pages/Bon_Sorts/bon-sort-list',
      },
    ],
  },
  {
    title: 'Fournisseur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Fournisseurs',
        link: '/pages/Fourniss/fournis-list',
      },
    ],
  },
  {
    title: 'Etat Liv~',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Etat Liv~',
        link: '/pages/Etat_Livs/etat-liv-list',
      },
    ],
  },
  {
    title: 'Livreur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Livreurs',
        link: '/pages/Livreurs/livreur-list',
      },
    ],
  },
  {
    title: 'Expide',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Expides',
        link: '/pages/Expides/expide-list',
      },
    ],
  },
  {
    title: 'Prime',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Primes',
        link: '/pages/Primes/prime-list',
      },
    ],
  },
];

/** menu de CAISSIER */
export const MENU_Caissier: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },  
  {
    title: 'Article',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Articles',
        link: '/pages/Articles/article-list',
      },
    ],
  },
  {
    title: 'Chariot',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Chariots',
        link: '/pages/Chariots/chariot-list',
      },
    ],
  },
  {
    title: 'Achats',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Achats',
        link: '/pages/Achatss/achats-list',
      },
    ],
  },
  {
    title: 'Affaires',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Affaires',
        link: '/pages/Affaires/affaire-list',
      },
    ],
  },
  {
    title: 'Emballage',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Emballages',
        link: '/pages/Det_Embas/det-emba-list',
      },
    ],
  },
  {
    title: 'Fournisseur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Fournisseurs',
        link: '/pages/Fourniss/fournis-list',
      },
    ],
  },
  {
    title: 'Livreur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Livreurs',
        link: '/pages/Livreurs/livreur-list',
      },
    ],
  },
  {
    title: 'Prime',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Primes',
        link: '/pages/Primes/prime-list',
      },
      {
        title: 'Créer Prime',
        link: '/pages/Primes/create-prime',
      },
    ],
  },
  {
    title: 'Rectif',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Rectifs',
        link: '/pages/Rectifs/rectif-list',
      },
      {
        title: 'Créer Rectif',
        link: '/pages/Rectifs/create-rectif',
      },
    ],
  },
  {
    title: 'Utilisateur',
    icon: 'grid-outline',
    children: [
      {
        title: 'List Utilisateurs',
        link: '/pages/Utilisateurs/utilisateur-list',
      },
    ],
  },
];

