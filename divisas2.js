document.addEventListener("DOMContentLoaded", () => {
  const btnConvertir = document.getElementById("btnConvertir");

  btnConvertir.addEventListener("click", async () => {
    const cantidad = document.getElementById("cantidad").value;
    const origen = document.getElementById("monedaOrigen").value;
    const destino = document.getElementById("monedaDestino").value;
    const resultadoDiv = document.getElementById("resultado");

    if (!cantidad || isNaN(cantidad)) {
      resultadoDiv.innerText = "Por favor, ingresa una cantidad válida.";
      return;
    }

    resultadoDiv.innerText = "Convirtiendo..."; 


    const apiKey = "306d6b712df63263a3782232"; // clave 
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${origen}/${destino}/${cantidad}`;

    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      console.log("Datos API:", datos);

      if (datos.result === "error") {
        resultadoDiv.innerText = "Error al convertir: " + datos['error-type'];
        return;
      }

      resultadoDiv.innerText = `${cantidad} ${origen} = ${datos.conversion_result.toFixed(2)} ${destino}`;
    } catch (error) {
      console.error("Error al obtener datos:", error);
      resultadoDiv.innerText = "Error al conectar con la API.";
    }
  });
});
