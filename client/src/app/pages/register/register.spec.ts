import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Register } from './register';

// Add this import for Vitest
import { vi } from 'vitest';
import {signal} from '@angular/core';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  let employeeService: EmployeeService;
  let router: Router;

  beforeEach(async () => {
    // Use vi.fn() for Vitest mocks
    employeeService = { registerEmployee: vi.fn() } as any;
    router = { navigate: vi.fn() } as any;

    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        { provide: EmployeeService, useValue: employeeService },
        { provide: Router, useValue: router }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call registerEmployee and navigate to /login on successful registration', async () => {
    // Arrange: set up employee data
    const testEmployee = {
      employeeID: 123,
      employeeUsername: 'testuser',
      employeePassword: 'testpass'
    };
    component.employee = { ...testEmployee };

    // Mock registerEmployee to return Observable with subscribe next
    (employeeService.registerEmployee as any).mockReturnValue({
      subscribe: ({ next }: any) => {
        next({}); // Simulate successful response
        return { unsubscribe: () => {} };
      }
    });

    // Act
    component.onRegister();

    // Assert
    expect(employeeService.registerEmployee).toHaveBeenCalledWith(testEmployee);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should display an alert on registration failure', async () =>
  {
    // Arrange: set up employee data
    const testEmployee = {
      employeeID: 123,
      employeeUsername: 'testuser',
      employeePassword: 'testpass'
    };
    component.employee = {...testEmployee};

    // Mock registerEmployee to return Observable with subscribe error
    (employeeService.registerEmployee as any).mockReturnValue({
      subscribe: ({error}: any) =>
      {
        error({message: 'Registration failed'}); // Simulate error response
        return {
          unsubscribe: () =>
          {
          }
        };
      }
    });

    // Spy on alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() =>
    {
    });

    // Act
    component.onRegister();

    // Assert
    expect(employeeService.registerEmployee).toHaveBeenCalledWith(testEmployee);
    expect(alertSpy).toHaveBeenCalledWith('Registration failed. Please try again.');

    // Clean up the spy
    alertSpy.mockRestore();
  });

});
