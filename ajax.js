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
        /* 
            Estado	                    Valor
            READY_STATE_UNINITIALIZED	0
            READY_STATE_LOADING	        1
            READY_STATE_LOADED	        2
            READY_STATE_INTERACTIVE	    3
            READY_STATE_COMPLETE	    4
        */
        if(xhr.readyState !== 4) return;
        // console.log(xhr);
        
        // Validación para comprobar que la respuesta del servidor sea correcta

        // https://developer.mozilla.org/es/docs/Web/HTTP/Status
        /* 
            Respuestas informativas (100–199),
            Respuestas satisfactorias (200–299),
            Redirecciones (300–399),
            Errores de los clientes (400–499),
            y errores de los servidores (500–599).
        */
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
    // Instancia del objeto
    const $fetchAsync = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();

    async function getData() {
        try {
            let res = await fetch("https://jsonplaceholder.typicode.com/users"),
            json = await res.json();

            console.log(res,json);

            // Se puede controlar el error con new Error, pero este solo admite que devuelva texto y sería interesante poder devolver un objeto para adjuntar el status y el statusText.
            // if (!res.ok) throw new Error("Ocurrió un Error al solicitar los datos");

            // Recordamos que el throw es un return que manda el flujo a nuestro catch
            if(!res.ok) throw { status: res.status, statusText: res.statusText}

            // Por cada elemento del objeto json vamos a crear un li con un textContent con el nombre, email y teléfono. Iremos añadiendo cada li al $fragment que es un fragmento HTML.
            json.forEach( el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
            });

            // Cuando termine de generarse el fragmento lo insertamos en el DOM, en el id xhr del HTML
            $fetchAsync.appendChild($fragment);
        } catch (err) {
            console.error("Estamos en el catch", err);
            let message = err.statusText || "Ocurrió un error";
            $fetchAsync.innerHTML = `Error ${err.status}: ${message}`;
        } finally {
            console.log("Estoy en el finally del Async-Await");
        }

    }

    getData();

})();

// Módulo 3.5 jQuery
/* 
    Curso de jQuery: ¿?
    Solo servirá para mantenimiento. Ya no se desarrolla con esa API.
*/

// Módulo 4. Axios.
(() => {
    // Instancia del objeto axios
    const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();

    axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then( (res) => {
            console.log(res);
            let json = res.data;

            // Por cada elemento del objeto json vamos a crear un li con un textContent con el nombre, email y teléfono. Iremos añadiendo cada li al $fragment que es un fragmento HTML.
            json.forEach( el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
            });

            // Cuando termine de generarse el fragmento lo insertamos en el DOM, en el id xhr del HTML
            $axios.appendChild($fragment);
        })
        .catch( (err) => {
            console.log("Estamos en el catch Axios", err.response);
            let message = err.response.statusText || "Ocurrió un error";
            $axios.innerHTML = `Error ${err.response.status}: ${message}`;
        })
        .finally(()=> {
            console.log("Esto se ejecutará independientemente del Axios");
        });
})();

// Módulo 5. Axios + Async-Await
(() => {
    // Instancia del objeto axios+AA
    const $axiosAsync = document.getElementById("axios-async"),
    $fragment = document.createDocumentFragment();

    async function getData() {
        try {
            let res = await axios.get("https://jsonplaceholder.typicode.com/users"),
            json = await res.data;

            console.log(res,json);

            json.forEach( el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
            });

            $axiosAsync.appendChild($fragment);
        } catch (err) {
            console.log("Estamos en el catch Axios+Async-Await", err.response);
            let message = err.response.statusText || "Ocurrió un error";
            $axiosAsync.innerHTML = `Error ${err.response.status}: ${message}`;
        } finally {
            console.log("Esto se ejecutará independientemente del tryCatch del Axios+Async-Await");
        }
    }

    getData();
})();
