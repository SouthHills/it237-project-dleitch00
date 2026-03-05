import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spinner } from './spinner';
import { vi } from 'vitest';


describe('Spinner', () => {
  let component: Spinner;
  let fixture: ComponentFixture<Spinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spinner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Spinner);
    component = fixture.componentInstance;
  });

  it('should init when done loading (isLoading = true)', () => {
    expect(component.isLoading()).toBeTruthy();
  });

  it('should init when done loading (isLoading = false)', () => {
    vi.useFakeTimers();
    component.ngOnInit();
    vi.advanceTimersByTime(500);
    expect(component.isLoading()).toBe(false);
  });
});
