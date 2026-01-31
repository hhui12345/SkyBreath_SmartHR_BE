# Employment Contract API - Request/Response Examples

## Setup
```
BASE_URL = http://localhost:3000/api/v1
AUTH_TOKEN = your_jwt_token
```

## 1. Create Employment Contract

### Request
```bash
curl -X POST http://localhost:3000/api/v1/contracts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "employeeId": 1,
    "contractNumber": "CT-2024-001",
    "contractType": "Permanent",
    "startDate": "2024-01-15",
    "endDate": "2024-12-31",
    "workingHours": 8,
    "contractStatus": "Active",
    "signedDate": "2024-01-10"
  }'
```

### Response
```json
{
    "success": true,
    "message": "Hợp đồng được tạo thành công",
    "data": {
        "id": 5,
        "employeeId": 1,
        "contractNumber": "CT-2024-001",
        "contractType": "Permanent",
        "startDate": "2024-01-15",
        "endDate": "2024-12-31",
        "workingHours": "8.00",
        "contractStatus": "Active",
        "signedDate": "2024-01-10",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z",
        "isDeleted": false
    }
}
```

---

## 2. Get All Contracts (List View)

### Request - Basic
```bash
curl -X GET "http://localhost:3000/api/v1/contracts" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Request - With Pagination
```bash
curl -X GET "http://localhost:3000/api/v1/contracts?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Request - With Filtering and Sorting
```bash
curl -X GET "http://localhost:3000/api/v1/contracts?page=1&limit=10&contractStatus=Active&contractType=Permanent&sortBy=startDate&sortOrder=DESC" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response
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
            "workingHours": "8.00",
            "contractStatus": "Active",
            "signedDate": "2024-01-01",
            "employee": {
                "id": 1,
                "fullName": "Nguyễn Văn A",
                "companyEmail": "a.nguyen@company.com",
                "phoneNumber": "0123456789",
                "department": {
                    "id": 1,
                    "departmentName": "Phòng Nhân Sự"
                },
                "position": {
                    "id": 1,
                    "positionName": "Quản Lý HR"
                }
            }
        },
        {
            "id": 2,
            "employeeId": 2,
            "contractNumber": "CT-2024-002",
            "contractType": "Temporary",
            "startDate": "2024-02-01",
            "endDate": "2024-08-01",
            "workingHours": "6.00",
            "contractStatus": "Active",
            "signedDate": "2024-02-01",
            "employee": {
                "id": 2,
                "fullName": "Trần Thị B",
                "companyEmail": "b.tran@company.com",
                "phoneNumber": "0987654321",
                "department": {
                    "id": 2,
                    "departmentName": "Phòng Kinh Doanh"
                },
                "position": {
                    "id": 2,
                    "positionName": "Nhân Viên Bán Hàng"
                }
            }
        }
    ],
    "total": 42,
    "page": 1,
    "limit": 10,
    "pages": 5
}
```

---

## 3. Get Contract Details

### Request
```bash
curl -X GET "http://localhost:3000/api/v1/contracts/1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response
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
        "workingHours": "8.00",
        "contractStatus": "Active",
        "signedDate": "2024-01-01",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z",
        "isDeleted": false,
        "employee": {
            "id": 1,
            "userId": 1,
            "fullName": "Nguyễn Văn A",
            "dateOfBirth": "1990-05-15",
            "gender": "Male",
            "nationalId": "123456789",
            "phoneNumber": "0123456789",
            "companyEmail": "a.nguyen@company.com",
            "personalEmail": "a.nguyen@gmail.com",
            "joinDate": "2024-01-01",
            "employmentStatus": "Active",
            "department": {
                "id": 1,
                "departmentName": "Phòng Nhân Sự",
                "departmentCode": "HR"
            },
            "position": {
                "id": 1,
                "positionName": "Quản Lý HR",
                "positionCode": "MGR_HR"
            },
            "jobGrade": {
                "id": 1,
                "gradeName": "Grade 5"
            }
        }
    }
}
```

