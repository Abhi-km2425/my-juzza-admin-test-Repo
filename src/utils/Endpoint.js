// export const baseUrl = "http://localhost:9000"
 export const baseUrl = "https://server.juzafoods.com"

// auth
export const loginRoute = "/api/auth/admin-login";
export const logoutRoute = "/api/auth/admin-logout";



export const GetProducts = "/api/admin/get-products";
export const AddProducts = "/api/admin/add-product";
export const UpdateProducts = "/api/admin/update-product";
export const UnlistProducts = "/api/admin/unlist-product"; //=.Product IId
export const ListProducts = "/api/admin/list-product"; //=.Product IId
export const DeleteProducts = "/api/admin/delete-product"; //=.Product IId


export const GetCategory = "/api/admin/categories";
export const AddCategories = "/api/admin/add-category";
export const UnlistCategory = "/api/admin/unlist-category"; //=>id:
export const ListCategory = "/api/admin/list-category"; //=>id:
export const UpdateCategory = "/api/admin/update-category";

// Orders
export const GetAllOrders = "/api/admin/all-orders";
export const GetAOrders = "/api/admin/order/details";
export const UpdateOrderStatus = "/api/admin/order"; //=> id

// Users
export const GetUsers= "/api/admin/customers";
export const BlockUser= "/api/admin/block-user";//=>id
export const UnblockUser= "/api/admin/unblock-user";//=>id

export const GetDashboard = "/api/admin/dashboard";
