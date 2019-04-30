import * as rx from "rxjs";

/**El mismo comportamiento que el debounce, pero cuando la promesa se resuelve inmediatamente, devuelve el valor de forma síncrona,
 * este comportamiento no lo tiene el debounce de RxJS, ya que si devuelves una promesa ya resuelta aún así el valor se pospone hasta el siguiente evento de JS
 *  */
export function debounceSync<T>(timeFunc: (x: T) => PromiseLike<void>):  (obs: rx.Observable<T>) => rx.Observable<T> {
    return (obs) => new rx.Observable(subs => {
        let cancelar: boolean = false;
        /**Si hay un valor pendiente de reportar */
        let pendiente: { x: T } | undefined = undefined;
        let current = 0;
        const ReportarPendiente = () => {
            if (pendiente && !cancelar) {
                //Reportamos el ultimo valor si es que falta:
                subs.next(pendiente.x);
                pendiente = undefined;
            }
        };

        const ret = obs.subscribe(next => {
            if (cancelar)
                return;

            let promesaInmediata = true;
            current++;
            const currProm = current;
            const onPromise = () => {
                //Si esta promesa es vieja, no hace nada:
                if (currProm != current)
                    return;

                ///Llamamos inmediatamente al next
                ReportarPendiente();
            };

            pendiente = { x: next };
            const prom = timeFunc(next);
            prom.then(onPromise);
            //Si la ejecución del onPromise es después de este punto, la promesa no fue instantánea:
            promesaInmediata = false;

        }, error => {
            ReportarPendiente();
            subs.error(error);
            cancelar = true;
        }, () => {
            ReportarPendiente();
            subs.complete();
            cancelar = true;
        });
        
        return ret;
    });
}