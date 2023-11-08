import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    // Configure the testing module to create the HomeComponent
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    });

    // Create a fixture for the HomeComponent
    fixture = TestBed.createComponent(HomeComponent);

    // Get the component instance
    component = fixture.componentInstance;

    // Detect changes in the fixture
    fixture.detectChanges();
  });

  // Simple test to check if the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
