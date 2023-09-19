// Utilizo funciones anónimas auto ejecutables con la intención de modularizar el código.

// Módulo 1. XMLHttpRequest
(() => {
    // 1. Instancia del objeto XMLHttpRequest
    const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();

    
    // 2. Asignación de eventos de la petición. ReadyStateChange detecta cualquier cambio en la petición.
    xhr.addEventListener("readystatechange", (e) => {
        // Condicional que devuelve nada hasta que el estado sea 4, que es estado completado.
        if(xhr.readyState !== 4) return;
        // console.log(xhr);
        
        // Validación para comprobar que la respuesta del servidor sea correcta
        if(xhr.status >= 200 && xhr.status <= 299) {
            // console.log("éxito");
            // console.log(xhr.responseText);

            /* 
            Recordamos los dos métodos de los JSON para manipular su información.
            * Parse: Formato JSON -> Formato JS
            * Stringify: Formato JS -> Formato JSON
            */

            let json = JSON.parse(xhr.responseText);
            // console.log(json);

            // Por cada elemento del objeto json vamos a crear un li con un textContent con el nombre, email y teléfono. Iremos añadiendo cada li al $fragment que es un fragmento HTML.
            json.forEach( el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
            });

            // Cuando termine de generarse el fragmento lo insertamos en el DOM, en el id xhr del HTML
            $xhr.appendChild($fragment);
            
            // En este scope del código es donde se programará todo lo que se quiera hacer con la información solicitada a la API. En este punto ya estaríamos conectados correctamente.

            // Escribir más código AQUÍ para manipular tu DOM ... recordar usar siempre document fragment para no destrozar el rendimiento

        } else {
            console.error("error");
            let message = xhr.statusText || "Ocurrió un error";
            $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
        }

    });

    // 3. Abrir la petición. Método y end-point
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

    // También podríamos generar nuestros propios archivos JSON y consumirlos
    // xhr.open("GET", "users.json");

    // 4. Enviar la información
    xhr.send();
})();

// Módulo 2. Uso de la API Fetch
(() => {
    // Instancia del objeto fetch
    const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();

    // fetch recibe la URL a consumir y opcionalmente un objeto con configuraciones. Por defecto será el método GET. Recordar que fetch es una promesa, por lo que trabajará con el then y el catch.
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => {
        console.log(res);

        // Convierto la respuesta al tipo de formato deseado. En este caso es un archivo json, pero también podría ser texto (text) u otro formato (blob). Más info en la documentación.

        // Devolvemos esta ternaria para ejecutar el catch en caso de que la petición falle. ASí validamos un error con la API de fetch.
        return res.ok ? res.json() : Promise.reject(res);
    })
    .then(json => {
        console.log(json);
        
        // Cuando llego al segundo then ya se hizo la validación de que la respuesta del servidor es correcta. Entonces mando a generar el HTML dinámicamente desde aquí.

        json.forEach( el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
            });
        
        // Lo agrego al HTML
        $fetch.appendChild($fragment);
    })
    .catch(err => {
        console.error("Estamos en el catch", err);
        let message = err.statusText || "Ocurrió un error";
        $fetch.innerHTML = `Error ${err.status}: ${message}`;
    })
    .finally(() => console.info("Siempre se ejecutará el contenido de finally"));
})();

// Módulo 3. Fetch + Async-Await
(() => {

})();
