'use strict';

exports.ok = function (values, res) {
    let data = {
        'status': 200,
        'values': values
    };

    res.json(data);
    res.end();
};

//response untuk nested matakuliah
exports.oknested = function (values, res) {
    //lakukan akumulasi
    const hasil = values.reduce((accumulation, item) => {
        //tentukan key group
        if (accumulation[item.nama]) {
            //buat variabel group nama mahasiswa
            const group = accumulation[item.nama];
            //cek jika isi array adalah matakuliah
            if (Array.isArray(group.matakuliah)) {
                //tambahkan value ke dalam group matakuliah
                group.matakuliah.push(item.matakuliah);
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        } else {
            accumulation[item.nama] = item;
        }
        return accumulation;
    }, {});

    let data = {
        'status': 200,
        'values': hasil
    };

    res.json(data);
    res.end();

}
