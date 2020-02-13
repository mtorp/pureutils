export type DateUnits = "milliseconds" | "seconds" | "minutes" | "hours" | "days" | "months" | "years";
/**Trunca la parte menos significativa de una fecha */
export function truncateDate(value: Date, precision: DateUnits): Date {
    const year = value.getFullYear();
    const month = value.getMonth();
    const day = value.getDate();
    const hour = value.getHours();
    const minutes = value.getMinutes();
    const seconds = value.getSeconds();

    switch (precision) {
        case "milliseconds":
            return value;
        case "seconds":
            return new Date(year, month, day, hour, minutes, seconds);
        case "minutes":
            return new Date(year, month, day, hour, minutes);
        case "hours":
            return new Date(year, month, day, hour);
        case "days":
            return new Date(year, month, day);
        case "months":
            return new Date(year, month);
        case "years":
            return new Date(year, 0);
    }
}

/**Suma un valor en cierta unidad a una fecha */
export function addDate(date: Date, units: DateUnits, value: number): Date {
    const ms = date.valueOf();
    switch (units) {
        case "milliseconds":
            return new Date(ms + value);
        case "seconds":
            return new Date(ms + value * 1000);
        case "minutes":
            return new Date(ms + value * 1000 * 60);
        case "hours":
            return new Date(ms + value * 1000 * 60 * 60);
        case "days":
            //Note que no podemos sumar 24 horas por dia por lo del cambio de horario
            {
                const a = new Date(ms);
                a.setDate(a.getDate() + value);
                return a;
            }
        case "months":
            {
                const a = new Date(ms);
                a.setMonth(a.getMonth() + value);
                return a;
            }
        case "years":
            {
                const a = new Date(ms);
                a.setFullYear(a.getFullYear() + value);
                return a;
            }
    }
}