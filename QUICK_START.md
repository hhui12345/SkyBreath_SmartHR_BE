# Employment Contract Backend - Quick Start Guide

## What Was Built

A complete backend system for managing employment contracts with:
- ✅ Create contracts
- ✅ List contracts with pagination, filtering, and sorting
- ✅ View contract details
- ✅ Update contract information
- ✅ Terminate contracts
- ✅ Search contracts
- ✅ Export contracts to Excel
- ✅ Role-based access control

## Files Overview

### Core Implementation
```
src/
├── models/dto/contracts/          # Request/Response validation
│   ├── create-contract.dto.js     # Create contract schema
│   ├── update-contract.dto.js     # Update contract schema
│   ├── contract-query.dto.js      # Pagination & filtering
│   └── index.js
├── repositories/
│   ├── contracts.repository.js    # Database operations
│   └── employees.repository.js    # Updated with findById
├── services/
│   └── contracts.service.js       # Business logic
├── controllers/
│   └── contracts.controller.js    # Request handlers
└── routes/
    └── contracts.routes.js        # API endpoints

Updated Files:
├── server.js                       # Added contract routes
├── common/constants/
│   └── app-messages.constant.js   # Added contract messages
└── repositories/
    └── employees.repository.js    # Added findById method
```

### Documentation
```
Root Directory:
├── API_INTEGRATION_GUIDE.md       # Complete API documentation
├── API_EXAMPLES.md                # Request/response examples
├── BACKEND_IMPLEMENTATION_SUMMARY.md  # Implementation details
└── QUICK_START.md                 # This file
```

## Database Schema

The `contracts` table is already defined in your ContractEntity:

```sql
contracts (
    id INT PRIMARY KEY,
    employee_id INT FOREIGN KEY,
    contract_number VARCHAR(255) UNIQUE,
    contract_type VARCHAR(100),
    start_date DATE,
    end_date DATE,
    working_hours DECIMAL(5,2),
    contract_status VARCHAR(50),
    signed_date DATE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    is_deleted BOOLEAN
)
```

## Getting Started

### Step 1: Start the Backend Server
```bash
npm run start:dev
```

### Step 2: Verify API is Running
```bash
curl http://localhost:3000/api/v1/health
```

Expected response:
```json
{"status": "ok", "timestamp": "2024-01-15T..."}
```

### Step 3: Test Contract Creation

Get your authentication token first, then:

```bash
curl -X POST http://localhost:3000/api/v1/contracts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "employeeId": 1,
    "contractType": "Permanent",
    "startDate": "2024-01-15",
    "contractStatus": "Active"
  }'
```

## Available Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| POST | /contracts | Create contract |
| GET | /contracts | List contracts |
| GET | /contracts/:id | Get details |
| PUT | /contracts/:id | Update contract |
| PUT | /contracts/:id/terminate | Terminate contract |
| DELETE | /contracts/:id | Delete contract |
| GET | /contracts/employee/:id | Get employee contracts |
| GET | /contracts/search | Search contracts |
| GET | /contracts/status/:status | Filter by status |
| GET | /contracts/expired | Get expired contracts |
| GET | /contracts/export | Export to Excel |

## Permission Setup

Add these permissions to your role system:

1. **CONTRACT_CREATE** - Can create contracts
2. **CONTRACT_READ** - Can view contracts
3. **CONTRACT_UPDATE** - Can update/terminate contracts
4. **CONTRACT_DELETE** - Can delete contracts
5. **CONTRACT_EXPORT** - Can export contracts

Assign permissions to your roles (e.g., HR Manager, HR Admin).

## Common Use Cases

### 1. Display Contract List with Pagination
```javascript
const response = await fetch(
  '/api/v1/contracts?page=1&limit=10&sortBy=startDate&sortOrder=DESC',
  { headers: { 'Authorization': `Bearer ${token}` } }
);
const { data, total, pages } = await response.json();
```

### 2. Create New Contract
```javascript
await fetch('/api/v1/contracts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    employeeId: 1,
    contractType: 'Permanent',
    startDate: '2024-01-15',
    contractStatus: 'Active'
  })
});
```

### 3. Search Contracts
```javascript
const response = await fetch(
  '/api/v1/contracts/search?keyword=John',
  { headers: { 'Authorization': `Bearer ${token}` } }
);
```

### 4. Export to Excel
```javascript
const response = await fetch(
  '/api/v1/contracts/export?contractStatus=Active',
  { headers: { 'Authorization': `Bearer ${token}` } }
);
const blob = await response.blob();
// Download file...
```

