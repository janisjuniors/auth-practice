import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const userDataResolver: ResolveFn<unknown> = () => {
  return inject(AuthService).getUserData();
};
