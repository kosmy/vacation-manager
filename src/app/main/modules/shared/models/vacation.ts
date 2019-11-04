import { Employee } from './employee';
import { Team } from './team';

export enum VacationStatus {
    Pending,
    Approved,
    Refused
}

export class Vacation {
    constructor(
        public startDate: Date,
        public endDate: Date,
        public comment: string,
        public status: VacationStatus,
        public createDateTime: Date,
        public deleted: boolean,
        public employee: Employee,
        public statusChangeDate?: Date,
        public id?: string,
        public employeeId?: Employee["id"],
        public approverComment?: string,
        public approverId?: string,
        public teams?: Team[],
        public approver?: Employee,
        ) { }
}
