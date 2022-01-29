import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Card {
  cardNumber: string
  owner: string,
  documentId: string
  phone: string,
  status: string,
  type: string
}

interface Transaction {
  responseCode: string,
  message : string,
  transactionStatus : string,
  referenceNumber : string,
  transactionDate: Date,
  total: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  card : Card = {
    cardNumber: '',
    owner: '',
    documentId: '',
    phone: '',
    status: '',
    type: ''
  };
  transactions: Transaction[] = [];
  searchText: string = "";

  constructor(private http: HttpClient) { }

  searchCard() {
    this.http.get<Card>("http://127.0.01:8080/card/"+this.searchText)
      .subscribe(res => { 
        console.log(res) 
        this.card = res;
      }, err => console.log(err)
      );
    this.searchTransactions();  
  }

  searchTransactions() {
    this.http.get<Transaction[]>("http://127.0.01:8080/transaction/"+this.searchText)
      .subscribe(res => { 
        console.log(res) 
        this.transactions = res;
      }, err => console.log(err)
      );
  }

  ngOnInit(): void {
    console.log("App start!");
    
  }
}
