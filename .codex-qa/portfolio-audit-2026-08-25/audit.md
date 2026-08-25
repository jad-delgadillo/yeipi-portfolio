# Auditoría de marketing, funnel y dirección creativa — El Yeipi

Fecha: 25 de agosto de 2026

## Veredicto

El sitio ya vende una sensibilidad visual premium y diferenciada. Funciona muy bien como pieza de autor, pero todavía no funciona con la misma fuerza como sistema comercial: emociona antes de explicar, muestra antes de contextualizar y deja demasiado trabajo al prospecto para entender qué puede contratar, por qué confiar y cuál es el siguiente paso.

La prioridad no es rediseñar todo. Es conservar el lenguaje cinematográfico y sumar claridad comercial, prueba y una ruta de contacto con menos fricción.

## Recorrido auditado

1. Entrada cinematográfica — salud: riesgosa para conversión.
2. Hero / primera impresión — salud: visualmente fuerte, comercialmente amplia.
3. Proyectos y categorías — salud: buena exploración, falta contexto de negocio.
4. Caso de estudio — salud: buena presentación, prueba incompleta.
5. Proceso — salud: tranquiliza, pero no explica alcance operativo.
6. Contacto — salud: claro visualmente, débil como mecanismo de captura.
7. Navegación y accesibilidad visible — salud: correcta en móvil, inconsistente en desktop.

## Fortalezas

- Dirección cinematográfica coherente: video, tipografía, ritmo, negros, acento coral y framing se sienten propios.
- El hero comunica oficio y tono en segundos.
- La versión móvil tiene una jerarquía fuerte y mantiene ambos CTA visibles.
- Las categorías permiten reconocer rápidamente varios tipos de trabajo.
- Las páginas de proyecto convierten piezas aisladas en casos con cliente, fecha, duración, texto y créditos.
- La copy evita sonar corporativa o genérica; existe una voz reconocible.
- Hay buen tratamiento semántico visible en varias áreas: headings, regiones, botones con nombre, estado de tabs y soporte para reduced motion.

## Riesgos de mayor impacto

### 1. La intro cobra atención antes de entregar valor

Sin interacción, la secuencia puede ocupar aproximadamente 10 segundos entre tres frases, carga y salida. El botón “Saltar intro” es pequeño y de bajo contraste. Para tráfico frío o referido desde Instagram, esa espera puede aumentar abandono antes de que aparezcan el trabajo o la oferta.

Recomendación: mostrar la intro una sola vez por sesión, reducirla a 2–3 segundos o convertirla en parte del hero sin bloquear el contenido.

### 2. La propuesta de valor es emocional, pero demasiado amplia

“Historias reales, hechas cine” es memorable, pero “marcas, bodas y momentos” mezcla audiencias con motivaciones de compra distintas. No queda claro si El Yeipi es director, filmmaker individual, estudio o productora, ni cuál es la ventaja concreta de contratarlo.

Recomendación de estructura:

- Promesa: `Películas y fotografía con pulso para marcas y celebraciones.`
- Descriptor: `Dirección, producción y postproducción desde Guadalajara, disponibles en todo México.`
- Prueba inmediata: `Trabajo para Adidas, Porsche, Blackbox…`
- CTA: `Cuéntame tu proyecto` y secundario `Ver casos`.

### 3. La oferta comercial desapareció de la página

Existe contenido para cinco servicios en `site-content.ts`, pero la home no renderiza una sección con id `services`. El footer contiene seis enlaces hacia `#services`, por lo que hoy apuntan a un destino inexistente.

Recomendación: reincorporar una sección “Qué puedes contratar” antes del proceso con entregables, uso ideal y una micro-CTA por servicio. No hace falta mostrar precios cerrados, pero sí dejar claro qué se compra.

### 4. La prueba social es visual, no persuasiva

Los logos aportan autoridad, pero no explican qué se hizo, en qué rol ni qué cambió para el cliente. Tampoco hay testimonios, resultados, recurrencia, alcance o señales de operación confiable.

