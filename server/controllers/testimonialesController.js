const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll({
        order: [['id', 'DESC']],
        limit: 12
    })

    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    })
}

exports.agregarTestimonial = async (req, res) => {
    //console.log(req.body);

    //Validar que los campos no esten vacios
    let {nombre, email, mensaje} = req.body;
    let errores = [];

    if(!nombre) {
        errores.push({'mensaje': 'Agrega tu nombre'});
    }
    if(!email) {
        errores.push({'mensaje': 'Agrega tu email'});
    }
    if(!mensaje) {
        errores.push({'mensaje': 'Agrega tu mensaje'});
    }

    //Revisar si hay errores
    if(errores.length > 0){
        //Mostrar la vista con errores
        const testimoniales = await Testimonial.findAll({
            order: [['id', 'DESC']],
            limit: 12
        })
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores, //De aca pasa al template de testimoniales
            nombre,
            email,
            mensaje,
            testimoniales
        });
    } else {
        //Almacenar en la DB
        Testimonial.create({
            nombre,
            email,
            mensaje
        })
            .then(testimonial => res.redirect('/testimoniales'))
            .catch(error => console.log(error));
    }
}