---

## 4. Update Employment Contract

### Request
```bash
curl -X PUT "http://localhost:3000/api/v1/contracts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "contractType": "Temporary",
    "endDate": "2024-06-30",
    "workingHours": 6,
    "contractStatus": "Active"
  }'
```

### Response
```json
{
    "success": true,
    "message": "Hợp đồng được cập nhật thành công",
    "data": {
        "id": 1,
        "employeeId": 1,
        "contractNumber": "CT-2024-001",
        "contractType": "Temporary",
        "startDate": "2024-01-01",
        "endDate": "2024-06-30",
        "workingHours": "6.00",
        "contractStatus": "Active",
        "signedDate": "2024-01-01",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-15T11:00:00.000Z",
        "isDeleted": false
    }
}
```

---

## 5. Terminate Employment Contract

### Request
```bash
curl -X PUT "http://localhost:3000/api/v1/contracts/1/terminate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "terminationDate": "2024-06-30"
  }'
```

### Response
```json
{
    "success": true,
    "message": "Hợp đồng được kết thúc thành công",
    "data": {
        "id": 1,
        "employeeId": 1,
        "contractNumber": "CT-2024-001",
        "contractType": "Temporary",
        "startDate": "2024-01-01",
        "endDate": "2024-06-30",
        "workingHours": "6.00",
        "contractStatus": "Terminated",
        "signedDate": "2024-01-01",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-15T12:00:00.000Z",
        "isDeleted": false
    }
}
```

---

## 6. Get Contracts for Specific Employee

### Request
```bash
curl -X GET "http://localhost:3000/api/v1/contracts/employee/1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response
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
            "workingHours": "8.00",
            "contractStatus": "Active",
            "signedDate": "2024-01-01",
            "employee": {
                "id": 1,
                "fullName": "Nguyễn Văn A"
            }
        }
    ]
}
```

---

## 7. Search Contracts

### Request - Search by Contract Number
```bash
curl -X GET "http://localhost:3000/api/v1/contracts/search?keyword=CT-2024-001" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Request - Search by Employee Name
```bash
curl -X GET "http://localhost:3000/api/v1/contracts/search?keyword=Nguyễn Văn A" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response
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
            "workingHours": "8.00",
            "contractStatus": "Active",
            "signedDate": "2024-01-01",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-15T10:30:00.000Z",
            "employee": {
                "id": 1,
                "fullName": "Nguyễn Văn A"
            }
        }
    ]
}
```

---

## 8. Get Contracts by Status

### Request - Active Contracts
```bash
curl -X GET "http://localhost:3000/api/v1/contracts/status/Active" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Request - Terminated Contracts
```bash
curl -X GET "http://localhost:3000/api/v1/contracts/status/Terminated" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "contractNumber": "CT-2024-001",
            "contractType": "Permanent",
            "contractStatus": "Active",
            "startDate": "2024-01-01",
            "endDate": "2024-12-31",
            "employee": {
                "id": 1,
                "fullName": "Nguyễn Văn A"
            }
        },
        {
            "id": 2,
            "contractNumber": "CT-2024-002",
            "contractType": "Temporary",
            "contractStatus": "Active",
            "startDate": "2024-02-01",
            "endDate": "2024-08-01",
            "employee": {
                "id": 2,
                "fullName": "Trần Thị B"
            }
        }
    ]
}
```

---

## 9. Get Expired Contracts

