import home from './components/home';
import about from './components/about';
import notFound from './components/notFound';
import register from './components/register';
import login from './components/login';
import contact from './components/kontakt';
import tickets from './components/tickets';
import ticket from './components/ticket';
import profile from './components/profile';
import editProfile from './components/editProfile';
import banned from './components/banned';
import addArticle from './components/addArticle';
import viewArticle from './components/viewArticle';
import editArticle from './components/editArticle';

import axios from 'axios';

export default{
    mode: 'history',

    routes: [
        {
            //If the user types in something not defined here, redirects them to the not found page
            path: '*',
            component: notFound,
            name: 'notFound',
        },
        {
            path: '/projekti/fsre_rwa/2020/g11/',
            component: home,
            name: 'home',
        },
        {
            path: '/projekti/fsre_rwa/2020/g11/login',
            component: login,
            name: 'login',
            //Checks if user is already logged in. If they are, then redirects them to home
            beforeEnter: (to, form, next) => {
                axios.get('/projekti/fsre_rwa/2020/g11/api/authenticated').then(()=>{
                    return next({name: 'home'})
                }).catch(()=>{
                    next()
                })
            }
        },
        {
            path: '/projekti/fsre_rwa/2020/g11/about',
            component: about,
            name: 'about',
        },
        {
            path: '/projekti/fsre_rwa/2020/g11/register',
            component: register,
            name: 'register',
            //Checks if user is already logged in. If they are, then redirects them to home
            beforeEnter: (to, form, next) => {
                axios.get('/projekti/fsre_rwa/2020/g11/api/authenticated').then(()=>{
                    return next({name: 'home'})
                }).catch(()=>{
                    next()
                })
            }
        },
        {
            path: '/projekti/fsre_rwa/2020/g11/contact',
            component: contact,
            name: 'contact',
        },
        {
            path: '/projekti/fsre_rwa/2020/g11/tickets',
            component: tickets,
            //Checks if user is admin. If not logged in, redirect to home
            beforeEnter: (to, form, next) => {
                axios.get('/projekti/fsre_rwa/2020/g11/api/user').then((res)=>{
                    if (res.data.role == '1' || res.data.role == '2') {
                        next()
                    } else {
                        return next({name: 'home'})
                    }
                }).catch(()=>{
                    return next({ name: 'login' })
                })
            }
        },
        {
            path: '/projekti/fsre_rwa/2020/g11/profile/:id',
            component: profile,
            name: 'profile',
            beforeEnter: (to, form, next) => {
                axios.get('/projekti/fsre_rwa/2020/g11/api/authenticated').then(()=>{
                    next()
                }).catch(()=>{
                    return next({ name: 'login'})
                })
            }
        },
        {
            path: '/projekti/fsre_rwa/2020/g11/editProfile/:id',
            component: editProfile,
            name: 'editProfile',
            props: true,
            beforeEnter: (to, form, next) => {
                //Check if user is logged in
                axios.get('/projekti/fsre_rwa/2020/g11/api/authenticated').then(()=>{
                    next()                    
                }).catch(()=>{
                    return next({ name: 'login'})
                })
            }
        },
        {
            path: '/projekti/fsre_rwa/2020/g11/ticket/:id',
            component: ticket,
            name: 'ticket',
            //Checks if user is admin. If not logged in, redirect to login
            beforeEnter: (to, form, next) => {
                axios.get('/projekti/fsre_rwa/2020/g11/api/user').then((res)=>{
                    if (res.data.role == '1' || res.data.role == '2') {
                        next()
                    } else {
                        return next({name: 'home'})
                    }
                }).catch(()=>{
                    return next({ name: 'login' })
                })
            }
        },
        {
            //If the user has been banned they will be redirected to this route through another system (after being logged out first!)
            //A non-banned user may manually navigate to it, which will cause no harm
            path: '/projekti/fsre_rwa/2020/g11/banned',
            component: banned,
            name: 'banned',
        },
        {
            path: '/projekti/fsre_rwa/2020/g11/addArticle',
            component: addArticle,
            name: 'addArticle',
            //Checks if user is admin. If not logged in, redirect to login
            beforeEnter: (to, form, next) => {
                axios.get('/projekti/fsre_rwa/2020/g11/api/user').then((res)=>{
                    if (res.data.role == '1' || res.data.role == '2') {
                        next()
                    } else {
                        return next({ name: 'home' })
                    }
                }).catch(()=>{
                    return next({ name: 'login' })
                })
            }
        },
        {
            path: '/projekti/fsre_rwa/2020/g11/viewArticle/:id',
            component: viewArticle,
            name: 'viewArticle',
        },
        {
            path: '/projekti/fsre_rwa/2020/g11/editArticle/:id',
            component: editArticle,
            name: 'editArticle',
            //Checks if user is admin. If not logged in, redirect to login
            beforeEnter: (to, form, next) => {
                axios.get('/projekti/fsre_rwa/2020/g11/api/user').then((res)=>{
                    if (res.data.role > 0) {
                        next()
                    } else {
                        return next({ name: 'home' })
                    }
                }).catch(()=>{
                    return next({ name: 'login' })
                })
            }
        },
        //{},
        //{},
        //{},
        //{},
    ]
}