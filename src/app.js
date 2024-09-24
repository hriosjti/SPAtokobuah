// menyimpan data dengan alipne js
document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Nanas Lokal 1Kg', img: 'nanas.jpg', price: 30000 },
            { id: 2, name: 'Anggur 1Kg', img: 'anggur.jpeg', price: 35000 },
            { id: 3, name: 'Alpukat 1Kg', img: 'alpukat.jpg', price: 20000 },
            { id: 4, name: 'Pisang 1Kg', img: 'pisang.jpg', price: 25000 },
        ]
    }));
    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek apakah ada barang yang sama dicart
            const cartItem = this.items.find((item) => item.id === newItem.id)


            if (!cartItem) {

                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;

            } else {

                // jika barangnya udah ada dicart cek apakah beda atau sama dengan aday yang di cart
                this.items = this.items.map((item) => {
                    if (item.id !== newItem.id) {
                        return item
                    } else {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }

        },
        remove(id) {
            //ambil item yang mau diremove berdasarkan id
            const cartItem = this.items.find((item) => item.id === id);


            //jika item lebih dari 1
            if (cartItem.quantity > 1) {
                //telusuri 1 1
                this.items = this.items.map((item) => {
                    //jika bukan barang yang diklik
                    if (item.id !== id) {
                        return item;

                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                // jika barang sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    });


});



// form validation
const chekoutButton = document.querySelector('.checkout-button');
chekoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function () {
    for (let i = 0; i < form.elements.lengt; i++) {
        if (form.elements[i].value.length !== 0) {
            chekoutButton.classList.remove('disabled');
            chekoutButton.classList.add('disabled');

        } else {
            return false;
        }
    }
    chekoutButton.disabled = false;
    chekoutButton.classList.remove('disabled');
});

// kirim data ketika tombol chekout diklik
chekoutButton.addEventListener('click', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);
    window.open('http://wa.me/6285380005202?text=' + encodeURIComponent(message));
});

// format pesan whatsapp

const formatMessage = (obj) => {
    return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No Hp: ${obj.phone}
    Alamat: ${obj.address}
Data Pesanan:
${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
     TOTAL: ${rupiah(obj.total)}
     Note: Harga Belum Termasuk Ongkir,
     Pesanan anda akan segera diproses oleh admin.Terima Kasih:)`;
};



// konversi ke rupiah 

const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,

    }).format(number);
};