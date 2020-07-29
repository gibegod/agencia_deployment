const Viaje = require('../models/Viajes');

//Se usan varios exports y no el module.export pq module.export es uno y es por default.

exports.mostrarViajes = async (req, res) => {
    const viajes = await Viaje.findAll()
    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    })
}

exports.mostrarViaje = async (req, res) => {
    const viaje = await Viaje.findByPk(req.params.id)
    res.render('viaje', {
        viaje
    })
}