import { Team } from './team'

export enum WorkStatus{
    active,
    fired
}

export class User {
    constructor( 
        public id: number,
        public login: string,
        public password: string,
        public name: string,
        public surname: string,
        public birthday: Date,
        public workEmail: string,
        public email: string,
        public phone: string,
        public skype: string,
        public balance: number,
        public startDate: Date,
        public workStatus: WorkStatus,
        public team: Team["teamName"],
        public avatar?: string,
        public fireDate? : Date) { }
}