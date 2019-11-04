import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable()
export class TransactionApiService {

  constructor(private http: HttpClient) { };

  private transactionApiUrl = 'https://vacations.polytech.rocks:52540/api/Transaction/';

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionApiUrl, transaction);
  }

  getTransaction(id: Transaction['id']): Observable<Transaction> {
    return this.http.get<Transaction>(this.transactionApiUrl + id);
  }

  getTransactionEmployeeById(id: Employee['id']): Observable<Employee> {
    return this.http.get<Employee>(this.transactionApiUrl + 'employee/' + id);
  }
}
