const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consultasHome = async (req, res) => {

    const viajes = await Viaje.findAll({
        limit: 3
    });
    
    const testimoniales = await Testimonial.findAll({
        order: [['id', 'DESC']],
        limit: 3
    });

    res.render('index', {
        pagina: 'Inicio',
        clase: 'home',
        viajes: viajes,
        testimoniales: testimoniales
    });
}