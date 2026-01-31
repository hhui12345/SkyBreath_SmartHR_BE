# API Endpoints Reference

## Base URL
```
http://localhost:3000/api/v1
```

## Quick Access Reference

### 1️⃣ Create Employment Contract
```
POST /contracts
Authorization: Bearer {token}
Content-Type: application/json
Permission: CONTRACT_CREATE

Body:
{
  "employeeId": 1,
  "contractNumber": "CT-2024-001",
  "contractType": "Permanent",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "workingHours": 8,
  "contractStatus": "Active",
  "signedDate": "2024-01-10"
}

Response: 201 Created
{
  "success": true,
  "message": "Hợp đồng được tạo thành công",
  "data": { /* contract object */ }
}
```

---

### 2️⃣ List All Contracts (with Pagination)
```
GET /contracts
Authorization: Bearer {token}
Permission: CONTRACT_READ

Query Parameters:
  ?page=1                    # Page number (default: 1)
  &limit=10                  # Items per page (default: 10)
  &search=CT-2024            # Search contract number
  &contractStatus=Active     # Filter by status
  &contractType=Permanent    # Filter by type
  &sortBy=startDate          # Sort field
  &sortOrder=DESC            # ASC or DESC

Example:
GET /contracts?page=1&limit=10&contractStatus=Active&sortBy=startDate&sortOrder=DESC

Response: 200 OK
{
  "success": true,
  "data": [ /* array of contracts */ ],
  "total": 50,
  "page": 1,
  "limit": 10,
  "pages": 5
}
```

---

### 3️⃣ Get Contract Details
```
GET /contracts/{id}
Authorization: Bearer {token}
Permission: CONTRACT_READ

Path Parameters:
  {id} = Contract ID (integer)

Example:
GET /contracts/1

Response: 200 OK
{
  "success": true,
  "data": {
    "id": 1,
    "contractNumber": "CT-2024-001",
    "contractType": "Permanent",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "workingHours": 8,
    "contractStatus": "Active",
    "employee": {
      "id": 1,
      "fullName": "Nguyễn Văn A",
      "department": { "id": 1, "departmentName": "HR" },
      "position": { "id": 1, "positionName": "Manager" }
    }
  }
}
```

---

### 4️⃣ Update Employment Contract
```
PUT /contracts/{id}
Authorization: Bearer {token}
Content-Type: application/json
Permission: CONTRACT_UPDATE

Path Parameters:
  {id} = Contract ID

Body (all fields optional):
{
  "contractType": "Permanent",
  "endDate": "2024-12-31",
  "workingHours": 8,
  "contractStatus": "Active",
  "signedDate": "2024-01-01"
}

Example:
PUT /contracts/1

Response: 200 OK
{
  "success": true,
  "message": "Hợp đồng được cập nhật thành công",
  "data": { /* updated contract */ }
}
```

---

### 5️⃣ Terminate Contract
```
PUT /contracts/{id}/terminate
Authorization: Bearer {token}
Content-Type: application/json
Permission: CONTRACT_UPDATE

Path Parameters:
  {id} = Contract ID

Body:
{
  "terminationDate": "2024-06-30"
}

Example:
PUT /contracts/1/terminate

Response: 200 OK
{
  "success": true,
  "message": "Hợp đồng được kết thúc thành công",
  "data": { /* contract with status: Terminated */ }
}
```

---

### 6️⃣ Get Employee Contracts
```
GET /contracts/employee/{employeeId}
Authorization: Bearer {token}
Permission: CONTRACT_READ

Path Parameters:
  {employeeId} = Employee ID

Example:
GET /contracts/employee/1

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "contractNumber": "CT-2024-001",
      "contractType": "Permanent",
      "startDate": "2024-01-01",
      "contractStatus": "Active"
    }
  ]
}
```

---

### 7️⃣ Search Contracts
```
GET /contracts/search
Authorization: Bearer {token}
Permission: CONTRACT_READ

Query Parameters:
  ?keyword={keyword}  # Required: contract number or employee name

Examples:
GET /contracts/search?keyword=CT-2024-001
GET /contracts/search?keyword=Nguyễn Văn A

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "contractNumber": "CT-2024-001",
      "employee": { "fullName": "Nguyễn Văn A" }
    }
  ]
}
```

---

### 8️⃣ Get Contracts by Status
```
GET /contracts/status/{status}
Authorization: Bearer {token}
Permission: CONTRACT_READ

Path Parameters:
  {status} = Contract status (Active, Terminated, etc.)

Examples:
GET /contracts/status/Active
GET /contracts/status/Terminated

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "contractNumber": "CT-2024-001",
      "contractStatus": "Active",
      "employee": { "fullName": "Nguyễn Văn A" }
    }
  ]
}
```

---

