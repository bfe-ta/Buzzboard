import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service'; 
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing'; 
import { provideHttpClient } from '@angular/common/http'; 

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService, 
        provideHttpClient(), 
        provideHttpClientTesting(), 
      ],
    });
    service = TestBed.inject(AuthService); 
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify(); // Ensure that there are no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });

  it('should return a token when login is successful', () => {
    const mockResponse = { token: 'jwt-token' };

    service.login({ email: 'test@example.com', password: 'password' }).subscribe((res) => {
      expect(res.token).toEqual('jwt-token');
    });

    const req = httpController.expectOne('http://localhost:8080/api/auth/signin');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simulate server response
  });

  it('should store token', () => {
    const token = 'mock-token'; // Sample token
    service.storeToken(token); // Store token using AuthService

    // Check that the token is stored in localStorage
    expect(localStorage.getItem('token')).toBe(token);
  });

  it('should get the stored token', () => {
    const token = 'mock-token'; // Sample token
    localStorage.setItem('token', token); // Set token in localStorage

    // Ensure AuthService retrieves the token correctly
    expect(service.getToken()).toBe(token);
  });

  it('should remove the token', () => {
    const token = 'mock-token'; // Sample token
    localStorage.setItem('token', token); // Set token in localStorage

    service.logout(); 

    expect(localStorage.getItem('token')).toBeNull();
  });
});
