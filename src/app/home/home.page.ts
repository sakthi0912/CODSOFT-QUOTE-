import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../services/quote.service';
import { Storage } from '@ionic/storage-angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  quote: string = '';
  author: string = '';
  favorites: string[] = [];

  constructor(private quoteService: QuoteService, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadQuote();
  }

  loadQuote() {
    this.quoteService.getQuote().subscribe(
      (data: any) => {
        console.log("Quote data",data);
        this.quote = data.content || data.text;
        this.author = data.author;
      },
      (error) => {
        console.error('Error fetching quote:', error);
      }
    );
  }

  async saveFavorite() {
    this.favorites = (await this.storage.get('favorites')) || [];
    this.favorites.push(`${this.quote} - ${this.author}`);
    await this.storage.set('favorites', this.favorites);
    alert('Quote saved to favorites!');
  }

  async shareQuote() {
    try {
      await Share.share({
        title: 'Inspiring Quote',
        text: `${this.quote} - ${this.author}`,
        dialogTitle: 'Share via',
      });
    } catch (error) {
      console.error('Error sharing quote:', error);
    }
  }
}
