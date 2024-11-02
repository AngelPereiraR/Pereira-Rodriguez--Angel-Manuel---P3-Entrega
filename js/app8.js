let carrito = []

const bodyCarrito = document.querySelector("#lista-carrito tbody")

const listaCursos = document.querySelector("#lista-cursos")

const btnVaciarCarrito = document.querySelector("#vaciar-carrito")

// Seleccionar elementos necesarios
const buscador = document.querySelector("#buscador")
buscador.style.color = "#000"
const cursos = document.querySelectorAll("#lista-cursos .card")
const contenedorCursos = document.querySelector("#lista-cursos")

// Crear el contenedor para los resultados de búsqueda
const contenedorResultados = document.createElement("div")
contenedorResultados.id = "resultados-busqueda"
contenedorResultados.classList.add("container")
contenedorResultados.style.display = "none" // Oculto por defecto
contenedorCursos.parentNode.insertBefore(contenedorResultados, contenedorCursos.nextSibling) // Añadir al DOM

document.addEventListener("DOMContentLoaded", (e) => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || []
  pintarHtml()
})

listaCursos.addEventListener("click", (e) => {
  e.preventDefault()
  if (e.target.classList.contains("agregar-carrito")) {
    const card = e.target.parentElement.parentElement

    const nuevoElemento = {
      "imagen": card.children[0].src,
      "titulo": card.children[1].children[0].textContent,
      "precio": card.children[1].children[3].children[0].textContent,
      "cantidad": 1
    }

    const index = carrito.findIndex((elemento) => {
      return elemento.titulo === nuevoElemento.titulo
    })

    if (index !== -1) {
      carrito[index].cantidad++
    } else {
      carrito.push(nuevoElemento)
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))

    pintarHtml()
  }
})

btnVaciarCarrito.addEventListener("click", () => {
  bodyCarrito.innerHTML = ""
  carrito = []
  localStorage.setItem("carrito", [])
})

// Evento de búsqueda en tiempo real
buscador.addEventListener("input", () => {
  const textoBusqueda = buscador.value.toLowerCase();

  // Limpiar contenedor de resultados de búsqueda
  contenedorResultados.innerHTML = "";

  if (textoBusqueda === "") {
    // Si el campo de búsqueda está vacío, ocultar el contenedor de resultados
    contenedorResultados.style.display = "none";

    // Restaurar los cursos al contenedor original y mostrar todos los cursos
    cursos.forEach(curso => {
      curso.parentElement.parentElement.style.display = "block"; // Asegurarse de que estén visibles
    });
  } else {
    // Mostrar contenedor de resultados
    contenedorResultados.style.display = "block";

    let fila; // Variable para la fila actual
    let contador = 0; // Contador para controlar la cantidad de elementos por fila

    // Filtrar y mover cursos que coinciden con la búsqueda al contenedor de resultados
    cursos.forEach(curso => {
      curso.parentElement.parentElement.style.display = "none"; // Asegurarse de que estén invisibles
      const tituloCurso = curso.querySelector("h4").textContent.toLowerCase();
      if (tituloCurso.includes(textoBusqueda)) {
        if (contador % 3 === 0) {
          // Crear una nueva fila cada 3 elementos
          fila = document.createElement("div");
          fila.classList.add("row");
          contenedorResultados.appendChild(fila);
        }

        // Clonar el curso para mantener las clases originales
        const nuevoCurso = curso.cloneNode(true);
        nuevoCurso.classList.add("four", "columns"); // Añadir clases

        // Agregar un efecto de transición suave
        nuevoCurso.style.opacity = '0'; // Iniciar opaco
        fila.appendChild(nuevoCurso); // Añadir el curso a la fila actual

        requestAnimationFrame(() => {
          nuevoCurso.style.transition = 'opacity 0.5s'; // Duración de la transición
          nuevoCurso.style.opacity = '1'; // Hacer visible el nuevo curso
        });

        contador++;
      }
    });
  }
});

// Funciones para Drag & Drop
let dragIndex = null;

function agregarEventosDrag() {
  const filas = document.querySelectorAll("#lista-carrito tbody tr");

  filas.forEach((fila, index) => {
    fila.setAttribute("draggable", "true");
    fila.style.cursor = "move"

    fila.addEventListener("dragstart", (e) => {
      dragIndex = index; // Almacena el índice de la fila que se está arrastrando
    });

    fila.addEventListener("dragover", (e) => {
      e.preventDefault(); // Prevenir el comportamiento predeterminado
    });

    fila.addEventListener("drop", (e) => {
      e.preventDefault();
      const targetIndex = index;

      if (dragIndex !== targetIndex) {
        const draggedItem = carrito[dragIndex];

        // Eliminar el item del índice original
        carrito.splice(dragIndex, 1);

        // Insertar en la nueva posición
        carrito.splice(targetIndex, 0, draggedItem);

        // Actualizar el localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Volver a pintar el carrito
        pintarHtml();
      }
    });
  });
}

// Pintar el carrito
function pintarHtml() {
  bodyCarrito.innerHTML = ""; // Limpiar el carrito al volver a pintar
  carrito.forEach((item, index) => {
    const row = document.createElement("tr")

    const imagenTd = document.createElement("td")
    const imagen = document.createElement("img")
    imagen.src = item.imagen
    imagen.style.width = "100px"
    imagenTd.append(imagen)
    row.append(imagenTd)

    const tituloTd = document.createElement("td")
    const titulo = document.createElement("p")
    titulo.textContent = item.titulo
    tituloTd.append(titulo)
    row.append(tituloTd)

    const precioTd = document.createElement("td")
    const precio = document.createElement("p")
    precio.textContent = item.precio
    precioTd.append(precio)
    row.append(precioTd)

    const cantidadTd = document.createElement("td")
    const cantidad = document.createElement("p")
    cantidad.textContent = item.cantidad
    cantidadTd.append(cantidad)
    row.append(cantidadTd)

    const borrarTd = document.createElement("td")
    const botonBorrar = document.createElement("button")
    botonBorrar.textContent = "Borrar"
    botonBorrar.addEventListener("click", () => {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      pintarHtml();
    })
    borrarTd.append(botonBorrar)
    row.append(borrarTd)

    bodyCarrito.append(row);
  });

  // Agregar eventos Drag & Drop después de pintar el HTML
  agregarEventosDrag();
}
