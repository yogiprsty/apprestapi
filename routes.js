'use strict';

module.exports = function (app) {
    var json = require('./controller');

    app.route('/')
        .get(json.index);

    app.route('/mahasiswa')
        .get(json.getAllMahasiswa);

    app.route('/mahasiswa/:id')
        .get(json.getMahasiswa);

    app.route('/add')
        .post(json.addMahasiswa);

    app.route('/update')
        .put(json.updateMahasiswa);

    app.route('/delete')
        .delete(json.deleteMahasiswa);

    app.route('/matakuliah')
        .get(json.getMatakuliah);
}