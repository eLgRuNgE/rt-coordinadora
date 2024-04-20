const pool = require('../config/db');


async function getAttendeesByWeekday() {
    /**
     * Función para obtener la cantidad de asistentes por día de la semana.
     * Devuelve un objeto con la cantidad de asistentes por cada día de la semana.
     */
    
    try {
        const { rows: events } = await pool.query(`
            SELECT event_id, EXTRACT(DOW FROM start_time) as day_of_week, COUNT(attendee_id) as num_attendees
            FROM events
            LEFT JOIN attendees ON events.event_id = attendees.event_id
            GROUP BY event_id, day_of_week
        `);

        if (events.length === 0) {
            return { message: "No hay eventos registrados o no hay asistentes registrados en los eventos." };
        }

        // Objeto para mantener el recuento de asistentes por día de la semana
        const weekdayCounts = {
            'Sunday': 0,
            'Monday': 0,
            'Tuesday': 0,
            'Wednesday': 0,
            'Thursday': 0,
            'Friday': 0,
            'Saturday': 0
        };

        // Procesar cada evento y agregar los asistentes al día correspondiente
        events.forEach(event => {
            const weekdayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][event.day_of_week];
            weekdayCounts[weekdayName] += parseInt(event.num_attendees);
        });

        return weekdayCounts;
    } catch (error) {
        console.error('Error al calcular asistentes por día de la semana:', error);
        throw error;
    }
}

module.exports = { getAttendeesByWeekday };
