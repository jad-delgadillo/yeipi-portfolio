# Auditoría: tarjetas de servicios en móvil

## Alcance

- Superficie: sección de servicios en móvil.
- Objetivo: mejorar proporción, jerarquía y personalidad visual sin separar la tarjeta del fondo de la sección.
- Evidencia actual: `01-current-mobile.png`.
- Referencia aportada: `/var/folders/mg/fwx93t25105fg6ty77t9376r0000gn/T/codex-clipboard-dfd98c97-5c88-47ea-b65d-b76f184a7b99.png`.

## Pasos revisados

1. Entrada a la sección: saludable. El encabezado de sección tiene identidad y una jerarquía clara.
2. Lectura de la primera tarjeta: saludable con oportunidades de refinamiento. Número, título, descripción y acción están presentes y se entienden.
3. Comparación con la referencia: útil como dirección de superficie, pero débil como solución literal. La retícula y la ausencia de acción vuelven la tarjeta genérica y menos funcional.

## Fortalezas

- El título blanco y la descripción gris generan una jerarquía clara.
- El número facilita escanear una lista larga.
- La flecha comunica que existe una siguiente acción.
- El fondo oscuro continuo encaja con el lenguaje cinematográfico del sitio.

## Riesgos UX y visuales

- El número y la flecha tienen el mismo peso visual; compiten aunque solo la flecha es una acción.
- Una retícula decorativa como la de la referencia introduce un lenguaje tecnológico/SaaS que no pertenece claramente a Yeipi.
- Copiar la altura generosa de la referencia produciría demasiado desplazamiento para cinco servicios.
- Usar `#FE5A3D` como fondo completo, título o botón sólido en todas las tarjetas saturaría la sección y reduciría el carácter editorial.

## Accesibilidad

- Los objetivos circulares deben conservar un área táctil mínima aproximada de 44 × 44 px.
- El texto descriptivo gris necesita mantener contraste suficiente sobre `#131315`; no conviene reducir más su opacidad.
- El color naranja no debe ser el único indicador de que la flecha es interactiva; el contorno y la forma del botón deben permanecer.
- La revisión visual no confirma navegación por teclado, lector de pantalla ni zoom; requieren prueba funcional aparte.

## Recomendación

- Mantener tarjetas de 200–220 px de alto, determinadas por el contenido, con 22–24 px de padding, radio de 28 px y 12 px entre tarjetas.
- Mantener el mismo fondo base `#131315` de la sección.
- Usar una luz blanca muy tenue en la esquina superior derecha y un reflejo coral casi imperceptible en la esquina inferior izquierda.
- Reservar `#FE5A3D` para el número y para el icono/borde de la acción, no para el título ni para toda la superficie.
- Hacer el aro del número más tenue que el aro de la acción para que la jerarquía sea inequívoca.
- Mantener título y descripción alineados a la izquierda, sin retícula decorativa.

## Veredicto

La referencia aporta una buena idea de atmósfera y limpieza, pero no debería copiarse literalmente. La mejor dirección es una tarjeta más editorial y funcional: superficie integrada, gradiente casi invisible, número coral y una acción claramente dominante.
