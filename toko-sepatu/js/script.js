/* ============================================================
   STRIDE — Premium Footwear Landing Page
   script.js | Logika Interaktif & Efek jQuery Lengkap
   Praktikum Pemrograman Web Dasar (PPWD) Minggu 10 & 11

   Daftar Efek & Fitur jQuery:
     1. Dropdown Navbar (mouseenter/mouseleave + slideDown/slideUp)
     2. Mobile Menu Drawer (click + slideToggle)
     3. Smooth Image Transition Gallery Switcher (fadeTo + animate)
     4. Tab Panel Switching (click + fadeIn)
     5. Animasi Kartu Produk Lift (mouseenter/mouseleave + animate)
     6. Smooth Scroll Navbar (click + animate scrollTop) ← TANTANGAN 2
     7. Scroll Spy Navbar Highlight (scroll + addClass/removeClass)
     8. Back to Top Button (scroll + fadeIn/fadeOut + animate)
     9. Form Input Hints (focus/blur + slideDown/slideUp)
    10. Toast Notification (fadeIn + delay + fadeOut)
    11. FAQ Accordion (click + slideToggle + slideUp)
    12. Cart Counter Animation (click + animate scale)
    13. Password Strength Meter (input + regex scoring)
    14. Custom Rule hurufAngka (jQuery Validation Method) ← TANTANGAN 1
    15. Custom Rule nomorHp (jQuery Validation Method)
    16. jQuery Validation Form Handler (8 inputs lengkap)
   ============================================================ */

// Hormati preferensi reduced motion user
jQuery.fx.off = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

