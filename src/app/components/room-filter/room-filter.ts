import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterCriteria {
  searchTerm: string;
  roomType: string;
  priceRange: string;
  availabilityOnly: boolean;
}

@Component({
  selector: 'app-room-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './room-filter.html',
  styleUrl: './room-filter.css'
})
export class RoomFilter {
  @Output() filtersChanged = new EventEmitter<FilterCriteria>();

  filters: FilterCriteria = {
    searchTerm: '',
    roomType: '',
    priceRange: '',
    availabilityOnly: false
  };

  onFilterChange(): void {
    this.filtersChanged.emit({ ...this.filters });
  }

  clearFilters(): void {
    this.filters = {
      searchTerm: '',
      roomType: '',
      priceRange: '',
      availabilityOnly: false
    };
    this.onFilterChange();
  }

  hasActiveFilters(): boolean {
    return !!(
      this.filters.searchTerm ||
      this.filters.roomType ||
      this.filters.priceRange ||
      this.filters.availabilityOnly
    );
  }
}
