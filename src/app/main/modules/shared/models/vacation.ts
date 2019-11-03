import { Employee } from './employee';

export enum VacationType {
    Recreation,
    University,
    Family,
    Sick
}

export enum VacationStatus {
    Pending,
    Approved,
    Refused
}

// export interface Vacation {
//     userId: number;
//     type: VacationType;
//     startDate: Date;
//     endDate: Date;
//     comment: string;
//     status: VacationStatus;
// }

export class Vacation {
    constructor(
        public userId: Employee["id"],
        public startDate: Date,
        public endDate: Date,
        public amount: number,
        public comment: string,
        public status: VacationStatus) { }
}
