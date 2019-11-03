import { Employee } from './employee';

// export class Team {
//     constructor(
//         public teamName: string,
//         public teamLeadName: string,
//     ) { }
// }
export class Team {
    constructor(
        public id: string,
        public name: string,
        public teamLeadId: string,
        public deleted: boolean,
        public employees: Employee[],

    ) { }
}