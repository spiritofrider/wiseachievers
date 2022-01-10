import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor() { 
    document.addEventListener("DOMContentLoaded", function(){
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          document.getElementById('navbar_top').classList.add('nav-sticky');
          // add padding top to show content behind navbar
          //navbar_height = document.querySelector('.navbar').offsetHeight;
          //document.body.style.paddingTop = navbar_height + 'px';
        } else {
          document.getElementById('navbar_top').classList.remove('nav-sticky');
           // remove padding top from body
          //document.body.style.paddingTop = '0';
        } 
      })
    })
  }

  ngOnInit(): void {
  }

}
