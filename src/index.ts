import { menuPopout } from '$anim/menuPopout';
import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';

import { blog } from './pages/blog';
import { blogTemplate } from './pages/blogTemplate';
import { homepage } from './pages/home.js';
import { squeeze } from './pages/squeeze';
import { thanks } from './pages/thanks';

window.Webflow ||= [];
window.Webflow.push(() => {
  // ------------------
  // Site Globals
  // ------------------

  // Menu Popout
  // -----------
  const menuButtons = querySelectorAlltoArray('.menu_button');
  const pageWrapper = document.querySelector('.main-wrapper');
  const closeButton = document.querySelector('.nav_menu-close');
  let menuOpen = false;
  const menuAnim = menuPopout();

  for (let i = 0; i <= menuButtons.length - 1; i++) {
    menuButtons[i].addEventListener('click', (e) => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        menuAnim.play();
      } else {
        menuAnim.reverse();
      }
    });
  }

  closeButton?.addEventListener('click', (e) => {
    menuOpen = false;
    if (menuOpen === false) {
      menuAnim.reverse();
    }
  });

  pageWrapper?.addEventListener('click', (e) => {
    menuOpen = false;
    if (menuOpen === false) {
      menuAnim.reverse();
    }
  });

  // ------------------
  // Page Modules
  // ------------------
  const windowLocation = window.location.pathname as string;
  // console.log('window', windowLocation);

  if (windowLocation === '/') {
    homepage();
  } else if (windowLocation.includes('/ask')) {
    squeeze();
  } else if (windowLocation.includes('/blog')) {
    const hasFurtherIndex = windowLocation.substring(5);
    if (hasFurtherIndex === '') {
      blog();
    } else {
      blogTemplate();
    }
  } else if (windowLocation === '/thank-you') {
    thanks();
  }
});
