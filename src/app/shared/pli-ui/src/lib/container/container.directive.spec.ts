import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PliContainer } from './container.directive';

@Component({
  template: '<div pli-container>Test content</div>',
  imports: [PliContainer]
})
class TestComponent {}

describe('PliContainer', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(PliContainer));
  });

  it('should create the directive', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should add pli-container class on init', () => {
    fixture.detectChanges();
    const element = directiveElement.nativeElement;
    expect(element.classList.contains('pli-container')).toBeTruthy();
  });
});
