module.exports = {
    AUTH_GET_TOKEN: '/user/get-token', // 获取接口调用凭证token
    SERVICE_OAUTH_URL: '/service/get-corp-oauth-url', // 获取授权链接
    SERVICE_AUDIT_TYPE: '/service/get-audit-type', // 获取审核类型

    AUDIT_PROCESS_LIST: '/audit-process/list', // 审批流程列表
    AUDIT_PROCESS_DETAILS: '/audit-process/audit-details', // 审核流程详情
    AUDIT_PROCESS_SAVE: '/audit-process/save-audit', // 保存审核流程数据
    AUDIT_PROCESS_UPDATE: '/audit-process/update-audit-stauts', // 审核流程启用停用
    AUDIT_PROCESS_DELETE: '/audit-process/delete', // 删除审核流程

    COST_TYPE_LIST: '/cost-type/list', // 费用类型列表
    COST_TYPE_DETAILS: '/cost-type/get-details', // 费用类型详情
    COST_TYPE_SAVE: '/cost-type/save-details', // 保存费用类型详情

    DEPARTMENT_LISTS: '/department/lists', // 获取部门列表
    DEPARTMENT_USER_LISTS: '/department/user-lists', // 获取用户列表
    USER_UPDATE: '/user/edit-user', // 编辑员工信息
    USER_DELETE: '/user/delete-user', // 删除员工信息
    USER_DEPARTMENT: '/user/department-lists', // 获取员工所属部门

    EXPENSES_LIST: 'expenses/expenses-list', // 费用报销列表
    EXPENSES_VIEW: 'expenses/expenses-view', // 费用报销详情
    EXPENSES_EXPORT: 'expenses/export-excel', // 费用报销导出
    EXPENSES_SET: 'approve/set', // 设置审批
    EXPENSES_PDF: 'expenses/view-pdf', // 查看发票PDF
}

