import { Component, OnInit } from '@angular/core';
import { Agency } from '../../models/agency';
import { AgencyService } from '../../services/agency.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  agencies: Agency[] = [];

  constructor(private agencyService: AgencyService) {}

  ngOnInit(): void {
    this.agencyService.getAllAgencies().then(agencies => {
      this.agencies = agencies;
    });
  }
}