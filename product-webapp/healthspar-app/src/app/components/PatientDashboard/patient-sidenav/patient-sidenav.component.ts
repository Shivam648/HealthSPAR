import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-patient-sidenav',
  templateUrl: './patient-sidenav.component.html',
  styleUrls: ['./patient-sidenav.component.css'],
})
export class PatientSidenavComponent implements OnInit {
  @ViewChild('sidebar', { static: false }) sidebar!: ElementRef;

  ngOnInit() {
    this.fullHeight();
  }

  fullHeight() {
    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(() => {
      $('.js-fullheight').css('height', $(window).height());
    });

    // Use the non-null assertion operator (!) to assert that this.sidebar is not null
    $('#sidebarCollapse').on('click', () => {
      $(this.sidebar.nativeElement).toggleClass('active');
    });
  }
}