### Request
```bash
curl -X GET "http://localhost:3000/api/v1/contracts/expired" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response
```json
{
    "success": true,
    "data": [
        {
            "id": 3,
            "contractNumber": "CT-2023-100",
            "contractType": "Temporary",
            "startDate": "2023-01-01",
            "endDate": "2023-12-31",
            "contractStatus": "Active",
            "employee": {
                "id": 3,
                "fullName": "Lê Văn C"
            }
        }
    ]
}
```

---

## 10. Export Contracts to Excel

### Request - Export All Active Contracts
```bash
curl -X GET "http://localhost:3000/api/v1/contracts/export?contractStatus=Active" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o contracts.xlsx
```

### Request - Export with Multiple Filters
```bash
curl -X GET "http://localhost:3000/api/v1/contracts/export?contractStatus=Active&contractType=Permanent&page=1&limit=100" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o contracts_filtered.xlsx
```

### Response
Binary file (.xlsx) containing:
- STT (Serial Number)
- Mã hợp đồng (Contract Number)
- Tên nhân viên (Employee Name)
- Phòng ban (Department)
- Vị trí (Position)
- Loại hợp đồng (Contract Type)
- Ngày bắt đầu (Start Date)
- Ngày kết thúc (End Date)
- Giờ làm việc (Working Hours)
- Trạng thái (Status)
- Ngày ký (Signed Date)

---

## 11. Delete Contract

### Request
```bash
curl -X DELETE "http://localhost:3000/api/v1/contracts/1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Response
```json
{
    "success": true,
    "message": "Hợp đồng được xóa thành công"
}
```

---

## Error Examples

### 400 - Bad Request (Invalid Date)
```bash
curl -X POST http://localhost:3000/api/v1/contracts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "employeeId": 1,
    "contractType": "Permanent",
    "startDate": "2024-12-31",
    "endDate": "2024-01-01",
    "contractStatus": "Active"
  }'
```

**Response:**
```json
{
    "success": false,
    "message": "End date must be after start date",
    "errorCode": "ERR_002",
    "errors": []
}
```

### 401 - Unauthorized (Missing Token)
```bash
curl -X GET "http://localhost:3000/api/v1/contracts"
```

**Response:**
```json
{
    "success": false,
    "message": "Unauthorized",
    "errorCode": "AUTH_004"
}
```

### 403 - Forbidden (Insufficient Permission)
```bash
curl -X POST http://localhost:3000/api/v1/contracts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{ "employeeId": 1, ... }'
```

**Response (User without CONTRACT_CREATE permission):**
```json
{
    "success": false,
    "message": "Forbidden",
    "errorCode": "AUTH_005"
}
```

### 404 - Not Found
```bash
curl -X GET "http://localhost:3000/api/v1/contracts/999" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
    "success": false,
    "message": "Hợp đồng không tìm thấy",
    "errorCode": "CONTRACT_001"
}
```

### 409 - Conflict (Duplicate Contract Number)
```bash
curl -X POST http://localhost:3000/api/v1/contracts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "employeeId": 2,
    "contractNumber": "CT-2024-001",
    "contractType": "Permanent",
    "startDate": "2024-02-01",
    "contractStatus": "Active"
  }'
```

**Response (CT-2024-001 already exists):**
```json
{
    "success": false,
    "message": "Hợp đồng đã tồn tại",
    "errorCode": "CONTRACT_002"
}
```

---

## JavaScript/Fetch Examples

### Create Contract
```javascript
async function createContract(contractData) {
    const response = await fetch('/api/v1/contracts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(contractData)
    });
    return response.json();
}

// Usage
createContract({
    employeeId: 1,
    contractType: 'Permanent',
    startDate: '2024-01-15',
    contractStatus: 'Active'
});
```

### Get Contracts with Pagination
```javascript
async function getContracts(page = 1, limit = 10, filters = {}) {
    const params = new URLSearchParams({
        page,
        limit,
        ...filters
    });
    
    const response = await fetch(`/api/v1/contracts?${params}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

// Usage
const result = await getContracts(1, 10, {
    contractStatus: 'Active',
    contractType: 'Permanent'
});
```

### Search Contracts
```javascript
async function searchContracts(keyword) {
    const response = await fetch(`/api/v1/contracts/search?keyword=${keyword}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}
```

### Export Contracts
```javascript
async function exportContracts(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`/api/v1/contracts/export?${params}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contracts.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
```
