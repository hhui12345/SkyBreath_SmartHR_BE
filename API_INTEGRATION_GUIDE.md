# Employment Contract Management API Integration Guide

## Overview
This guide provides detailed documentation for integrating the Employment Contract Management backend with the frontend application. The backend provides comprehensive APIs for managing employment contracts with full CRUD operations, searching, filtering, and export functionality.

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
All endpoints require Bearer token authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### 1. Create Employment Contract
**Endpoint:** `POST /contracts`

**Permissions Required:** `CONTRACT_CREATE`

**Request Body:**
```json
{
    "employeeId": 1,
    "contractNumber": "CT-2024-001",
    "contractType": "Permanent",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "workingHours": 8,
    "contractStatus": "Active",
    "signedDate": "2024-01-01"
}
```

**Response (201 Created):**
```json
{
    "success": true,
    "message": "Hợp đồng được tạo thành công",
    "data": {
        "id": 1,
        "employeeId": 1,
        "contractNumber": "CT-2024-001",
        "contractType": "Permanent",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "workingHours": 8,
        "contractStatus": "Active",
        "signedDate": "2024-01-01",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
    }
}
```

### 2. Get All Contracts (with Pagination)
**Endpoint:** `GET /contracts`

**Permissions Required:** `CONTRACT_READ`

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page
- `search` (optional) - Search by contract number or employee name
- `sortBy` (optional) - Sort field (e.g., startDate, contractStatus)
- `sortOrder` (optional, default: DESC) - ASC or DESC
- `contractStatus` (optional) - Filter by status (Active, Terminated, etc.)
- `contractType` (optional) - Filter by type (Permanent, Temporary, etc.)

**Example Request:**
```
GET /contracts?page=1&limit=10&contractStatus=Active&sortBy=startDate&sortOrder=DESC
```

**Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "employeeId": 1,
            "contractNumber": "CT-2024-001",
            "contractType": "Permanent",
            "startDate": "2024-01-01",
            "endDate": "2024-12-31",
            "workingHours": 8,
            "contractStatus": "Active",
            "employee": {
                "id": 1,
                "fullName": "John Doe",
                "department": {
                    "id": 1,
                    "departmentName": "HR"
                },
                "position": {
                    "id": 1,
                    "positionName": "Manager"
                }
            }
        }
    ],
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
}
```

### 3. Get Contract Details
**Endpoint:** `GET /contracts/:id`

**Permissions Required:** `CONTRACT_READ`

**Path Parameters:**
- `id` (required) - Contract ID

**Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "employeeId": 1,
        "contractNumber": "CT-2024-001",
        "contractType": "Permanent",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "workingHours": 8,
        "contractStatus": "Active",
        "signedDate": "2024-01-01",
        "employee": {
            "id": 1,
            "fullName": "John Doe",
            "email": "john@example.com",
            "phone": "0123456789",
            "department": {
                "id": 1,
                "departmentName": "HR"
            },
            "position": {
                "id": 1,
                "positionName": "Manager"
            }
        },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
    }
}
```

### 4. Update Employment Contract
**Endpoint:** `PUT /contracts/:id`

**Permissions Required:** `CONTRACT_UPDATE`

**Path Parameters:**
- `id` (required) - Contract ID

**Request Body (all fields optional):**
```json
{
    "contractType": "Permanent",
    "endDate": "2024-12-31",
    "workingHours": 8,
    "contractStatus": "Active",
    "signedDate": "2024-01-01"
}
```

**Response (200 OK):**
```json
{
    "success": true,
    "message": "Hợp đồng được cập nhật thành công",
    "data": {
        "id": 1,
        "employeeId": 1,
        "contractNumber": "CT-2024-001",
        "contractType": "Permanent",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "workingHours": 8,
        "contractStatus": "Active",
        "signedDate": "2024-01-01",
        "updatedAt": "2024-01-01T00:00:00Z"
    }
}
```

### 5. Terminate Contract
**Endpoint:** `PUT /contracts/:id/terminate`

**Permissions Required:** `CONTRACT_UPDATE`

**Path Parameters:**
- `id` (required) - Contract ID

**Request Body:**
```json
{
    "terminationDate": "2024-06-30"
}
```

**Response (200 OK):**
```json
{
    "success": true,
    "message": "Hợp đồng được kết thúc thành công",
    "data": {
        "id": 1,
        "contractStatus": "Terminated",
        "endDate": "2024-06-30",
        "updatedAt": "2024-06-30T00:00:00Z"
    }
}
```

### 6. Get Contracts for Specific Employee
**Endpoint:** `GET /contracts/employee/:employeeId`

**Permissions Required:** `CONTRACT_READ`

**Path Parameters:**
- `employeeId` (required) - Employee ID

**Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "employeeId": 1,
            "contractNumber": "CT-2024-001",
            "contractType": "Permanent",
            "startDate": "2024-01-01",
            "endDate": "2024-12-31",
            "contractStatus": "Active"
        }
    ]
}
```

### 7. Search Contracts
**Endpoint:** `GET /contracts/search`

**Permissions Required:** `CONTRACT_READ`

**Query Parameters:**
- `keyword` (required) - Search keyword (contract number or employee name)

**Example Request:**
```
GET /contracts/search?keyword=CT-2024-001
```

**Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "contractNumber": "CT-2024-001",
            "contractType": "Permanent",
            "startDate": "2024-01-01",
            "contractStatus": "Active",
            "employee": {
                "id": 1,
                "fullName": "John Doe"
            }
        }
    ]
}
```

