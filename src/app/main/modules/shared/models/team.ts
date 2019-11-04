import { Employee } from './employee';

export class Team {
    constructor(
        public name: string,
        public deleted: boolean,
        public teamLeadName: string,
        public employees: Employee[],
        public employeeCount?: number,
        public id?: string,
        public teamLeadId?: string,
    ) { }
}