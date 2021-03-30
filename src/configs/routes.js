import Category from "../pages/Category";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Transaction from "../pages/Transaction";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    layout: "/admin",
  },
  {
    path: "/transaction",
    name: "Transaction",
    component: Transaction,
    layout: "/admin",
  },
];

export default routes;
