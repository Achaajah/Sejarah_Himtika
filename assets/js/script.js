// ================= NAVBAR =================
(function($) {

	"use strict";

	function handlePreloader() {
		if ($('.preloader').length) {
			$('body').addClass('page-loaded');
			$('.preloader').delay(500).fadeOut(300);
		}
	}

	function headerStyle() {
		const header = document.querySelector('.main-header');
		if (!header) return;

		const scrollY = window.scrollY;

		if (scrollY <= 400) {
			header.classList.remove('header-fixed');
			header.classList.add('header-absolute');
			header.style.transform = "translateY(0)";
			header.style.opacity = "1";

		} else if (scrollY <= 550) {
			header.style.transform = "translateY(-100px)";
			header.style.opacity = "0";

		} else {
			header.classList.add('header-fixed');
			header.classList.remove('header-absolute');
			header.style.transform = "translateY(0)";
			header.style.opacity = "1";
		}
	}

	// 🔥 SCROLL OPTIMIZED
	let ticking = false;
	window.addEventListener("scroll", () => {
		if (!ticking) {
			requestAnimationFrame(() => {
				headerStyle();
				ticking = false;
			});
			ticking = true;
		}
	});

	headerStyle();

	// MOBILE MENU
	if ($('.mobile-menu').length) {

		const mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);

		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(300);
		});

		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		$('.mobile-menu .menu-backdrop, .mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
	}

	// SCROLL TO
	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function() {
			const target = $(this).attr('data-target');
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 800);
		});
	}

	$(window).on('load', handlePreloader);

})(window.jQuery);


// ================= GLOBAL DOM READY =================
document.addEventListener("DOMContentLoaded", function () {

	// ================= HERO =================
	const hero = document.querySelector(".hero-section");

	if (hero) {
		const heroObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				hero.classList.toggle("show", entry.isIntersecting);
			});
		}, { threshold: 0.4 });

		heroObserver.observe(hero);
	}


	// ================= TIMELINE =================
	const timelineSection = document.querySelector(".timeline-section");
	const timelineSlides = document.querySelectorAll(".timeline-section .slide");

	if (timelineSection && timelineSlides.length) {

		const timelineObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {

				if (entry.isIntersecting) {
					timelineSlides.forEach((slide, i) => {
						setTimeout(() => {
							slide.classList.add("animate");
						}, i * 150);
					});
				} else {
					timelineSlides.forEach(slide => {
						slide.classList.remove("animate");
					});
				}

			});
		}, { threshold: 0.3 });

		timelineObserver.observe(timelineSection);
	}


	// ================= BIDANG =================
	let currentIndex = 0;
	const bidangSlides = document.querySelectorAll(".bidang-slide");
	const dots = document.querySelectorAll(".dot");
	const prevBtn = document.getElementById("prev");
	const nextBtn = document.getElementById("next");

	if (bidangSlides.length) {

		function showSlide(index) {
			bidangSlides.forEach((slide, i) => {
				slide.classList.remove("active");

				if (i === index) {
					slide.style.opacity = "0";
					slide.style.transform = "translateY(20px)";

					setTimeout(() => {
						slide.classList.add("active");
						slide.style.opacity = "1";
						slide.style.transform = "translateY(0)";
					}, 150);
				} else {
					slide.style.opacity = "0";
					slide.style.transform = "translateY(-20px)";
				}
			});

			dots.forEach((dot, i) => {
				dot.classList.toggle("active", i === index);
			});
		}

		prevBtn?.addEventListener("click", () => {
			if (currentIndex > 0) {
				currentIndex--;
				showSlide(currentIndex);
			}
		});

		nextBtn?.addEventListener("click", () => {
			if (currentIndex < bidangSlides.length - 1) {
				currentIndex++;
				showSlide(currentIndex);
			}
		});

		dots.forEach((dot, i) => {
			dot.addEventListener("click", () => {
				currentIndex = i;
				showSlide(currentIndex);
			});
		});

		showSlide(currentIndex);
	}


	// ================= LIVE KABINET =================
	const wrappers = document.querySelectorAll(".live-wrapper");

	wrappers.forEach(wrapper => {
		if (!wrapper.classList.contains("duplicated")) {
			wrapper.innerHTML += wrapper.innerHTML;
			wrapper.classList.add("duplicated");
		}
	});

	// ================= KABINET =================
	const kabinetSection = document.querySelector(".kabinet-section");
	const kabinetCards = document.querySelectorAll(".kabinet-card");

	if (kabinetSection && kabinetCards.length) {

		let triggered = false;

		const kabinetObserver = new IntersectionObserver((entries) => {

			entries.forEach(entry => {

				if (entry.isIntersecting && !triggered) {
					triggered = true;

					kabinetCards.forEach((card, i) => {
						setTimeout(() => {
							card.classList.add("show");
						}, i * 120);
					});

				} else if (!entry.isIntersecting) {
					triggered = false;

					kabinetCards.forEach(card => {
						card.classList.remove("show");
					});
				}

			});

		}, { threshold: 0.25 });

		kabinetObserver.observe(kabinetSection);
	}

});