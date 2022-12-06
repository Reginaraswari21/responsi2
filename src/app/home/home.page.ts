import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
 selector: 'app-home',
 templateUrl: './home.page.html',
 styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    nim: any;
    nama: any;
    alamat: any;
    mahasiswa: any[] | undefined; //init variable nama untuk namauser
    token: any;
 constructor(
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
 private authService: AuthenticationService,
 private router: Router) { 
    this.getMahasiswa();
 }
 ngOnInit() {
    console.log('cek fungsi halaman event init jalan');
    this.loadToken();
 }

 ionViewDidEnter() {
    console.log("jika selesai loading");
    this.getMahasiswa();
  }

  getMahasiswa() {
    this._apiService.getMahasiswa().subscribe((res: any) => {
      console.log("sukses", res);
      this.mahasiswa = res;
    }, (error: any) => {
      console.log("gagal", error);
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal memuat data mahasiswa',
        buttons: ['OK']
      }).then(res => {
        res.present();
      })
    })
  }

  deleteMahasiswa(id: any) {

    this.alertController.create({
      header: 'perhatian',
      subHeader: 'Yakin menghapus data ini?',
      buttons: [
        {
          text: 'Batal',
          handler: (data: any) => {
            console.log('dibatalkan', data);
          }
        },
        {
          text: 'Yakin',
          handler: (data: any) => {
            //jika tekan yakin
            this._apiService.deleteMahasiswa(id).subscribe((res: any) => {
              console.log("sukses", res);
              this.getMahasiswa();
            }, (error: any) => {
              console.log("error", error);
              this.alertController.create({
                header: 'Notifikasi',
                message: 'gagal memuat data mahasiswa',
                buttons: ['OK']
              }).then(res => {
                res.present();
              })
            })
          }
        }
      ]
    }).then(res => {
      res.present();
    })
  }
  
 //ceksesi untuk mengambil nama user
 loadToken() {
 this.token = this.authService.getData('token');
 if (this.token != null) {
 this.nama = this.authService.getData('username');
 } else {
 this.router.navigateByUrl('/login');
 }
 }
 //membuat fungsi logout
 logout() {
 this.authService.logout(); // lempar ke authService lalu cari fungsi logout
 this.router.navigateByUrl('/', { replaceUrl: true }); // alihkan ke halama
 }
}