### 9️⃣ Get Expired Contracts
```
GET /contracts/expired
Authorization: Bearer {token}
Permission: CONTRACT_READ

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 3,
      "contractNumber": "CT-2023-100",
      "endDate": "2023-12-31",
      "contractStatus": "Active",
      "employee": { "fullName": "Lê Văn C" }
    }
  ]
}
```

---

### 🔟 Export Contracts to Excel
```
GET /contracts/export
Authorization: Bearer {token}
Permission: CONTRACT_EXPORT

Query Parameters:
  ?page=1                    # Optional
  &limit=100                 # Optional
  &search={keyword}          # Optional
  &contractStatus={status}   # Optional
  &contractType={type}       # Optional

Example:
GET /contracts/export?contractStatus=Active&limit=100

Response: 200 OK
Binary file (.xlsx) - Downloaded as contracts.xlsx

File Contents:
- STT (Serial)
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
```

---

### 1️⃣1️⃣ Delete Contract (Admin)
```
DELETE /contracts/{id}
Authorization: Bearer {token}
Permission: CONTRACT_DELETE

Path Parameters:
  {id} = Contract ID

Example:
DELETE /contracts/1

Response: 200 OK
{
  "success": true,
  "message": "Hợp đồng được xóa thành công"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "End date must be after start date",
  "errorCode": "ERR_002"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized",
  "errorCode": "AUTH_004"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Forbidden",
  "errorCode": "AUTH_005"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Hợp đồng không tìm thấy",
  "errorCode": "CONTRACT_001"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Hợp đồng đã tồn tại",
  "errorCode": "CONTRACT_002"
}
```

---

## cURL Examples

### Create
```bash
curl -X POST http://localhost:3000/api/v1/contracts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"employeeId":1,"contractType":"Permanent","startDate":"2024-01-15","contractStatus":"Active"}'
```

### List
```bash
curl -X GET "http://localhost:3000/api/v1/contracts?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Details
```bash
curl -X GET http://localhost:3000/api/v1/contracts/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update
```bash
curl -X PUT http://localhost:3000/api/v1/contracts/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"contractStatus":"Active"}'
```

### Terminate
```bash
curl -X PUT http://localhost:3000/api/v1/contracts/1/terminate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"terminationDate":"2024-06-30"}'
```

### Search
```bash
curl -X GET "http://localhost:3000/api/v1/contracts/search?keyword=CT-2024" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Export
```bash
curl -X GET "http://localhost:3000/api/v1/contracts/export?contractStatus=Active" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o contracts.xlsx
```

### Delete
```bash
curl -X DELETE http://localhost:3000/api/v1/contracts/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## JavaScript Fetch Examples

### Create Contract
```javascript
const createContract = async (contractData, token) => {
  return fetch('http://localhost:3000/api/v1/contracts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(contractData)
  }).then(res => res.json());
};
```

### Get Contracts
```javascript
const getContracts = async (page = 1, limit = 10, token) => {
  return fetch(`http://localhost:3000/api/v1/contracts?page=${page}&limit=${limit}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(res => res.json());
};
```

### Update Contract
```javascript
const updateContract = async (contractId, updateData, token) => {
  return fetch(`http://localhost:3000/api/v1/contracts/${contractId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updateData)
  }).then(res => res.json());
};
```

### Terminate Contract
```javascript
const terminateContract = async (contractId, terminationDate, token) => {
  return fetch(`http://localhost:3000/api/v1/contracts/${contractId}/terminate`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ terminationDate })
  }).then(res => res.json());
};
```

### Export Contracts
```javascript
const exportContracts = async (filters = {}, token) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`http://localhost:3000/api/v1/contracts/export?${params}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'contracts.xlsx';
  link.click();
};
```

---

## Summary Table

| Method | Endpoint | Purpose | Permission | Auth |
|--------|----------|---------|-----------|------|
| POST | /contracts | Create | CONTRACT_CREATE | ✓ |
| GET | /contracts | List | CONTRACT_READ | ✓ |
| GET | /contracts/:id | Details | CONTRACT_READ | ✓ |
| PUT | /contracts/:id | Update | CONTRACT_UPDATE | ✓ |
| PUT | /contracts/:id/terminate | Terminate | CONTRACT_UPDATE | ✓ |
| DELETE | /contracts/:id | Delete | CONTRACT_DELETE | ✓ |
| GET | /contracts/employee/:id | Emp Contracts | CONTRACT_READ | ✓ |
| GET | /contracts/search | Search | CONTRACT_READ | ✓ |
| GET | /contracts/status/:status | By Status | CONTRACT_READ | ✓ |
| GET | /contracts/expired | Expired | CONTRACT_READ | ✓ |
| GET | /contracts/export | Export | CONTRACT_EXPORT | ✓ |

---

## Quick Test URL Patterns

```
Local Development:
http://localhost:3000/api/v1/contracts

Swagger Documentation:
http://localhost:3000/api/docs

Health Check:
http://localhost:3000/api/v1/health
```

---

**Last Updated:** 2024-01-15
**Status:** ✅ READY FOR INTEGRATION
