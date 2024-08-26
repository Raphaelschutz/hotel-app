import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  // FormGroup pour gérer le formulaire de réservation
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder, // Service pour construire des formulaires réactifs
    private reservationService: ReservationService, // Service de gestion des réservations
    private router: Router, // Service pour la navigation
    private activatedRoute: ActivatedRoute // Service pour accéder aux informations de la route actuelle
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec des contrôles et des validateurs
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    // Récupère l'ID de la réservation depuis l'URL s'il est présent
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('HELLO!' + id);


    if (id) {
      // Si un ID est présent, recherche la réservation correspondante
      let reservation = this.reservationService.getReservation(id); // Correction : utiliser `getReservation` au lieu de `addReservation`

      if (reservation)
        // Si la réservation existe, on met à jour le formulaire avec ses données
        this.reservationForm.patchValue(reservation);

    }
  }

  onSubmit(): void {
    // Vérifie si le formulaire est valide avant de procéder
    if (this.reservationForm.valid) {
      // Crée une nouvelle réservation à partir des données du formulaire
      let reservation: Reservation = this.reservationForm.value;


      let id = this.activatedRoute.snapshot.paramMap.get('id');


      if (id) {
     // update
     reservation.id = id;
     this.reservationService.updateReservation( id, reservation)


      }else{
// new
// Ajoute la réservation à la liste via le service
        this.reservationService.addReservation(reservation)

      }

      // Navigue vers la liste des réservations
      this.router.navigate(['list']);
    }
  }
}
