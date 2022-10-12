import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationsFacadeService {

  constructor() { }

  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Successfull',
      text: message,
    });
  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Opss...',
      text: message,
    });
  }
}
