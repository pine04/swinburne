import { createWebHistory, createRouter } from 'vue-router'
import { useDriverAuthStore } from '../stores/driver_auth';
import { useAdminAuthStore } from '../stores/admin_auth';

const routes = [
	{
		path: '/',
		name: 'profile',
		component: () => import('../views/ProfileView.vue'),
		meta: { requiresAuth: true, role: "driver" }
	},
	{
		path: '/booking',
		name: 'booking',
		component: () => import('../views/BookingView.vue'),
		meta: { requiresAuth: true, role: "driver" }
	},
	{
		path: '/payment/:bookingId',
		name: 'payment',
		component: () => import('../views/PaymentView.vue'),
		meta: { requiresAuth: true, role: "driver" }
	},
	{
		path: '/driver/signin',
		name: 'login',
		component: () => import('../views/DriverLogin.vue'),
		meta: { requiresAuth: false, role: "driver", redirect: "/" }
	},
	{
		path: '/driver/signup',
		name: 'signup',
		component: () => import('../views/DriverSignup.vue'),
		meta: { requiresAuth: false, role: "driver", redirect: "/" }
	},
	{
		path: '/admin/signup',
		name: 'admin-signup',
		component: () => import('../views/AdminSignup.vue'),
		meta: { requiresAuth: false, role: "admin", redirect: "/admin" }
	},
	{
		path: '/admin/signin',
		name: 'admin-signin',
		component: () => import('../views/AdminLogin.vue'),
		meta: { requiresAuth: false, role: "admin", redirect: "/admin" }
	},
	{
		path: '/admin',
		name: 'admin',
		component: () => import('../views/AdminDashboard.vue'),
		meta: { requiresAuth: true, role: "admin" }
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth !== undefined) {
        const driverStore = useDriverAuthStore();
		const adminStore = useAdminAuthStore();

        if (driverStore.currentDriver === undefined) {
            await driverStore.getInitialAuthState();
        }

		if (adminStore.currentAdmin === undefined) {
			await adminStore.getInitialAuthState();
		}

        if (to.meta.requiresAuth) {
            if (to.meta.role === "driver" && driverStore.currentDriver === null) {
				return next("/driver/signin");
			}

			if (to.meta.role === "admin" && adminStore.currentAdmin === null) {
				return next("/admin/signin");
			}
        }

        if (!to.meta.requiresAuth) {
            if (to.meta.role === "driver" && driverStore.currentDriver !== null) {
				return next("/");
			}

			if (to.meta.role === "admin" && adminStore.currentAdmin !== null) {
				return next("/admin");
			}
        }
    }

    next();
});

export default router;
