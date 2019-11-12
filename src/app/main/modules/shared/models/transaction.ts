import { Employee } from './employee';
import { Vacation } from './vacation';

export class Transaction {
    constructor(
        public employeeId?: string,
        public change?: number,
        public comment?: string,
        public employee?: Employee,
        public vacations?: Vacation[],
        public approvedVacations?: Vacation[],
        public id?: string,
    ) { }
}