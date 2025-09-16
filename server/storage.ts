// Storage is not needed for this ticket dashboard application
// All data comes directly from Freshdesk API

export interface IStorage {
  // No storage methods needed for read-only ticket dashboard
}

export class MemStorage implements IStorage {
  constructor() {
    // No storage needed
  }
}

export const storage = new MemStorage();
