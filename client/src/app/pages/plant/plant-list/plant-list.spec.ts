import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../../app.routes';

import { PlantList } from './plant-list';

describe('PlantList', () => {
  let component: PlantList;
  let fixture: ComponentFixture<PlantList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantList, RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
