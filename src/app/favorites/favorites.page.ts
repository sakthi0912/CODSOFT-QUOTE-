import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';



@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements OnInit {


  favorites : string[] =[];
  constructor( private storage : Storage) { }

  async ngOnInit() {

    await this.storage.create();
    this.loadFavorites();
  }
  
  async loadFavorites(){
    this.favorites =( await this.storage.get('favorites'))|| [];
    
  }

  async  removeFavorite(index : number){
    this.favorites.splice(index ,1);
    await this.storage.set('favorites',this.favorites)
  }

}
