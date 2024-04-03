var lista = [];
var listaCheck = [];
var arrayHora = [];
var arrayHoraCheck = [];

const agregarToDo = (todo) => {
    if(todo.length > 0 && verificarLista(todo)) {
        lista.push(todo);
        arrayHora.push(Date.now());
        listaCheck.push(false);
        arrayHoraCheck.push(false);
        mostrarLista(todo);
    }
}

const verificarLista = (todo) => {
    var i = 0;
    while(i<lista.length && lista[i] != todo){
        i++
    }
    if(i<lista.length){
        return false;
    }
    else{
        return true;
    }
}

const mostrarLista = () => {
    const array = document.getElementById('array');
    while (array.hasChildNodes()) {
        array.removeChild(array.firstChild);
    }

    for (var i = 0; i < lista.length; i++){
        var contenedor = document.createElement("div");
        var label = document.createElement("label");
        label.textContent = lista[i];
        label.setAttribute("id", i);
        if (listaCheck[i]) {
            label.style.textDecoration = 'line-through';
        }
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = listaCheck[i];
        var eliminar = document.createElement("button");
        eliminar.setAttribute("id", i);
        eliminar.setAttribute("onclick", "borrarToDo(" + i + ")");
        eliminar.textContent = "x";
        checkbox.addEventListener('change', (function(j) {
            return function() {
                listaCheck[j] = this.checked;
                arrayHoraCheck[j] = Date.now();
                if(listaCheck[j]){
                    document.getElementById(j).style.textDecoration = 'line-through';
                }
                else{
                    document.getElementById(j).style.textDecoration = 'none';
                    arrayHoraCheck[j] = false;
                }
            }
        })(i));
        contenedor.appendChild(checkbox);
        contenedor.appendChild(label);
        contenedor.appendChild(eliminar);
        contenedor.setAttribute("class", "contenedor");
        array.appendChild(contenedor);
    }
}

const calcularTareaMasRapida = () => {
    if(arrayHoraCheck.some(elemento => elemento !== false)){
        const resultado = document.getElementById("calcular");
        var mensaje;
        var mas = Number.MAX_VALUE;
        var masTodo = "";
        for(var i = 0; i<lista.length; i++){
            if(listaCheck[i]){
                if(arrayHoraCheck[i] != false && (arrayHoraCheck[i] - arrayHora[i]) < mas){
                    mas = arrayHoraCheck[i] - arrayHora[i];
                    masTodo = lista[i];
                }
            }
        }
        mensaje = `La tarea mas rapida en ser realizada fue ${masTodo} en`
        if(mas > 1000 && mas < 60000){
            mas = (mas / 1000).toFixed(2);
            mensaje += ` ${mas} segundos`;
        }
        else if(mas > 60000){
            mas = (mas / 60000).toFixed(2);
            mensaje += ` ${mas} minutos`;
        }
        else{
            mensaje += ` ${mas.toFixed(2)} milisegundos`;
        }
        const respuesta = document.createElement("p");
        const parrafos = resultado.querySelectorAll('p');
        parrafos.forEach(parrafo => {
            parrafo.remove();
        });
        respuesta.innerHTML = mensaje;
        resultado.appendChild(respuesta);
    }
}

const borrarToDo = (i) => {
    const resultado = document.getElementById("calcular");
    resultado.querySelectorAll('p').forEach(parrafo => {
        if (lista.includes(parrafo.textContent.trim())) {
            parrafo.remove();
        }
    });
    lista.splice(i, 1);
    listaCheck.splice(i, 1);
    arrayHora.splice(i, 1);
    mostrarLista();
}