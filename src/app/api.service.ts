import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    public http: HttpClient,
    ) {

  }

  //link API
  apiURL() {
    return "http://localhost/backend";
  }

  getMahasiswa() {
    return this.http.get(this.apiURL() + '/tampil.php');
  }

  deleteMahasiswa(id: any ) {
    return this.http.delete(this.apiURL() + '/hapus.php?nim=' + id);
  }

  ambilMahasiswa(id: any) {
    return this.http.get(this.apiURL() + '/lihat.php?nim=' + id);
  }


  }