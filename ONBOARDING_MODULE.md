# Onboarding Management Module Documentation

## Overview

The Onboarding Management subsystem is a comprehensive solution for managing the entire new employee onboarding process. It enables organizations to create structured onboarding plans, assign tasks to departments, track progress in real-time, manage documents, collect feedback, and finalize onboarding with proper approval workflows.

## Key Features

### 1. Onboarding Plans & Checklists
- Create reusable onboarding plan templates
- Define detailed tasks with categories, priorities, and estimated duration
- Support for department-specific and position-specific plans
- Clone existing plans for quick setup
- Track plan statistics and usage

### 2. Task Assignment & Tracking
- Assign tasks to departments and individual employees
- Set priorities (LOW, NORMAL, HIGH, URGENT) and due dates
- Track task status (PENDING, IN_PROGRESS, COMPLETED, OVERDUE, CANCELLED)
- Monitor overdue tasks with automated alerts
- Reassign tasks to different team members

### 3. Employee Management
- Track new employee onboarding progress per employee
- Assign HR mentors for guidance and support
- View progress percentage and completion timeline
- Monitor progress by department

### 4. Dashboard & Analytics
- Real-time onboarding statistics
- Progress tracking with visual metrics
- Completion rate analytics
- Department-level onboarding insights
- Task completion trends

### 5. Notifications
- Automated notifications for task assignments
- Progress milestone alerts (25%, 50%, 75%, 100%)
- Overdue task notifications
- Completion approval workflows
- Feedback request notifications

## Database Schema

### Entities

#### OnboardingPlan
```javascript
{
  id: number,
  planName: string,
  description: string,
  durationDays: number,
  departmentId: number | null,
  positionId: number | null,
  status: string, // ACTIVE, INACTIVE
  createdBy: number,
  isTemplate: boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date | null,
  tasks: OnboardingTask[]
}
```

#### OnboardingTask
```javascript
{
  id: number,
  planId: number,
  taskTitle: string,
  description: string,
  taskOrder: number,
  isMandatory: boolean,
  estimatedDays: number | null,
  status: string, // NOT_STARTED, IN_PROGRESS, COMPLETED, ON_HOLD, CANCELLED
  category: string | null,
  createdAt: Date,
  updatedAt: Date
}
```

#### OnboardingProgress
```javascript
{
  id: number,
  employeeId: number,
  planId: number,
  overallStatus: string, // IN_PROGRESS, COMPLETED, ON_HOLD, CANCELLED
  startDate: Date,
  expectedEndDate: Date,
  actualEndDate: Date | null,
  progressPercentage: decimal,
  completedTasksCount: number,
  totalTasksCount: number,
  assignedMentorId: number | null,
  createdAt: Date,
  updatedAt: Date
}
```

#### TaskAssignment
```javascript
{
  id: number,
  progressId: number,
  taskId: number,
  assignedToEmployeeId: number | null,
  assignedByUserId: number,
  status: string, // PENDING, IN_PROGRESS, COMPLETED, OVERDUE, CANCELLED
  assignedDate: Date,
  dueDate: Date | null,
  completionDate: Date | null,
  notes: string | null,
  priority: string, // LOW, NORMAL, HIGH, URGENT
  createdAt: Date,
  updatedAt: Date
}
```

#### OnboardingDocument
```javascript
{
  id: number,
  progressId: number,
  assignmentId: number | null,
  documentName: string,
  documentPath: string,
  documentType: string | null,
  fileSize: number | null,
  uploadDate: Date,
  status: string, // ACTIVE
  createdAt: Date,
  updatedAt: Date
}
```

#### OnboardingFeedback
```javascript
{
  id: number,
  progressId: number,
  feedbackFromId: number,
  feedback: string,
  feedbackDate: Date,
  category: string | null,
  rating: number | null, // 1-5
  createdAt: Date,
  updatedAt: Date
}
```

