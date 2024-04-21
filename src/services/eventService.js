const pool = require('../config/db');

async function getAttendeesByWeekday() {
    try {
        // Selecciona el día de la semana y cuenta los asistentes correctamente
        const { rows: events } = await pool.query(`
            SELECT EXTRACT(DOW FROM start_time) as day_of_week, COUNT(attendee_id) as num_attendees
            FROM events
            LEFT JOIN attendees ON events.event_id = attendees.event_id
            GROUP BY EXTRACT(DOW FROM start_time)
        `);

        // Si no hay eventos con asistentes, devuelve un mensaje indicativo
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

        // Procesar cada registro y agregar los asistentes al día correspondiente
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
