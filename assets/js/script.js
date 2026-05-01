// NAVBAR
(function($) {
	
	"use strict";
	

	function handlePreloader() {
		if($('.preloader').length){
			$('body').addClass('page-loaded');
			$('.preloader').delay(1000).fadeOut(300);
		}
	}
	
	
//Update Header Style and Scroll to Top
	function headerStyle() {
		// if($('.main-header').length){
		// 	var windowpos = $(window).scrollTop();
		// 	var headerUpper = $('.header-upper');
		// 	var headerTop = $('.header-top');
		// 	var scrollLink = $('.scroll-to-top');
			
		// 	// Cek jika scroll lebih dari 100px
		// 	if (windowpos > 136) {
		// 		// Menambahkan kelas sticky pada header-upper
		// 		headerUpper.addClass('sticky');
		// 		// Menyembunyikan header-top
		// 		headerTop.fadeOut(300);
		// 		// Menampilkan scroll-to-top
		// 		scrollLink.fadeIn(1000);
		// 	} else {
		// 		// Menghapus kelas sticky pada header-upper
		// 		headerUpper.removeClass('sticky');
		// 		// Menampilkan kembali header-top
		// 		headerTop.fadeIn(300);
		// 		// Menyembunyikan scroll-to-top
		// 		scrollLink.fadeOut(300);
		// 	}
		// }
		if($('.main-header').length){
			var scrollY = $(window).scrollTop();
			var header = $('.main-header');
			var headerTop = $('.header-top'); // Marquee lo

			if (scrollY <= 400) {
				// STATE: ATAS (Sticky/Absolute)
				header.removeClass('header-fixed').addClass('header-absolute');
				header.css({
					"transform": "translateY(0)",
					"opacity": "1"
				});
				// Marquee tetap tampil di atas
				// headerTop.show(); 
				
			} else if (scrollY > 400 && scrollY <= 550) {
				// STATE: SEMBUNYI (Transisi kabur ke atas)
				header.css({
					"transform": "translateY(-100px)",
					"opacity": "0"
				});
				
			} else {
				// STATE: BAWAH (Fixed Glassy)
				header.addClass('header-fixed').removeClass('header-absolute');
				header.css({
					"transform": "translateY(0)",
					"opacity": "1"
				});
				// Marquee diumpetin pas lagi melayang biar ringkas
				// headerTop.hide();
			}
		}
	}
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
	
	headerStyle();

	$(window).on('scroll', function() {
		headerStyle();
	});

	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>');
		
	}

	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);
		
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});
		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
	}

	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
	
		});
	}
	
	// Loading masuk page akan di gantikan dengan fungsi berikut
	
	$(window).on('load', function() {
		handlePreloader();
	});	

})(window.jQuery);
// AKHIR  NAVBAR




// BIDANG PERJALANAN
document.addEventListener("DOMContentLoaded", function () {
	let currentIndex = 0;
	const slides = document.querySelectorAll(".bidang-slide");
	const dots = document.querySelectorAll(".dot");
	const prevBtn = document.getElementById("prev");
	const nextBtn = document.getElementById("next");

	function showSlide(index) {
		slides.forEach((slide, i) => {
			if (i === index) {
				slide.style.opacity = "0";
				slide.style.transform = "translateY(20px)"; // Efek geser ke bawah
				setTimeout(() => {
					slides.forEach((s) => s.classList.remove("active")); // Hapus active di semua
					slide.classList.add("active");
					slide.style.opacity = "1";
					slide.style.transform = "translateY(0)";
				}, 200); // Delay agar tidak langsung muncul
			} else {
				slide.style.opacity = "0";
				slide.style.transform = "translateY(-20px)"; // Efek geser ke atas saat pindah
			}
		});

		dots.forEach((dot, i) => {
			dot.classList.toggle("active", i === index);
		});
	}

	prevBtn.addEventListener("click", function () {
		if (currentIndex > 0) {
			currentIndex--;
			showSlide(currentIndex);
		}
	});

	nextBtn.addEventListener("click", function () {
		if (currentIndex < slides.length - 1) {
			currentIndex++;
			showSlide(currentIndex);
		}
	});

	dots.forEach((dot, i) => {
		dot.addEventListener("click", function () {
			currentIndex = i;
			showSlide(currentIndex);
		});
	});

	// Tampilkan slide pertama saat halaman dimuat
	showSlide(currentIndex);
});

// LIVE KABINET 2
document.addEventListener("DOMContentLoaded", function () {
  const wrappers = document.querySelectorAll(".live-wrapper");

  wrappers.forEach(wrapper => {
    // ambil isi awal
    const content = wrapper.innerHTML;

    // duplicate sekali (cukup untuk seamless loop)
    wrapper.innerHTML += content;
  });
});


// AKHIR LIVE KABINET 2