#### OnboardingCompletion
```javascript
{
  id: number,
  progressId: number,
  employeeId: number,
  completionDate: Date,
  finalComments: string | null,
  hrManagerId: number | null,
  isApproved: boolean,
  approvedDate: Date | null,
  overallRating: decimal | null,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Base URL: `/api/v1/onboarding`

### Authentication
All endpoints require authentication via Bearer token in Authorization header.

### Onboarding Plans

#### List Plans
```
GET /plans?skip=0&take=10
Response: { plans: [...], total: number }
```

#### Get Plan by ID
```
GET /plans/:id
Response: OnboardingPlan
```

#### Create Plan
```
POST /plans (HR_MANAGER only)
Body: {
  planName: string,
  description?: string,
  durationDays?: number,
  departmentId?: number,
  positionId?: number,
  isTemplate?: boolean
}
Response: OnboardingPlan
```

#### Update Plan
```
PUT /plans/:id (HR_MANAGER only)
Body: Partial<OnboardingPlan>
Response: OnboardingPlan
```

#### Delete Plan
```
DELETE /plans/:id (HR_MANAGER only)
Response: { success: true }
```

#### Get Plans by Department
```
GET /plans/department/:departmentId
Response: OnboardingPlan[]
```

#### Get Plan Templates
```
GET /plans-templates/list
Response: OnboardingPlan[]
```

#### Duplicate Plan
```
POST /plans/:id/duplicate (HR_MANAGER only)
Body: { newPlanName?: string }
Response: OnboardingPlan
```

#### Get Plan Statistics
```
GET /plans/:id/stats
Response: {
  planId: number,
  planName: string,
  totalTasksPerPlan: number,
  activeOnboardings: number,
  completedOnboardings: number,
  onHoldOnboardings: number
}
```

### Onboarding Progress

#### List Progress Records
```
GET /progress?skip=0&take=10
Response: { progress: [...], total: number }
```

#### Get Progress by ID
```
GET /progress/:id
Response: OnboardingProgress
```

#### Get Employee Progress
```
GET /progress/employee/:employeeId
Response: OnboardingProgress
```

#### Start Onboarding
```
POST /progress/start (HR_MANAGER only)
Body: {
  employeeId: number,
  planId: number,
  assignedMentorId?: number
}
Response: OnboardingProgress
```

#### Update Progress
```
PUT /progress/:id
Body: Partial<OnboardingProgress>
Response: OnboardingProgress
```

#### Complete Onboarding
```
PUT /progress/:id/complete (HR_MANAGER only)
Response: OnboardingProgress
```

#### Pause Onboarding
```
PUT /progress/:id/pause (HR_MANAGER only)
Response: OnboardingProgress
```

#### Resume Onboarding
```
PUT /progress/:id/resume (HR_MANAGER only)
Response: OnboardingProgress
```

#### Get Progress by Department
```
GET /progress/department/:departmentId
Response: OnboardingProgress[]
```

#### Get Progress Statistics
```
GET /progress/stats/all
Response: {
  totalOnboardings: number,
  inProgress: number,
  completed: number,
  onHold: number,
  averageCompletionRate: number
}
```

### Task Assignments

#### List Assignments
```
GET /assignments?skip=0&take=10
Response: TaskAssignment[]
```

#### Get Assignment by ID
```
GET /assignments/:id
Response: TaskAssignment
```

#### Create Assignment
```
POST /assignments (HR_MANAGER, DEPARTMENT_MANAGER only)
Body: {
  progressId: number,
  taskId: number,
  assignedToEmployeeId?: number,
  dueDate?: string,
  notes?: string,
  priority?: string
}
Response: TaskAssignment
```

#### Update Assignment
```
PUT /assignments/:id (HR_MANAGER, DEPARTMENT_MANAGER only)
Body: Partial<TaskAssignment>
Response: TaskAssignment
```

#### Complete Assignment
```
PUT /assignments/:id/complete
Body: { notes?: string }
Response: TaskAssignment
```

#### Start Assignment
```
PUT /assignments/:id/start
Response: TaskAssignment
```

#### Reassign Assignment
```
PUT /assignments/:id/reassign (HR_MANAGER, DEPARTMENT_MANAGER only)
Body: { newEmployeeId: number }
Response: TaskAssignment
```

#### Get Assignments by Progress
```
GET /assignments/progress/:progressId
Response: TaskAssignment[]
```

#### Get Assignments by Employee
```
GET /assignments/employee/:employeeId
Response: TaskAssignment[]
```

#### Get Assignments by Status
```
GET /assignments/status/:status
Response: TaskAssignment[]
```

#### Get Overdue Assignments
```
GET /assignments/overdue
Response: TaskAssignment[]
```

#### Get Assignment Statistics
```
GET /assignments/stats/all
Response: {
  pending: number,
  inProgress: number,
  completed: number,
  overdue: number
}
```

### Documents

#### List Documents
```
GET /documents?skip=0&take=10
Response: OnboardingDocument[]
```

#### Get Document by ID
```
GET /documents/:id
Response: OnboardingDocument
```

#### Upload Document
```
POST /documents
Body: {
  progressId: number,
  assignmentId?: number,
  documentName: string,
  documentPath: string,
  documentType?: string,
  fileSize?: number
}
Response: OnboardingDocument
```

#### Get Documents by Progress
```
GET /documents/progress/:progressId
Response: OnboardingDocument[]
```

#### Get Documents by Assignment
```
GET /documents/assignment/:assignmentId
Response: OnboardingDocument[]
```

#### Get Document Statistics
```
GET /documents/progress/:progressId/stats
Response: {
  totalDocuments: number,
  totalSize: number,
  averageSize: number,
  documentTypes: string[]
}
```

### Feedback

#### List Feedback
```
GET /feedback?skip=0&take=10
Response: OnboardingFeedback[]
```

#### Get Feedback by Progress
```
GET /feedback/progress/:progressId
Response: OnboardingFeedback[]
```

#### Create Feedback
```
POST /feedback
Body: {
  progressId: number,
  feedback: string,
  category?: string,
  rating?: number (1-5)
}
Response: OnboardingFeedback
```

#### Get Feedback Statistics
```
GET /feedback/progress/:progressId/stats
Response: {
  totalFeedback: number,
  averageRating: number,
  ratedFeedback: number,
  categories: object
}
```

### Completion

#### List Completions
```
GET /completion?skip=0&take=10
Response: OnboardingCompletion[]
```

#### Create Completion
```
POST /completion (HR_MANAGER only)
Body: {
  progressId: number,
  employeeId: number,
  finalComments?: string,
  overallRating?: number
}
Response: OnboardingCompletion
```

#### Approve Completion
```
PUT /completion/:id/approve (HR_MANAGER only)
Response: OnboardingCompletion
```

#### Reject Completion
```
PUT /completion/:id/reject (HR_MANAGER only)
Body: { comments?: string }
Response: OnboardingCompletion
```

#### Get Completion Statistics
```
GET /completion/stats/all
Response: {
  totalCompletions: number,
  approvedCompletions: number,
  pendingApproval: number,
  approvalRate: number
}
```

### Notifications

#### Get User Notifications
```
GET /notifications/user?isRead=false&skip=0&take=20
Response: NotificationRecipient[]
```

#### Get Unread Count
```
GET /notifications/unread-count
Response: { unreadCount: number }
```

#### Mark as Read
```
PUT /notifications/:notificationRecipientId/read
Response: { success: true }
```

#### Mark All as Read
```
PUT /notifications/read-all
Response: { success: true }
```

## User Roles & Permissions

### HR Manager
- Create and manage onboarding plans
- Start onboarding for new employees
- Assign tasks to departments and employees
- Complete and approve onboarding
- View all statistics and reports
- Assign mentors
- Upload and manage documents
- Approve onboarding completions

### Department Manager
- View assigned tasks
- Complete assigned tasks
- Assign tasks within their department
- Upload documents
- Provide feedback on onboarding
- View department-level progress

### HR Mentor
- Guide new employees through onboarding
- Complete assigned tasks
- Provide feedback
- View assigned employee progress

### New Employee
- View their own onboarding checklist
- Complete assigned tasks
- Upload required documents
- Submit feedback if requested

## Events & Notifications

The system automatically triggers notifications for:

1. **Onboarding Started** - When a new employee's onboarding begins
2. **Task Assigned** - When a task is assigned to an employee
3. **Task Completed** - When a task is marked as complete
4. **Task Overdue** - When a task deadline is missed
5. **Milestone Reached** - At 25%, 50%, 75% completion
6. **Onboarding Completed** - When all tasks are done
7. **Feedback Requested** - When feedback is needed
8. **Completion Pending** - When awaiting approval
9. **Completion Approved** - When onboarding is officially approved
10. **Completion Rejected** - When onboarding is returned for revision
11. **Document Uploaded** - When new documents are added
12. **Mentor Assigned** - When an HR mentor is assigned

## Best Practices

1. **Plan Setup**: Create reusable templates for similar roles and departments
2. **Task Assignment**: Assign tasks with realistic due dates and clear priorities
3. **Regular Updates**: Update task status regularly to maintain accurate progress tracking
4. **Documentation**: Upload all required documents during the process
5. **Feedback**: Collect feedback from multiple stakeholders for comprehensive assessment
6. **Milestone Monitoring**: Monitor milestone achievements to identify bottlenecks
7. **Approval Workflow**: Complete formal approval process before marking onboarding as done

## Integration Points

The module integrates with:
- **Employee Management**: Links to employee records and departments
- **User Management**: Uses user roles and permissions
- **Notification System**: Sends automated notifications
- **Document Storage**: Manages onboarding documents

## Performance Considerations

- Indexes on frequently queried fields (employeeId, progressId, status)
- Pagination for list endpoints (default: 10 items per page)
- Caching recommendations for plan templates
- Scheduled tasks for overdue detection and notifications

## Error Handling

All endpoints return standardized error responses:
```javascript
{
  success: false,
  message: "Error description",
  timestamp: "2024-02-10T12:00:00Z"
}
```

Common error codes:
- 400: Bad Request (validation errors)
- 401: Unauthorized (missing/invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found (resource doesn't exist)
- 409: Conflict (duplicate entry, invalid state transition)
- 500: Internal Server Error
