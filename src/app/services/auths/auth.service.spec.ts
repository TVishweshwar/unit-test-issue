import { TestBed } from '@angular/core/testing';

import { AuthService, User } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let user: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Router], // Provide Router
    });
    service = TestBed.inject(AuthService);
    //when auth app running declare user with {name:'xyz', role:'xyz'} here for positive cases
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get user', () => {
    service.setUser(user);
    expect(service.getUser()).toEqual(user);
  });

  it('should set and get isLoggedIn', () => {
    service.setisLoggedIn(true);
    expect(service.getisLoggedIn()).toBeTrue();
  });

  it('should login user', () => {
    if (user) {
      spyOn(service['router'], 'navigate');
      service.login(user);
      expect(localStorage.getItem('user')).toEqual(JSON.stringify(user));
      expect(service.getisLoggedIn()).toBeTrue();
      expect(service.getUser()).toEqual(user);
      expect(service['router'].navigate).toHaveBeenCalledWith(['/home']);
    } else {
      expect(localStorage.getItem('user')).toEqual(null);
      expect(service.getisLoggedIn()).toBeFalse();
      expect(service.getUser()).toEqual(undefined);
    }
  });

  it('should logout user', () => {
    if (user) {
      spyOn(service['router'], 'navigate');
      localStorage.setItem('user', JSON.stringify(user));
      service.logout();
      expect(localStorage.getItem('user')).toBe(JSON.stringify(user));
      expect(service.getisLoggedIn()).toBeFalse();
      expect(service.getUser()).toBeUndefined();
      expect(service['router'].navigate).toHaveBeenCalledWith(['/login']);
    } else {
      expect(localStorage.getItem('user')).toBe(null);
      expect(service.getisLoggedIn()).toBeFalse();
      expect(service.getUser()).toEqual(undefined);
    }
  });

  it('should initialize isLoggedIn and user if session exists in localStorage', () => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      service = new AuthService(TestBed.inject(Router));
      expect(service.getisLoggedIn()).toBeFalse();
      expect(service.getUser()).toEqual(user);
    } else {
      service = new AuthService(TestBed.inject(Router));
      expect(service.getisLoggedIn()).toBeFalse();
      expect(service.getUser()).toEqual(undefined);
    }
  });
});
