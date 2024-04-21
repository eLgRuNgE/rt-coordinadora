# Diagrama Arquitectónico

## Descripción

Esta es la arquitectura que he diseñado para nuestra API, combinando lo mejor de los entornos locales y en la nube para lograr resiliencia, idempotencia y escalabilidad.

## Diagrama

![Diagrama Arquitectónico](https://raw.githubusercontent.com/eLgRuNgE/rt-coordinadora/main/static/img/DiagramaDeComponentesAPI.png)

- Link a diagrama externo:
[Diagrama Arquitectónico (Drive)](https://drive.google.com/file/d/1Q44QQiTlNHo9ZHIa1acvOhdGCdbXWm2p/view)

z## Componentes Clave

- **Load Balancer:** Equilibra el tráfico entre todas las instancias de la API para asegurar una distribución uniforme y evitar sobrecargas.
- **API Gateway:** Sirve como punto de entrada único para nuestras solicitudes, proporcionando seguridad, gestión de tráfico y monitoreo centralizado.
- **Servicios de Aplicación On-premise/Cloud:** Ejecutan nuestra API, permitiendo flexibilidad para escalar y mantener algunas partes críticas localmente mientras aprovechamos los recursos en la nube para otras.
- **Datastore On-premise/Cloud:** Almacena nuestros datos, con redundancia y distribución para garantizar la disponibilidad y la integridad de la información.
- **Queue Systems:** Maneja trabajos asíncronos y garantiza la idempotencia de las operaciones mediante la gestión de mensajes.

## Resiliencia y Escalabilidad

La arquitectura se centra en mejorar la resiliencia y la escalabilidad mediante:

- **Redundancia geográfica:** Distribuimos nuestros servicios en múltiples regiones para minimizar el impacto de las interrupciones.
- **Escalabilidad dinámica:** Utilizamos recursos en la nube para escalar automáticamente en respuesta a la demanda, mientras mantenemos la capacidad de escalar manualmente los servicios locales según sea necesario.
- **Failover automático:** Implementamos mecanismos de failover entre los entornos local y en la nube para garantizar la continuidad del servicio en caso de problemas.

## Estrategia de Idempotencia

Nos aseguramos de la idempotencia en las operaciones de la API mediante:

- **Identificadores únicos:** Cada solicitud incluye un identificador único que nos permite identificar y filtrar duplicados.
- **Operaciones transaccionales:** Las operaciones en nuestra base de datos son transaccionales, lo que garantiza la consistencia y la repetibilidad de las operaciones.
- **Respuestas predecibles:** Nuestras respuestas están diseñadas para ser consistentes y predecibles, independientemente de la cantidad de veces que se repita una solicitud.

