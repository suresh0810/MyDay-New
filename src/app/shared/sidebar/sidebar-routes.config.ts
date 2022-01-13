import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    {
        path: '', title: 'Dashboard', icon: 'zmdi zmdi-view-dashboard', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            
            { path: '/dashboard/production', title: 'Production', icon: 'icon-layers icons', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/dashboard/task', title: 'Task', icon: 'icon-notebook icons', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/dashboard/finance', title: 'Expenses', icon: 'icon-wallet icons', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/dashboard/user-profile', title: 'User Profile', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                       
        ]
    },   
    {
        path: '', title: 'UI Icons', icon: 'zmdi zmdi-invert-colors', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/ui-icons/font-awesome-icon', title: 'Font Awesome icon', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/ui-icons/material-design', title: 'Material Design', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/ui-icons/themify', title: 'Themify', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/ui-icons/line-icons', title: 'Line Icons', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },   
   
   /* {
        path: '', title: 'Authentication', icon: 'zmdi zmdi-lock', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/auth/signin1', title: 'SignIn 1', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/auth/signup1', title: 'SignUp 1', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/auth/signin2', title: 'SignIn 2', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/auth/signup2', title: 'SignUp 2', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/auth/lock-screen', title: 'Lock Screen', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/auth/reset-password1', title: 'Reset Password 1', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/auth/reset-password2', title: 'Reset Password 2', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
           ]
    },*/     
        
   
    /* {
        path: '', title: 'Pages', icon: 'zmdi zmdi-collection-folder-image', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/pages/invoice', title: 'Invoice', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/user-profile', title: 'User Profile', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/blank-page', title: 'Blank Page', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/coming-soon', title: 'Coming Soon', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/pages/error-403', title: 'Error 403', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/pages/error-404', title: 'Error 404', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/pages/error-500', title: 'Error 500', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
    },
    
    
   {
        path: 'javascript:;', title: 'Menu Levels', icon: 'fa fa-share', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
            submenu: [
                { path: 'javascript:;', title: 'Level 1', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                    { path: 'javascript:;', title: 'Level 1', icon: 'zmdi zmdi-dot-circle-alt', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, 
                        submenu: [
                            { path: 'javascript:;', title: 'level 2', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                            { path: 'javascript:;', title: 'level 2', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                            { path: 'javascript:;', title: 'level 2', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

                        ] },
                { path: 'javascript:;', title: 'Level 1', icon: 'zmdi zmdi-dot-circle-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ]
    },
    { path: 'https://codervent.com/dashtreme-angular/docs/', title: 'Documentation', icon: 'fa fa-address-book', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    { path: 'https://themeforest.net/user/codervent/portfolio', title: 'Support', icon: 'zmdi zmdi-help-outline', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }*/

    
];
