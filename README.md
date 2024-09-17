# Horario con Temporizador 

Este proyecto es una aplicación web interactiva que combina un horario semanal con un temporizador de actividades. Está diseñado para ayudar a los usuarios a gestionar su tiempo de manera eficiente, permitiéndoles visualizar su horario, cronometrar sus actividades y llevar un registro de su tiempo.

## Características

- Visualización de horario semanal interactivo
- Temporizador integrado para actividades
- Edición in-situ de actividades en el horario
- Registro de actividades completadas
- Alerta visual y sonora al alcanzar los 90 minutos de actividad
- Diseño responsivo y amigable

## Tecnologías Utilizadas

- React
- Tailwind CSS
- Lucide React (para iconos)
- Shadcn UI (para componentes de interfaz de usuario)
- Claude AI

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 14.0 o superior)
- npm (normalmente viene con Node.js)

## Uso
Abre tu navegador y visita `https://app-seguimiento.vercel.app/`

Para usar la aplicación:
   - Haz clic en los días de la semana para ver el horario correspondiente
   - Haz doble clic en una actividad para editarla
   - Haz clic en una actividad para iniciar el temporizador
   - Usa los botones de control del temporizador para pausar, reanudar o reiniciar
   - El temporizador te alertará visual y sonoramente después de 90 minutos

## Personalización

Puedes personalizar varios aspectos de la aplicación:

- Modifica el horario inicial en la constante `initialSchedule`
- Cambia los colores de las actividades en `initialColorMap`
- Ajusta la duración de la alerta modificando el valor en el useEffect del temporizador (actualmente establecido en 5400 segundos, que son 90 minutos)

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

Link del Proyecto: [https://github.com/DaNNy0o0/App_Seguimiento](https://github.com/DaNNy0o0/App_Seguimiento)]
