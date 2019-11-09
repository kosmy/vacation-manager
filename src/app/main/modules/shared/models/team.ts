import { Employee } from './employee';

export class Team {
    constructor(
        public name: string,
        public teamLeadName: string,
        public teamLeadId: string,
        public deleted: boolean,
        public employeeCount: number,
        public employees: Employee[],
        public id?: string,
    ) { }
}