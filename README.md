# Proyecto de carrito de compras

## Funciones nuevas o mejoradas

### 1. Búsqueda en tiempo real

Se ha establecido un sistema de búsqueda para permitir a los usuarios filtrar los cursos disponibles a medida que escriben en el campo de búsqueda. Las funciones incluyen:

- **Filtrado dinámico**: a medida que se ingresa texto en el campo de búsqueda, la lista de cursos se actualiza automáticamente para que muestre solo aquellos cuyos nombres coincidan con el texto ingresado.
  **Visualización de resultados**: los cursos que coinciden con la búsqueda aparecen en un contenedor debajo de la lista original, y se van desvaneciendo con una animación agradable y suave.

**Ejemplo de uso**:

1. Escriba algo en el campo de búsqueda.

2. Observe cómo cambian dinámicamente los resultados: solo los cursos que coinciden con la búsqueda cumplen con esta receta.

### 2. Almacenamiento local (localStorage)

Se agregó el uso de `localStorage` para guardar el estado del carrito de compras. De esta manera, incluso si el usuario recarga la página o cierra el navegador, el carrito seguirá mostrando los cursos agregados o eliminados. Las características incluyen:

- **Persistencia de datos**: los cambios en la adición o eliminación de cursos del carrito se guardan automáticamente mediante `localStorage`.
- **Carga inicial del carrito**: los datos del carrito se recuperan de `localStorage` al cargar la página, lo que permite a los usuarios continuar su trabajo desde donde lo dejaron.

### 3. Arrastrar y soltar

La funcionalidad implementada permite a los usuarios arrastrar artículos dentro del carrito y reorganizarlos, de forma intuitiva o explícita. Las características incluyen:

- **Arrastrar y soltar**: los usuarios pueden arrastrar una fila del carrito a una nueva posición y soltarla. Esto reordenará los artículos de forma intuitiva.
- **Interacción visual**: el artículo que se arrastra se resalta visualmente para mostrar que se puede mover y las filas se resaltan cuando arrastra un artículo sobre ellas.

**Instrucciones para usar Arrastrar y soltar**:

1. Haga clic y mantenga presionado en una fila de un artículo determinado en el carrito.
2. Arrastre el artículo a la nueva posición dentro del carrito, donde desee que esté.
3. Suelte el artículo en esa nueva ubicación.

## Requisitos

- El navegador web moderno debe admitir `localStorage` y `drag-and-drop`.