### 5. Update Contract
```javascript
await fetch('/api/v1/contracts/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    contractStatus: 'Active',
    workingHours: 8
  })
});
```

### 6. Terminate Contract
```javascript
await fetch('/api/v1/contracts/1/terminate', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    terminationDate: '2024-06-30'
  })
});
```

## Frontend Integration

### With React Query (Recommended)
```javascript
import { useQuery, useMutation } from '@tanstack/react-query';

// Get contracts
const { data, isLoading } = useQuery({
  queryKey: ['contracts'],
  queryFn: async () => {
    const res = await fetch('/api/v1/contracts', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  }
});

// Create contract
const mutation = useMutation({
  mutationFn: async (newContract) => {
    const res = await fetch('/api/v1/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newContract)
    });
    return res.json();
  }
});
```

### With Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Get contracts
api.get('/contracts')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

// Create contract
api.post('/contracts', contractData)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

## Error Handling

All errors follow this format:
```json
{
    "success": false,
    "message": "Error description",
    "errorCode": "ERROR_CODE"
}
```

Common error codes:
- `AUTH_004` - Unauthorized (missing/invalid token)
- `AUTH_005` - Forbidden (insufficient permissions)
- `ERR_002` - Bad Request (validation error)
- `CONTRACT_001` - Contract not found
- `CONTRACT_002` - Contract already exists
- `EMP_001` - Employee not found

## Response Format

All successful responses:
```json
{
    "success": true,
    "message": "Operation message",
    "data": { /* response data */ }
}
```

For list endpoints:
```json
{
    "success": true,
    "data": [ /* array of items */ ],
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
}
```

## Testing Checklist

- [ ] Create contract with all fields
- [ ] Create contract with minimal fields
- [ ] List contracts with pagination
- [ ] Filter contracts by status
- [ ] Filter contracts by type
- [ ] Search contracts by keyword
- [ ] Get contract details
- [ ] Update contract
- [ ] Terminate contract
- [ ] Delete contract
- [ ] Export contracts to Excel
- [ ] Get employee's contracts
- [ ] Verify permissions are enforced
- [ ] Test error handling

## Troubleshooting

### "Contract not found" Error
- Verify the contract ID exists
- Check if the contract is deleted (soft delete)

### "Employee not found" Error
- Verify employee ID exists
- Check employee hasn't been deleted

### "Insufficient permissions" Error
- Verify user has required permission
- Check permission is assigned to user's role

### "End date must be after start date" Error
- Verify start date is before end date
- Use YYYY-MM-DD format

### Token Expired Error
- Refresh authentication token
- Re-login to get new token

## Performance Tips

1. **Use pagination** when fetching large lists
2. **Filter before fetching** instead of client-side filtering
3. **Use search** instead of retrieving all contracts
4. **Cache results** using React Query or SWR
5. **Lazy load** related data (employee details, etc.)

## Next Steps

1. **Setup permissions** for your user roles
2. **Test all endpoints** with your frontend
3. **Implement UI** for contract management
4. **Add error handling** in frontend
5. **Setup logging** and monitoring
6. **Create user documentation**

## Documentation Files

- `API_INTEGRATION_GUIDE.md` - Complete endpoint documentation
- `API_EXAMPLES.md` - Real request/response examples
- `BACKEND_IMPLEMENTATION_SUMMARY.md` - Implementation details
- `QUICK_START.md` - This file

## Support

For issues or questions:
1. Check the API documentation
2. Review error messages and error codes
3. Test endpoints with provided examples
4. Check database schema and relations
5. Verify permissions are properly assigned

## Key Features Summary

✅ **CRUD Operations** - Create, read, update, delete contracts
✅ **Pagination** - Handle large datasets efficiently
✅ **Search & Filter** - Find contracts by various criteria
✅ **Advanced Queries** - Status-based, expiry, employee contracts
✅ **Export** - Generate Excel reports
✅ **Validation** - Comprehensive input validation
✅ **Security** - Authentication & permission-based access
✅ **Error Handling** - Clear, actionable error messages
✅ **Soft Delete** - Data preservation
✅ **Relations** - Loads related employee/department data

## Architecture

```
Frontend
   ↓
API Routes (/contracts)
   ↓
Controller (Request handling)
   ↓
Service (Business logic)
   ↓
Repository (Database operations)
   ↓
Database (MySQL/TypeORM)
```

All layers have proper error handling, validation, and logging.
