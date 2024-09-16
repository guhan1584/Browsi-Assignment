import { Component, OnInit } from '@angular/core';
import { PublisherCardComponent } from './publisher-card/publisher-card.component';
import { CommonModule } from '@angular/common';
import { Domain, Publisher } from '../../types';
import { HttpService } from '../../http.service';
import { FormsModule } from '@angular/forms';
import { DomainCardComponent } from './domain-card/domain-card.component';

@Component({
  selector: 'app-publishers-container',
  standalone: true,
  imports: [
    PublisherCardComponent,
    CommonModule,
    FormsModule,
    DomainCardComponent,
  ],
  templateUrl: './publishers-container.component.html',
  styleUrl: './publishers-container.component.css',
})
export class PublishersContainerComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  publishers: Array<Publisher> = [];
  publisherName: string = '';
  publisherDomains: { [publisherName: string]: Domain[] } = {};

  ngOnInit(): void {
    this.httpService.getPublishers().subscribe({
      next: (data) => {
        this.publishers = data;
        this.publishers.forEach((pub) => {
          this.httpService.getDomains(pub.publisher).subscribe({
            next: (domains) => {
              this.publisherDomains[pub.publisher] = domains;
              console.log('success init');
              console.log(this.publisherDomains);
            },
            error: (error) => console.log(error),
          });
        });
      },
      error: (error) => {
        console.log('We ancunter an error fetching publishers' + error);
      },
    });
  }

  // ngOnDestroy - If we have time

  addPublisher() {
    // this.httpService.postPublishers(this.publisherName).subscribe({
    //   next: () => console.log(`new publisher: ${this.publisherName}`),
    // });
    if (this.publisherName.trim()) {
      this.httpService.postPublishers(this.publisherName).subscribe({
        next: (newPublisher) => {
          this.publishers.push(newPublisher);
          console.log('Success adding');
        },
        error: (error) => {
          console.error('Error adding publisher:', error);
        },
      });
    }
  }
}
