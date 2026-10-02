// ===== To-Do List - app.js =====
// Program ini memakai JavaScript DOM supaya halaman bisa berubah secara interaktif

// Aktivitas 1: DOM SELECTION (Seleksi Elemen)
// Kita harus seleksi dulu elemen HTML-nya, lalu disimpan di variabel
// supaya bisa dipakai berulang kali

// document.getElementById("...") = mengambil elemen berdasarkan atribut id (tanpa #)
const inputTugas = document.getElementById("input-tugas"); // kolom input tempat mengetik tugas
const btnTambah = document.getElementById("btn-tambah"); // tombol "Tambah"
const daftarTugas = document.getElementById("daftar-tugas"); // <ul> wadah daftar tugas
const jumlahTugas = document.getElementById("jumlah-tugas"); // <span> angka total tugas
const jumlahSelesai = document.getElementById("jumlah-selesai"); // <span> angka tugas selesai
const pesanKosong = document.getElementById("pesan-kosong"); // tulisan "Belum ada tugas"
const jumlahBelum = document.getElementById("jumlah-belum"); // <p> angka tugas yang belum selesai

// Aktivitas 2: Fungsi untuk memperbarui statistik
// Fungsi ini dipanggil setiap kali ada tugas ditambah, dihapus, atau dicentang
function perbaruiStatistik() {
  // querySelectorAll("li") = mengambil SEMUA elemen li di dalam daftar
  // .length = jumlah elemen yang ditemukan
  const total = daftarTugas.querySelectorAll("li").length;

  // "li.completed" = hanya li yang punya class "completed" (tugas yang sudah dicentang)
  const selesai = daftarTugas.querySelectorAll("li.completed").length;

  // belum selesai = total dikurangi yang sudah selesai
  // harus ditulis SETELAH variabel selesai dibuat
  const belum = total - selesai;

  // .innerText = mengganti teks yang tampil di dalam elemen
  jumlahTugas.innerText = total;
  jumlahSelesai.innerText = selesai;
  jumlahBelum.innerText = belum;

  // Conditional: apakah daftar kosong?
  if (total === 0) {
    // classList.remove("hidden") = hapus class hidden supaya pesan muncul
    pesanKosong.classList.remove("hidden");
  } else {
    // classList.add("hidden") = tambah class hidden supaya pesan tersembunyi
    pesanKosong.classList.add("hidden");
  }
}

// Aktivitas 3: Fungsi utama untuk menambah tugas baru
function tambahTugas() {
  // .value = mengambil teks yang diketik user di kolom input
  // .trim() = menghapus spasi di awal dan akhir teks
  const isiTugas = inputTugas.value.trim();

  // Validasi: kalau input kosong, tampilkan alert lalu hentikan fungsi
  if (isiTugas === "") {
    alert("Catatan Anda tidak boleh kosong");
    return; // return = berhenti di sini, kode di bawahnya tidak dijalankan
  }

  // document.createElement("li") = membuat elemen li baru (masih di memori, belum tampil)
  const li = document.createElement("li");

  // membuat checkbox untuk menandai tugas selesai
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox"; // mengubah jenis input menjadi checkbox

  // membuat span untuk menampung teks tugas
  const teks = document.createElement("span");
  teks.className = "teks"; // memberi class "teks" supaya kena style di CSS
  teks.innerText = isiTugas; // mengisi teks dengan tugas yang diketik user

  // membuat tombol hapus
  const btnHapus = document.createElement("button");
  btnHapus.className = "btn-hapus"; // memberi class "btn-hapus"
  btnHapus.innerText = "Hapus"; // mengisi tulisan pada tombol

  // Event listener pada checkbox
  // "change" = jalan setiap kali checkbox dicentang atau dicentang ulang
  checkbox.addEventListener("change", function () {
    // classList.toggle("nama-class", kondisi)
    // kalau checkbox dicentang (true) = class "completed" ditambahkan, teks jadi dicoret
    // kalau centang dilepas (false) = class "completed" dihapus, teks kembali normal
    teks.classList.toggle("completed", checkbox.checked);
    li.classList.toggle("completed", checkbox.checked);

    perbaruiStatistik(); // update angka "selesai" di layar
  });

  // Event listener pada tombol hapus
  // "click" = jalan ketika tombol diklik
  btnHapus.addEventListener("click", function () {
    li.remove(); // remove() = menghapus elemen li dari halaman
    perbaruiStatistik(); // update angka total dan selesai
  });

  // appendChild = memasukkan elemen ke dalam elemen induk (parent)
  // susunan di dalam li: checkbox, teks, lalu tombol hapus
  li.appendChild(checkbox);
  li.appendChild(teks);
  li.appendChild(btnHapus);

  // menempelkan li ke dalam <ul> supaya tampil di halaman
  daftarTugas.appendChild(li);

  // mengosongkan kolom input supaya siap dipakai lagi
  inputTugas.value = "";
  inputTugas.focus(); // kursor otomatis kembali ke kolom input

  perbaruiStatistik(); // update angka total
}

// Aktivitas 4: EVENT LISTENER
// addEventListener = "memasang telinga" pada elemen supaya bereaksi saat ada kejadian

// Event click: ketika tombol "Tambah" diklik, jalankan fungsi tambahTugas()
btnTambah.addEventListener("click", function () {
  tambahTugas();
});

// Event keyup: ketika user melepas tombol keyboard di dalam kolom input
// parameter event berisi info tombol mana yang ditekan
inputTugas.addEventListener("keyup", function (event) {
  // event.key === "Enter" = cek apakah tombol yang dilepas adalah Enter
  if (event.key === "Enter") {
    tambahTugas();
  }
});

// Dijalankan sekali saat halaman pertama dibuka
// supaya angka 0 dan pesan "Belum ada tugas" tampil dengan benar
perbaruiStatistik();