Recomendación: acompañar 2–3 marcas con una línea verificable: objetivo, pieza entregada y resultado o uso. Agregar uno o dos testimonios breves con nombre y cargo si existen.

### 5. Los casos hablan más al gremio que al comprador

Las especificaciones técnicas ayudan a otros filmmakers, pero el prospecto quiere entender problema, enfoque, entregables y resultado. En HYROX se ve además una inconsistencia: el reproductor muestra 0:36 mientras la ficha dice “1 MINUTO”. Los enlaces de Instagram apuntan a la raíz de Instagram y las imágenes BTS son de Unsplash, no evidencia real del proyecto.

Recomendación: estructurar cada caso como `reto → idea → ejecución → entregables → resultado`, usar enlaces reales y reemplazar BTS genérico. Corregir duración y cualquier claim antes de lanzamiento.

### 6. El cierre depende de un mailto con identidad distinta

El CTA principal abre `hello@lumanorth.studio`, una marca distinta a El Yeipi. Esto puede generar duda o parecer placeholder. Mailto tampoco captura a quienes no tienen cliente de correo configurado ni establece expectativa de respuesta.

Recomendación: usar un correo de la misma marca o explicar la relación, sumar WhatsApp o formulario corto y prometer una respuesta concreta, por ejemplo: “Cuéntame fecha, ciudad y objetivo. Respondo en 24–48 h.”

### 7. Desktop pierde navegación persistente

La navegación principal está comentada en la home. En móvil aparece una barra fija útil más adelante, pero en desktop el prospecto depende del scroll o de regresar al hero para encontrar CTA. El funnel debería conservar una salida a contacto durante todo el recorrido.

Recomendación: barra discreta o CTA flotante en desktop, sin competir con el lenguaje editorial.

## Orden recomendado del funnel

1. Hero con promesa, rol, prueba y CTA.
2. Logos con contexto mínimo.
3. Tres casos destacados orientados a la audiencia prioritaria.
4. Qué puedes contratar: servicio, entregable y uso ideal.
5. Proceso: brief, propuesta, rodaje, post y entrega.
6. Testimonio o señal de confianza.
7. CTA con formulario/WhatsApp y expectativa de respuesta.

## Prioridad de ejecución

### P0 — antes de publicar o enviar a prospectos

- Corregir correo y destino de CTA.
- Reparar los enlaces `#services` o retirar esos enlaces temporalmente.
- Sustituir enlaces sociales genéricos y BTS de stock.
- Corregir inconsistencias de duración y validar claims/logos.
- Reducir o no bloquear con la intro.

### P1 — mayor mejora de conversión

- Reescribir hero para añadir rol, cliente ideal y valor concreto.
- Volver a renderizar servicios con entregables.
- Reestructurar tres casos con reto, alcance y resultado.
- Añadir formulario corto o WhatsApp y tiempo de respuesta.
- Incorporar testimonios o prueba contextual.

### P2 — optimización y pulido

- Afinar contraste de textos secundarios y metadatos pequeños.
- Unificar español/inglés en categorías y términos.
- Añadir navegación persistente en desktop.
- Medir clics en proyectos, CTA y abandono de intro.

## Riesgos de accesibilidad observables

- El texto gris y algunos metadatos pequeños podrían no alcanzar contraste o legibilidad suficiente; debe verificarse con medición.
- La intro usa diálogo modal e inert correctamente, pero no se verificó en esta auditoría un focus trap completo ni la experiencia con lector de pantalla.
- El movimiento cuenta con tratamiento `prefers-reduced-motion` en la intro, una fortaleza; falta verificar videos y animaciones del resto del sitio.
- La navegación móvil y los CTA tienen objetivos táctiles razonables a simple vista.

## Límites

La auditoría se basó en capturas actuales, recorrido visible, DOM y revisión del contenido del repositorio. No confirma cumplimiento WCAG completo, rendimiento en red móvil real, permisos legales de logos, veracidad de resultados ni comportamiento en todos los navegadores.
