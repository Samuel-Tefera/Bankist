'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
} );

///////////////////////////////////////
// Button scroll

const btnScrollTo = document.querySelector( '.btn--scroll-to' );
const section1 = document.querySelector( '#section--1' );

btnScrollTo.addEventListener( 'click', function ( e ) {
  section1.scrollIntoView( { behavior: "smooth" } );
} );

///////////////////////////////////////
// Page navigation

document.querySelector( '.nav__links' ).addEventListener(
  'click', function ( e ) {
    e.preventDefault();
    if ( e.target.classList.contains( 'nav__link' )
      && !e.target.classList.contains( 'btn--show-modal' ) ) {
        const sectionId = e.target.getAttribute( 'href' );
        document.querySelector( sectionId ).scrollIntoView( { behavior: 'smooth' } );
      };
} );

///////////////////////////////////////
// Tabbed component
const tabs = document.querySelectorAll( '.operations__tab' );
const tabsContainer = document.querySelector( '.operations__tab-container' );
const tabsContent = document.querySelectorAll( '.operations__content' );

tabsContainer.addEventListener( 'click', function ( e ) {
  const clicked = e.target.closest( '.operations__tab' );
  
  // Guard clause
  if ( !clicked ) return;

  // Active tab
  tabs.forEach( tab => tab.classList.remove( 'operations__tab--active' ) );
  clicked.classList.add( 'operations__tab--active' )

  // Remove active content
  tabsContent.forEach( cont =>
    cont.classList.remove( 'operations__content--active' ) )
  
  // Active content area
  document.querySelector( `.operations__content--${ clicked.dataset.tab }` )
    .classList.add( 'operations__content--active' );
} );

// Menu fade animation
const handleHover = function ( e, opacity ) {
  if ( e.target.classList.contains( 'nav__link' ) ) {
    const link = e.target;
    const sibling = link.closest( 'nav' )
      .querySelectorAll( '.nav__link' );
    const logo = link.closest( 'nav' )
      .querySelector( 'img' );
    
    sibling.forEach( el => {
      if ( el !== link ) el.style.opacity = opacity;
    } )
    logo.style.opacity = opacity;
  }
}

const nav = document.querySelector( '.nav' );

nav.addEventListener( 'mouseover', function ( e ) {
  handleHover( e, 0.5 );
} )

nav.addEventListener( 'mouseout', function ( e ) {
  handleHover( e, 1 );
} )

// Sticky naviagtion: Intersection Observer API
const stickyNav = function ( entries ) {
  const [ entry ] = entries;
  if ( !entry.isIntersecting ) {
    nav.classList.add( 'sticky' )
  }
  else {
    nav.classList.remove('sticky')
  }
}

const navHeight = nav.getBoundingClientRect().height;

const header = document.querySelector( '.header' );
const headerObserver = new IntersectionObserver( stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
} );

headerObserver.observe( header );