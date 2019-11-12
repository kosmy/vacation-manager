import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../modules/shared/models/employee';
import { UserAPIService } from '../../modules/shared/services/user-api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../../modules/add-edit-user/add-edit-user.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Input() currentUser: Employee;
    
    constructor(
        private userAPIService: UserAPIService,
        private router: Router,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
    }

    editProfile(): void {
        const dialogRef = this.dialog.open(AddEditUserComponent, {
            width: 'fit-content',
            data: this.currentUser
        });
    }

    logOut() {
        this.router.navigate(['log-in'])
    }

}
