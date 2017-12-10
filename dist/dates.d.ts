export declare type DateUnits = "milliseconds" | "seconds" | "minutes" | "hours" | "days" | "months" | "years";
/**Trunca la parte menos significativa de una fecha */
export declare function truncateDate(value: Date, precision: DateUnits): Date;
/**Suma un valor en cierta unidad a una fecha */
export declare function addDate(date: Date, value: number, units: DateUnits): Date;
