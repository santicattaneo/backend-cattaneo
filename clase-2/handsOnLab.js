//crear clase que permitira llevar una gestion completa de usuarios que deseen acceder a dichos eventos
//definir clase TicketManager, tendra un arreglo de eventos que iniciara vacio
//la clase debe contar con una variable privada "precioBaseDeGanancia", la cual añadira un costo adicional al precio de cada evento
//debe contar con el metodo "getEventos", el cual mostrara los eventos guardados
//debe contar con el metodo "agregarEvento", el cual recibira los siguientes parametros: nombre, lugar, precio(se le agrega un 0,15 del valor inicial),capacidad(50 default), fecha(hoy default) || el metodo debera crear ademas el campo id autoincrementable y el campo "participantes" que siempre iniciara con un arreglo vacio
class TicketManager {
    #precioBaseGanancia = 0.15;
    constructor() {
        this.eventos = [];
    };
    getEventos = () => {
        return this.eventos
    };
    agregarEventos = (nombre, lugar, precio, capacidad = 50, fecha = new Date().toDateString()) => {
        const evento = {
            nombre,
            lugar,
            precio: precio + precio * this.#precioBaseGanancia,
            capacidad,
            fecha,
            participantes: []
        };
        if (this.eventos.length === 0){
            evento.id = 1;
        } else {
            evento.id = this.eventos[this.eventos.length - 1];
        };
        this.eventos.push(evento);
    };
};
const manejadorEventos = new TicketManager();
manejadorEventos.agregarEventos('Evento 1', 'Argentina', 200, 50000);
manejadorEventos.agregarEventos('Evento 2', 'Colombia', 500);
console.log('eventos: ', manejadorEventos.getEventos())