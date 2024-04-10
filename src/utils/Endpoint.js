export const baseUrl = "http://localhost:9000"

// auth
export const loginRoute = "/api/auth/admin-login";
export const logoutRoute = "/api/auth/admin-logout";

export const GetProducts = "/api/admin/get-products";

export const GetCategory = "/api/admin/categories";
export const AddCategories = "/api/admin/add-category";
export const UnlistCategory = "/api/admin/unlist-category"; //=>id:
export const ListCategory = "/api/admin/list-category"; //=>id:
export const UpdateCategory = "/api/admin/update-category"; 

// Orders
export const GetAllOrders = "/api/admin/all-orders";
export const GetAOrders = "/api/admin/order/details";


export const GetDashboard = "/api/admin/dashboard";


// staff 
export const staffCreateRoute = "/api/staff/create"
export const staffGetRoute = "/api/staff/get"
export const staffGetAllRoute = "/api/staff/get-all"
export const staffUpdateRoute = "/api/staff/update"
export const staffBlockUnblockRoute = "/api/staff/block-unblock"
export const staffDeleteRoute = "/api/staff/delete"


// patient
export const patientCreateRoute = "/api/patient/create"
export const patientGetRoute = "/api/patient/get"
export const patientGetAllRoute = "/api/patient/get-all"
export const patientUpdateRoute = "/api/patient/update"
export const patientBlockUnblockRoute = "/api/patient/block-unblock"
export const patientDeleteRoute = "/api/patient/delete"


export const addMedicationRoute = "/api/patient/add-medication"
export const addEquipmentRoute = "/api/patient/add-equipment"
export const addPrescriptionRoute = "/api/patient/add-prescription"

export const getMedicationsRoute = "/api/patient/get-medications"
export const getUsedEquipmentsRoute = "/api/patient/get-used-equipments"
export const getPrescriptionsRoute = "/api/patient/get-prescriptions"

// Stock
export const stockCreateRoute = "/api/stock/create"
export const stockGetAllRoute = "/api/stock/get-all"
export const stockGetRoute = "/api/stock/get"
export const stockUpdateRoute = "/api/stock/update"
export const stockDeleteRoute = "/api/stock/delete"
export const getAllEquipmentsRoute = "/api/stock/get-all-equipments"
export const getAllMedicinesRoute = "/api/stock/get-all-medicines"

// Accounts
export const addIncomeRoute = "/api/accounts/add-income"
export const addExpenseRoute = "/api/accounts/add-expense"

export const getAllIncomeRoute = "/api/accounts/get-all-income"
export const getAllExpenseRoute = "/api/accounts/get-all-expense"


// GET All Names
export const getAllPatientNames = "/api/general/names/patients"
export const getAllStaffNames = "/api/general/names/staffs"
export const getAllVolunteerNames = "/api/general/names/volunteers"
export const getAllDriverNames = "/api/general/names/drivers"
export const getAllNurseNames = "/api/general/names/nurses"
export const getAllDoctorNames = "/api/general/names/doctors"
export const getAllDonorNames = "/api/general/names/donors"
export const getAllMedicineNames = "/api/general/names/medicines"
export const getAllEquipmentNames = "/api/general/names/equipments"

// DIARY ROUTES
export const CreateDiaryRoute = "/api/diary/create"
export const GetDailyDiariesRoute = "/api/diary/daily-diaries"

export const visitAddRoute = "/api/diary/add-visit"
export const visitEditRoute = "/api/diary/edit-visit"
export const visitGetRoute = "/api/diary/get-visit"
export const visitGetTodayRoute = "/api/diary/get-today-visits"
export const visitGetAllRoute = "/api/diary/get-all-visits"
export const visitDeleteRoute = "/api/diary/delete-visit"


export const dashboardCardsRoute = "/api/general/dashboard/cards"

export const getVisitsChartRoute= "/api/general/dashboard/chart"


// Attendance 
export const getAttendanceRoute = "/api/staff/get-attendance"

export const getPersonsOfAVisit = "/api/diary/persons-of-visit"

export const changeEquipmentStatus = "/api/patient/change-equipment-status"

export const getTodaysPatients = "/api/diary/get-today-patients"

export const addDataRoute = "/api/data/add"

export const getDataRoute = "/api/data/get"


// Reports
export const getSingleUsedEqpReport = "/api/general/single-used-equipment-report"
export const getAllUsedEqpReport = "/api/general/all-used-equipment-report"

export const getVisitsReport = "/api/diary/visits-report"

export const getUsingEqpRoute = "/api/patient/get-using-equipments"

export const issueEqpRoute = "/api/stock/issue-equipments"

export const returnEqpRoute = "/api/stock/return-equipments"