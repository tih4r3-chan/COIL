import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  private readonly ONBOARDING_KEY = 'hasSeenOnboarding';
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    if (this._storage === null) {
      this._storage = await this.storage.create();
    }
  }

  async setOnboardingComplete() {
    try {
      await this._storage?.set(this.ONBOARDING_KEY, true);
    } catch (error) {
      console.error('Error al guardar el estado del onboarding:', error);
    }
  }

  async hasSeenOnboarding(): Promise<boolean> {
    try {
      const value = await this._storage?.get(this.ONBOARDING_KEY);
      return value === true;
    } catch (error) {
      console.error('Error al obtener el estado del onboarding:', error);
      return false;
    }
  }

  async resetOnboarding() {
    try {
      await this._storage?.remove(this.ONBOARDING_KEY);
      console.log('Estado de onboarding reseteado');
    } catch (error) {
      console.error('Error al resetear el estado del onboarding:', error);
    }
  }
}