import { Employee } from './employee';

export class Transaction {
    constructor(
        public employeeId: string,
        public change: number,
        public comment: string,
        public employee: Employee,
        public id?: string,
    ) { }
}