/* Constants */
const ROOT_PATH = "/";
const ROOT_SUPER_ADMIN_DASHBOARD = "super-admin-dashboard";
const ROOT_OUTLET_ADMIN_DASHBOARD = "outlet-admin-dashboard";

/* Home Page */
export { ROOT_PATH };

/* Root Pages */
export const PAGE_ROOT = {
  signIn: {
    relativePath: "signin",
    absolutePath: "/signin",
  },
  notFound: {
    relativePath: "not-found",
    absolutePath: "/not-found",
  },
  notAllowed: {
    relativePath: "not-allowed",
    absolutePath: "/not-allowed",
  },
};

/* Super Admin Dashboard Pages */
export const PAGE_SUPER_ADMIN_DASHBOARD = {
  root: {
    relativePath: ROOT_SUPER_ADMIN_DASHBOARD,
    absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}`,
  },
  account: {
    relativePath: "account",
    absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/account`,
  },
  analytics: {
    relativePath: "analytics",
    absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/analytics`,
  },
  admins: {
    relativePath: "admins",
    absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/admins`,
    create: {
      relativePath: "create",
      absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/admins/create`,
    },
    edit: {
      relativePath: "edit/:id",
      absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/admins/edit/:id`,
    },
  },
  outlets: {
    relativePath: "outlets",
    absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/outlets`,
    create: {
      relativePath: "create",
      absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/outlets/create`,
    },
    edit: {
      relativePath: "edit/:id",
      absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/outlets/edit/:id`,
    },
  },
  products: {
    relativePath: "products",
    absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/products`,
    create: {
      relativePath: "create",
      absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/products/create`,
    },
    edit: {
      relativePath: "edit/:id",
      absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/products/edit/:id`,
    },
  },
  categories: {
    relativePath: "categories",
    absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/categories`,
    create: {
      relativePath: "create",
      absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/categories/create`,
    },
    edit: {
      relativePath: "edit/:id",
      absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/categories/edit/:id`,
    },
  },
  inventories: {
    relativePath: "inventories",
    absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/inventories`,
    create: {
      relativePath: "create",
      absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/inventories/create`,
    },
    edit: {
      relativePath: "edit/:id",
      absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/inventories/edit/:id`,
    },
  },
  productRequests: {
    relativePath: "product-requests",
    absolutePath: `/${ROOT_SUPER_ADMIN_DASHBOARD}/product-requests`,
  },
};

export const PAGE_OUTLET_ADMIN_DASHBOARD = {
  root: {
    relativePath: ROOT_OUTLET_ADMIN_DASHBOARD,
    absolutePath: `/${ROOT_OUTLET_ADMIN_DASHBOARD}`,
  },
  account: {
    relativePath: "account",
    absolutePath: `/${ROOT_OUTLET_ADMIN_DASHBOARD}/account`,
  },
  analytics: {
    relativePath: "analytics",
    absolutePath: `/${ROOT_OUTLET_ADMIN_DASHBOARD}/analytics`,
  },
};
