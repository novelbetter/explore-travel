function allTravel() {
    // ambil data JSON yg diubah menjadi object, lalu jalankan fungsi
    $.getJSON('./js/travel.json', function (data) { // kalau mau versi lengkap pakai $.ajax
        // ambil object travel lalu masukkan kedalam variabel travel
        let travel = data.travel;        // looping tiap elemen pada variabel travel dan jalankan fungsi
        $.each(travel, function (i, data) {
            // ambil elemen html #travel-list
            // tambahkan di akhir sebuah elemen baru
            if (window.innerWidth >= "700px") {
                $('#travel-list').append(`
                    <div class="col-md-3 mb-5">
                    <img src="${data.image}">
                    </div>
                    <div class="col-md-3 col-sm-10">
                    <div class="card-body mb-5">
                        <h3 class="card-title font-weight-bold">${data.title}</h3>
                        <h4 class="card-text mb-3">${data.description}</h4>
                        <h4 class="card-text text-primary mb-3">${data.features}</h4>
                        <h5 class="card-subtitle text-muted mb-3">${data.category}</h5>
                            <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal"  data-id="${data.imdbID}">See Details</a>
                    </div>
                </div>
        `);
            } else {
                $('#travel-list').append(`
                    <div class="col-sm-10 col-md-4 col-lg-3 col-xl-2 mb-5">
                    <img src="${data.image}">
                    </div>
                    <div class="col-sm-10 col-md-6 col-lg-3 col-xl-4">
                    <div class="card-body mt-5">
                        <h3 class="card-title font-weight-bold">${data.title}</h3>
                        <h4 class="card-text mb-3">${data.description}</h4>
                        <h4 class="card-text text-primary mb-3">${data.features}</h4>
                        <h5 class="card-subtitle text-muted mb-3">${data.category}</h5>
                            <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal"  data-id="${data.imdbID}">See Details</a>
                    </div>
                </div>
        `);
}
        });
    });
}


allTravel();


// membuat setting agar kategori, judul halaman dan contentnya sinkron saat di klik
// teks kategori akan terfokus saat di klik karena ditambahkan class active
// ambil elemen nav-link lalu jalankan fungsi
$(".nav-link").click(function () {
    // hilangkan semua class active di elemen .nav-link
    $(".nav-link").removeClass("active");
    // tambahkan kelas active di elemen yg di pilih
    $(this).toggleClass("active");

    // judul halaman akan berubah ketika kategori diklik
    // masukkan elemen html kedalam variabel category
    let category = $(this).html(); // this nya adalah .catalog h1
    // masukkan .catalog h1 kedalam variabel category/html
    $('.catalog h1').html(category);

    // jika yg dipilih kategori home, maka tamplikan semua list
    if (category == 'Home') {
        $('#travel-list').html('');
        allTravel();
        return;
    }

    // tampilkan list hanya berdasarkan kategori tertentu
    // ambil file JSON
    $.getJSON('./js/travel.json', function (data) {
        let travel = data.travel;
        let content = '';
        
        $.each(travel, function (i, data) {
            if (data.category == category) {
                content += `
                    <div class="card mb-3">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                            <img src="${data.image}">
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h3 class="card-title">${data.title}</h3>
                                <h4 class="card-text mb-3">${data.description}</h4>
                                <h4 class="card-text text-primary mb-3">${data.features}</h4>
                                <h5 class="card-subtitle text-muted mb-4">${data.category}</h5>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal"  data-id="${data.imdbID}">See Details</a>
                            </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        $('#travel-list').html(content);
    });
});