$(function () {

    /* ===========================================================
       EFEK 1: DROPDOWN NAVBAR
       Event : mouseenter / mouseleave
       Effect: slideDown / slideUp
    =========================================================== */
    $('.nav-dropdown')
        .on('mouseenter', function () {
            $(this).find('.dropdown-menu').stop(true, true).slideDown(220);
        })
        .on('mouseleave', function () {
            $(this).find('.dropdown-menu').stop(true, true).slideUp(200);
        });

    // Navbar Scrolled Glass Shadow
    $(window).on('scroll.navbar', function () {
        if ($(this).scrollTop() > 15) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });


    /* ===========================================================
       EFEK 2: MOBILE MENU DRAWER
       Event : click pada hamburger
       Effect: slideToggle
    =========================================================== */
    $('#hamburgerBtn').on('click', function () {
        $(this).toggleClass('is-active');
        $('#mobileMenu').stop(true, true).slideToggle(280);
    });

    // Tutup mobile menu saat link diklik
    $('.mobile-links a').on('click', function () {
        $('#hamburgerBtn').removeClass('is-active');
        $('#mobileMenu').slideUp(200);
    });


    /* ===========================================================
       EFEK 3: HERO INTERACTIVE IMAGE GALLERY SWITCHER
       Fitur Khusus: Animasi Transisi Halus (Smooth Crossfade & Scale)
       saat berganti ke gambar sepatu lain.
       Event : click pada .thumb-btn
       Effect: fadeTo(0.05) + change src + fadeTo(1.0)
    =========================================================== */
    var $heroImg = $('#heroMainImage');

    $('.thumb-btn').on('click', function () {
        var $btn = $(this);

        // Jika thumbnail yang diklik sudah aktif, tidak perlu ganti ulang
        if ($btn.hasClass('active')) return;

        // Update status thumbnail aktif
        $('.thumb-btn').removeClass('active');
        $btn.addClass('active');

        var newSrc   = $btn.data('src');
        var newName  = $btn.data('name');
        var newPrice = $btn.data('price');
        var newOld   = $btn.data('oldprice');

        // ANIMASI TRANSISI SMOOTH:
        // 1. Gambar lama memudar (fadeTo 0.05) dan mengecil sedikit
        $heroImg.stop(true, true).fadeTo(200, 0.05, function () {
            // 2. Ganti sumber gambar dan teks metadata secara instan di latar belakang
            $heroImg.attr('src', newSrc);
            $('#heroModelName').text(newName);
            $('#heroPriceTag').text(newPrice);
            $('#heroOldPrice').text(newOld);

            // 3. Tampilkan gambar baru secara perlahan (fadeTo 1) dengan mulus
            $heroImg.fadeTo(350, 1.0);
        });
    });


    /* ===========================================================
       EFEK 4: TAB PANEL PRODUK
       Event : click pada .tab-btn & dropdown filter link
       Effect: fadeIn panel tujuan
    =========================================================== */
    // Tampilkan panel pertama saat halaman dimuat
    $('.tab-panel').hide().filter('.aktif').show();

    function aktifkanTab(targetSelector) {
        $('.tab-btn').removeClass('active');
        $('.tab-btn[data-target="' + targetSelector + '"]').addClass('active');

        $('.tab-panel').removeClass('aktif').hide();
        $(targetSelector).addClass('aktif').stop(true, true).fadeIn(350);
    }

    $('.tab-btn').on('click', function () {
        var target = $(this).data('target');
        aktifkanTab(target);
    });

    // Link dropdown di navbar dapat langsung memicu tab tertentu
    $('.dropdown-menu a[data-filter]').on('click', function (e) {
        var filter = $(this).data('filter');
        var targetSelector = '#tab-' + filter;
        aktifkanTab(targetSelector);
    });


    /* ===========================================================
       EFEK 5: ANIMASI KARTU PRODUK (HOVER LIFT)
       Event : mouseenter / mouseleave
       Effect: animate top
    =========================================================== */
    $('.produk-card')
        .css('position', 'relative')
        .on('mouseenter', function () {
            $(this).stop(true).animate({ top: '-6px' }, 220);
        })
        .on('mouseleave', function () {
            $(this).stop(true).animate({ top: '0px' }, 200);
        });

    // Interaksi tombol Swatch warna pada kartu
    $('.swatch').on('click', function (e) {
        e.stopPropagation();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });


    /* ===========================================================
       EFEK 6: CART COUNTER & TOAST NOTIFICATION
       Event : click pada .btn-card
       Effect: fadeIn + delay + fadeOut (toast)
    =========================================================== */
    var totalKeranjang = 0;

    $('.btn-card').on('click', function (e) {
        e.stopPropagation();
        var namaSepatu = $(this).data('name') || $(this).closest('.produk-card').find('.card-nama').text();

        // Tambah jumlah keranjang
        totalKeranjang++;
        $('#cartCount').text(totalKeranjang);

        // Notifikasi Toast
        tampilkanToast('🛒 ' + namaSepatu + ' berhasil ditambahkan ke keranjang!', 'info');
    });

    function tampilkanToast(pesan, tipe) {
        $('#toast')
            .stop(true, true)
            .removeClass('success error info')
            .addClass(tipe)
            .html('<i class="fa-solid fa-circle-check" style="margin-right:8px; color:var(--accent);"></i>' + pesan)
            .fadeIn(280)
            .delay(3000)
            .fadeOut(400);
    }


    /* ===========================================================
       EFEK 7: FAQ ACCORDION (BONUS JQUERY slideToggle)
       Event : click pada .faq-question
       Effect: slideToggle jawaban + slideUp jawaban lain
    =========================================================== */
    $('.faq-question').on('click', function () {
        var $item = $(this).closest('.faq-item');
        var $answer = $item.find('.faq-answer');

        if ($item.hasClass('open')) {
            $item.removeClass('open');
            $answer.slideUp(250);
        } else {
            // Tutup item lain yang sedang terbuka
            $('.faq-item.open').removeClass('open').find('.faq-answer').slideUp(250);

            // Buka item yang diklik
            $item.addClass('open');
            $answer.stop(true, true).slideDown(250);
        }
    });


    /* ===========================================================
       EFEK 8: FORM HINTS FOCUS/BLUR
       Event : focus / blur pada input form
       Effect: slideDown / slideUp
    =========================================================== */
    $('#formOrder input, #formOrder select, #formOrder textarea')
        .on('focus', function () {
            $(this).closest('.form-group').find('.hint-text').stop(true, true).slideDown(200);
        })
        .on('blur', function () {
            $(this).closest('.form-group').find('.hint-text').stop(true, true).slideUp(200);
        });


    /* ===========================================================
       EFEK 9: BACK TO TOP BUTTON
       Event : scroll window
       Effect: fadeIn / fadeOut + animate scrollTop
    =========================================================== */
    var $btnTop = $('#kembaliAtas');

    $(window).on('scroll.top', function () {
        if ($(this).scrollTop() > 320) {
            $btnTop.fadeIn(250);
        } else {
            $btnTop.fadeOut(250);
        }
    });

    $btnTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 650);
    });


    /* ===========================================================
       TANTANGAN 2: SMOOTH SCROLL NAVBAR
       Event : click pada a[href^="#"]
       Effect: animate scrollTop
    =========================================================== */
    $('a[href^="#"]').on('click', function (e) {
        var href = $(this).attr('href');

        // Guard: jika hanya '#' atau link kosong
        if (!href || href.length < 2) return;

        var $tujuan = $(href);

        // Guard: pastikan elemen tujuan ada di halaman
        if ($tujuan.length === 0) return;

        e.preventDefault();

        // Scroll halus ke target dengan offset navbar (72px)
        $('html, body').animate({
            scrollTop: $tujuan.offset().top - 72
        }, 650);

        // Update class nav-active
        $('.nav-links a').removeClass('nav-active');
        $(this).addClass('nav-active');
    });

    // Otomatis sorot menu navbar yang sedang dilihat saat scroll manual
    $(window).on('scroll.navHighlight', function () {
        var scrollPos = $(this).scrollTop() + 95;

        $('section[id], header[id]').each(function () {
            var topPos = $(this).offset().top;
            var sectionId = $(this).attr('id');

            if (scrollPos >= topPos) {
                $('.nav-links a').removeClass('nav-active');
                $('.nav-links a[href="#' + sectionId + '"]').addClass('nav-active');
            }
        });
    });


    /* ===========================================================
       TANTANGAN 1: CUSTOM METHOD VALIDASI "hurufAngka"
       Password wajib mengandung kombinasi huruf (a-z/A-Z) DAN angka (0-9).
       Tidak boleh huruf saja atau angka saja.

       Syntax:
         $.validator.addMethod(namaRule, fungsiCallback, pesanErrorDefault)
    =========================================================== */
    $.validator.addMethod('hurufAngka', function (value, element) {
        return this.optional(element) || (
            /[A-Za-z]/.test(value) && /[0-9]/.test(value)
        );
    }, 'Password wajib memuat kombinasi huruf dan angka!');

    // Custom method nomor HP Indonesia: 10–13 digit angka
    $.validator.addMethod('nomorHp', function (value, element) {
        return this.optional(element) || /^[0-9]{10,13}$/.test(value);
    }, 'Nomor WhatsApp/HP harus berupa 10–13 digit angka.');


    /* ===========================================================
       PASSWORD STRENGTH INDICATOR (REAL-TIME INPUT LISTENER)
    =========================================================== */
    $('#fPassword').on('input', function () {
        var val  = $(this).val();
        var skor = 0;

        if (val.length >= 8)   skor++;
        if (/[a-z]/.test(val)) skor++;
        if (/[A-Z]/.test(val)) skor++;
        if (/[0-9]/.test(val)) skor++;

        var persen = (skor / 4) * 100;
        var warna, label;

        if (val.length === 0) {
            persen = 0;
            warna  = 'transparent';
            label  = '';
        } else if (skor === 1) {
            warna = '#E53935';
            label = '<span style="color:#E53935;"><i class="fa-solid fa-triangle-exclamation"></i> Sangat Lemah (kurang karakter)</span>';
        } else if (skor === 2) {
            warna = '#FB8C00';
            label = '<span style="color:#FB8C00;"><i class="fa-solid fa-circle-exclamation"></i> Sedang (tambahkan variasi)</span>';
        } else if (skor === 3) {
            warna = '#FDD835';
            label = '<span style="color:#F57F17;"><i class="fa-solid fa-check"></i> Cukup Kuat</span>';
        } else {
            warna = '#43A047';
            label = '<span style="color:#2E7D32;"><i class="fa-solid fa-shield-check"></i> Sangat Kuat &amp; Aman</span>';
        }

        $('#strengthBar').css({
            'width': persen + '%',
            'background': warna
        });
        $('#strengthLabel').html(label);
    });


    /* ===========================================================
       JQUERY VALIDATION PLUGIN PADA #formOrder
       8 Input yang divalidasi:
         1. fNama       : Nama Lengkap
         2. fEmail      : Email
         3. fHp         : No. HP / WhatsApp (custom rule: nomorHp)
         4. fAlamat     : Alamat Pengiriman
         5. fUkuran     : Ukuran Sepatu
         6. fPembayaran : Metode Pembayaran
         7. fPassword   : Password (custom rule: hurufAngka)
         8. fKonfirmasi : Konfirmasi Password (equalTo: #fPassword)
    =========================================================== */
    $('#formOrder').validate({
        // Trigger validasi saat ketik dan saat keluar input
        onkeyup: function (element) { $(element).valid(); },
        onfocusout: function (element) { $(element).valid(); },

        rules: {
            fNama: {
                required: true,
                minlength: 3
            },
            fEmail: {
                required: true,
                email: true
            },
            fHp: {
                required: true,
                nomorHp: true
            },
            fAlamat: {
                required: true,
                minlength: 10
            },
            fUkuran: {
                required: true
            },
            fPembayaran: {
                required: true
            },
            fPassword: {
                required: true,
                minlength: 8,
                hurufAngka: true // Menggunakan custom method Tantangan 1
            },
            fKonfirmasi: {
                required: true,
                equalTo: '#fPassword'
            }
        },

        messages: {
            fNama: {
                required: 'Nama lengkap wajib diisi!',
                minlength: 'Nama lengkap minimal 3 karakter.'
            },
            fEmail: {
                required: 'Alamat email wajib diisi!',
                email: 'Format email tidak valid (contoh: nama@email.com)'
            },
            fHp: {
                required: 'Nomor WhatsApp/HP wajib diisi!'
            },
            fAlamat: {
                required: 'Alamat pengiriman lengkap wajib diisi!',
                minlength: 'Alamat terlalu pendek, sertakan jalan, nomor, dan kota (min. 10 karakter).'
            },
            fUkuran: {
                required: 'Silakan pilih ukuran sepatu Anda!'
            },
            fPembayaran: {
                required: 'Silakan pilih metode pembayaran yang diinginkan!'
            },
            fPassword: {
                required: 'Password akun wajib diisi!',
                minlength: 'Password minimal terdiri dari 8 karakter.'
            },
            fKonfirmasi: {
                required: 'Konfirmasi password wajib diisi!',
                equalTo: 'Konfirmasi tidak cocok dengan password di atas!'
            }
        },

        errorPlacement: function (error, element) {
            // Tempatkan pesan error setelah wrapper atau input
            if (element.parent().hasClass('select-wrapper')) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },

        highlight: function (element) {
            $(element).addClass('is-error').removeClass('is-valid');
        },

        unhighlight: function (element) {
            $(element).removeClass('is-error').addClass('is-valid');
        },

        submitHandler: function (form) {
            // Ketika seluruh 8 input lolos validasi
            var namaPembeli = $('#fNama').val();
            var ukuran = $('#fUkuran').val();

            // Tampilkan pesan sukses dengan animasi fadeIn
            $('#suksesOrder')
                .stop(true, true)
                .hide()
                .slideDown(350);

            // Toast feedback
            tampilkanToast('✅ Pesanan atas nama ' + namaPembeli + ' (Ukuran EU ' + ukuran + ') berhasil dicatat!', 'success');

            // Scroll perlahan ke area pesan sukses
            $('html, body').animate({
                scrollTop: $('#suksesOrder').offset().top - 120
            }, 450);

            // Reset form setelah 3 detik
            setTimeout(function () {
                form.reset();
                $('#formOrder input, #formOrder select, #formOrder textarea').removeClass('is-valid is-error');
                $('#strengthBar').css({ 'width': '0%', 'background': 'transparent' });
                $('#strengthLabel').html('');
            }, 3000);

            return false;
        }
    });

    // Notifikasi klik tombol Cari (Search icon)
    $('#btnSearch').on('click', function () {
        var cari = prompt('Ketik nama sepatu atau model yang ingin dicari (contoh: Sneaker, Oxford, Carbon):');
        if (cari && cari.trim().length > 0) {
            tampilkanToast('🔍 Mencari model "' + cari + '" di katalog...', 'info');
            $('html, body').animate({
                scrollTop: $('#produk').offset().top - 72
            }, 600);
        }
    });

});
