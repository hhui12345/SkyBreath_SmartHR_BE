import { JobGradesService } from '../services/job-grades.service.js';
import { ResponseUtil } from '../common/utils/response.util.js';
import { AppMessages } from '../common/constants/index.js';

export class JobGradesController {
    constructor() {
        this.jobGradesService = new JobGradesService();
    }

    async create(req, res, next) {
        try {
            const jobGrade = await this.jobGradesService.create(req.body);
            return ResponseUtil.created(res, jobGrade, AppMessages.Success.CREATED);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req, res, next) {
        try {
            const result = await this.jobGradesService.findAll(req.query);
            return ResponseUtil.ok(res, result, AppMessages.Success.RETRIEVED);
        } catch (error) {
            next(error);
        }
    }

    async findById(req, res, next) {
        try {
            const jobGrade = await this.jobGradesService.findById(req.params.id);
            return ResponseUtil.ok(res, jobGrade, AppMessages.Success.RETRIEVED);
        } catch (error) {
            next(error);
        }
    }

    async findByDepartment(req, res, next) {
        try {
            const jobGrades = await this.jobGradesService.findByDepartment(req.params.departmentId);
            return ResponseUtil.ok(res, jobGrades, AppMessages.Success.RETRIEVED);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const jobGrade = await this.jobGradesService.update(req.params.id, req.body);
            return ResponseUtil.ok(res, jobGrade, AppMessages.Success.UPDATED);
        } catch (error) {
            next(error);
        }
    }

    async remove(req, res, next) {
        try {
            await this.jobGradesService.remove(req.params.id);
            return ResponseUtil.ok(res, null, AppMessages.Success.DELETED);
        } catch (error) {
            next(error);
        }
    }

    async exportExcel(req, res, next) {
        try {
            const file = await this.jobGradesService.exportExcel();
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=job-grades.xlsx');
            return res.send(file);
        } catch (error) {
            next(error);
        }
    }

    async findList(req, res, next) {
        try {
            const jobGrades = await this.jobGradesService.findList();
            return ResponseUtil.ok(res, jobGrades, AppMessages.Success.RETRIEVED);
        } catch (error) {
            next(error);
        }
    }
}