### 8. Get Contracts by Status
**Endpoint:** `GET /contracts/status/:status`

**Permissions Required:** `CONTRACT_READ`

**Path Parameters:**
- `status` (required) - Contract status (e.g., Active, Terminated)

**Example Request:**
```
GET /contracts/status/Active
```

**Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "contractNumber": "CT-2024-001",
            "contractStatus": "Active",
            "employee": {
                "id": 1,
                "fullName": "John Doe"
            }
        }
    ]
}
```

### 9. Get Expired Contracts
**Endpoint:** `GET /contracts/expired`

**Permissions Required:** `CONTRACT_READ`

**Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "contractNumber": "CT-2024-001",
            "endDate": "2024-12-31",
            "contractStatus": "Active",
            "employee": {
                "id": 1,
                "fullName": "John Doe"
            }
        }
    ]
}
```

### 10. Export Contracts to Excel
**Endpoint:** `GET /contracts/export`

**Permissions Required:** `CONTRACT_EXPORT`

**Query Parameters:**
- `page` (optional) - Page number
- `limit` (optional) - Items per page
- `search` (optional) - Search keyword
- `contractStatus` (optional) - Filter by status
- `contractType` (optional) - Filter by type

**Response:** Excel file (.xlsx) with formatted contract data

**Example Request:**
```
GET /contracts/export?contractStatus=Active&contractType=Permanent
```

### 11. Delete Contract
**Endpoint:** `DELETE /contracts/:id`

**Permissions Required:** `CONTRACT_DELETE`

**Path Parameters:**
- `id` (required) - Contract ID

**Response (200 OK):**
```json
{
    "success": true,
    "message": "Hợp đồng được xóa thành công"
}
```

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
    "success": false,
    "message": "Validation error",
    "errorCode": "ERR_002",
    "errors": [
        {
            "field": "employeeId",
            "message": "employeeId must be a number"
        }
    ]
}
```

**401 Unauthorized:**
```json
{
    "success": false,
    "message": "Unauthorized",
    "errorCode": "AUTH_004"
}
```

**403 Forbidden:**
```json
{
    "success": false,
    "message": "Forbidden",
    "errorCode": "AUTH_005"
}
```

**404 Not Found:**
```json
{
    "success": false,
    "message": "Hợp đồng không tìm thấy",
    "errorCode": "CONTRACT_001"
}
```

**409 Conflict:**
```json
{
    "success": false,
    "message": "Hợp đồng đã tồn tại",
    "errorCode": "CONTRACT_002"
}
```

## Frontend Integration Examples

### Using Axios/Fetch

**Create Contract:**
```javascript
const createContract = async (contractData) => {
    const response = await fetch('/api/v1/contracts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(contractData)
    });
    return response.json();
};
```

**Get Contracts with Pagination:**
```javascript
const getContracts = async (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams({
        page,
        limit,
        ...filters
    });
    
    const response = await fetch(`/api/v1/contracts?${params}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};
```

**Update Contract:**
```javascript
const updateContract = async (contractId, updateData) => {
    const response = await fetch(`/api/v1/contracts/${contractId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
    });
    return response.json();
};
```

**Terminate Contract:**
```javascript
const terminateContract = async (contractId, terminationDate) => {
    const response = await fetch(`/api/v1/contracts/${contractId}/terminate`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ terminationDate })
    });
    return response.json();
};
```

**Export Contracts:**
```javascript
const exportContracts = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`/api/v1/contracts/export?${params}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contracts.xlsx';
    a.click();
};
```

## Database Schema

### Contracts Table
```sql
CREATE TABLE contracts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    contract_number VARCHAR(255) UNIQUE,
    contract_type VARCHAR(100),
    start_date DATE,
    end_date DATE,
    working_hours DECIMAL(5,2),
    contract_status VARCHAR(50),
    signed_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
```

## Permission Setup

Required permissions to add to your role configuration:
- `CONTRACT_CREATE` - Create contracts
- `CONTRACT_READ` - View contracts
- `CONTRACT_UPDATE` - Update contracts
- `CONTRACT_DELETE` - Delete contracts
- `CONTRACT_EXPORT` - Export contracts to Excel

## Status Codes

| Code | Status | Meaning |
|------|--------|---------|
| 201 | Created | Resource created successfully |
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource conflict (duplicate, etc.) |
| 500 | Server Error | Internal server error |

## Notes

1. All dates should be in `YYYY-MM-DD` format
2. Contract numbers are auto-generated if not provided
3. The system supports soft deletion (isDeleted flag)
4. Pagination uses 1-based indexing (page 1 is the first page)
5. Search is case-insensitive
6. All responses include a `success` boolean indicating operation outcome
7. Timestamps are in ISO 8601 format with timezone
