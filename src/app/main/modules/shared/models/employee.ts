import { Team } from './team'

export class Employee {
    constructor( 
        public firstName: string,
        public surname: string,
        public birthdate: Date,
        public jobTitle: string,
        public workEmail: string,
        public email: string,
        public phone: string,
        public skype: string,
        public workStartDate: Date,
        public isActive: boolean,
        public deleted: boolean,
        public balance: number,
        public teamId: string,
        public workEndDate?: Date,
        public id?: string,
        public avatar?: string,
        public teams?: Team[]
        ) { }
}