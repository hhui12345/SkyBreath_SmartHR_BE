import { Router } from 'express';
import { JobGradesController } from '../controllers/job-grades.controller.js';
import { AuthMiddleware } from '../common/middleware/auth.middleware.js';
import { ValidationMiddleware } from '../common/middleware/validation.middleware.js';

const router = Router();
const jobGradesController = new JobGradesController();

// Apply authentication middleware to all routes
router.use(AuthMiddleware.verify);

/**
 * @route POST /job-grades
 * @desc Create a new job grade
 * @access Protected
 */
router.post('/', 
    ValidationMiddleware.validate('body'),
    (req, res, next) => jobGradesController.create(req, res, next)
);

/**
 * @route GET /job-grades
 * @desc Get all job grades with pagination
 * @access Protected
 */
router.get('/', 
    (req, res, next) => jobGradesController.findAll(req, res, next)
);

/**
 * @route GET /job-grades/list
 * @desc Get job grades list (simple format without pagination)
 * @access Protected
 */
router.get('/list', 
    (req, res, next) => jobGradesController.findList(req, res, next)
);

/**
 * @route GET /job-grades/department/:departmentId
 * @desc Get job grades by department
 * @access Protected
 */
router.get('/department/:departmentId', 
    (req, res, next) => jobGradesController.findByDepartment(req, res, next)
);

/**
 * @route GET /job-grades/:id
 * @desc Get job grade by ID
 * @access Protected
 */
router.get('/:id', 
    (req, res, next) => jobGradesController.findById(req, res, next)
);

/**
 * @route PUT /job-grades/:id
 * @desc Update job grade
 * @access Protected
 */
router.put('/:id', 
    ValidationMiddleware.validate('body'),
    (req, res, next) => jobGradesController.update(req, res, next)
);

/**
 * @route DELETE /job-grades/:id
 * @desc Delete job grade
 * @access Protected
 */
router.delete('/:id', 
    (req, res, next) => jobGradesController.remove(req, res, next)
);

/**
 * @route GET /job-grades/export/excel
 * @desc Export job grades to Excel
 * @access Protected
 */
router.get('/export/excel', 
    (req, res, next) => jobGradesController.exportExcel(req, res, next)
);

export default router;
