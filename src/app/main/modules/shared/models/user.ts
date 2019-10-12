export enum WorkStatus{
    active,
    fired
}

export class User {
    constructor( 
        public id: number,
        public name: string,
        public surname: string,
        public birthday: Date,
        public workEmail: string,
        public email: string,
        public phone: string,
        public skype: string,
        public vacationsAvailable: number,
        public startDate: Date,
        public workStatus: WorkStatus,
        public team: string,
        public avatar?: string,
        public fireDate? : Date,) { }
}