import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  // Tableau pour stocker les réservations en mémoire
  private reservations: Reservation[] = [];

  // Constructeur du service, chargé d'initialiser les données à partir du localStorage
  constructor(){
    // Récupération des réservations stockées dans localStorage (si elles existent)
    const savedReservations = localStorage.getItem('reservations');
    // Si des réservations sont trouvées, on les parse en JSON et on les stocke dans le tableau `reservations`
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }

  // Méthode pour récupérer toutes les réservations
  getReservations(): Reservation[] {
    return this.reservations;
  }

  // Méthode pour récupérer une réservation spécifique par son ID
  getReservation(id: string): Reservation | undefined {
    // Utilisation de la méthode `find` pour retourner la réservation correspondant à l'ID donné
    return this.reservations.find(res => res.id == id);
  }

  // Méthode pour ajouter une nouvelle réservation
  addReservation(reservation: Reservation): void {

    reservation.id = Date.now().toString()
    // Ajout de la nouvelle réservation au tableau `reservations`
    this.reservations.push(reservation);
    console.log(this.reservations); // Affiche les réservations dans la console pour vérification
    // Sauvegarde du tableau mis à jour dans le localStorage
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  // Méthode pour supprimer une réservation en fonction de son ID
  deleteReservation(id: string): void {
    // Recherche de l'index de la réservation à supprimer
    let index = this.reservations.findIndex(res => res.id === id);
    // Suppression de la réservation si elle est trouvée
    this.reservations.splice(index, 1);
    // Mise à jour du localStorage avec le tableau de réservations après suppression
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  // Méthode pour mettre à jour une réservation existante
  updateReservation(id: string, updatedReservation: Reservation): void {
    // Recherche de l'index de la réservation à mettre à jour
    let index = this.reservations.findIndex(res => res.id === updatedReservation.id);
    // Remplacement de l'ancienne réservation par la version mise à jour
    this.reservations[index] = updatedReservation;
    // Mise à jour du localStorage avec les réservations modifiées
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }
}
