import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Friends from '@/components/Friends.vue';
import Groups from '@/components/Groups.vue';
import Users from '@/components/Users.vue';
import CreateGroup from '@/components/CreateGroup.vue';
const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/groups',
        component: Groups,
    },
    {
        path: '/users',
        component: Users,
    },
    {
        path: '/friends',
        component: Friends,
    },
    {
        path: '/createGroup',
        component: CreateGroup,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
