document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('form');

// -- MUESTRO ERROR --------------------
  const mostrarError = (input,mensaje) => {
    // Acceder al contenedor
    const liPadre = input.parentNode;
    // Encontramos div error-text
    const errorText = liPadre.querySelector('.error-text');
    // Agregar la clase 'error_style' al input
    input.classList.remove('input-1');
    input.classList.add('error-style');
    // Agregamos el mensaje de error
    errorText.innerText = mensaje;
  }

  // -- ELIMINO EL ERROR --------------------
  const eliminarError = (input) => {
    const liPadre = input.parentNode;
    // Eliminar clase error del elemento
    input.classList.add('input-1');
    input.classList.remove('error-style');
    // Encontrar elemento error-text
    const errorText = liPadre.querySelector('.error-text');
    if(errorText) {
      // Establecemos el texto como vacío
      errorText.innerHTML = '';
    } else {
      console.error("Elemento no encontrado.");
    }
  }

   // ---------------------------------
  //* Funcion para corroborar si los campos estan completos para quitar el error
  formulario.querySelectorAll('input').forEach(input =>{
    input.addEventListener('input',()=>{
      // Obtenemos el valor del campo seleccionado
      if (input.value !== ''){
        eliminarError(input);
      }
    })
  })
  formulario.querySelector('select').addEventListener('change', () => {
    const indice = document.getElementById("pais").selectedIndex;
    const input = document.getElementById('pais');
    if( indice != null || indice != 0 ) {
      eliminarError(input);
    }
  });

// -- VALIDACION EMAIL --------------------------
  //* Utilizando expresion regular
  function isEmail(email) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(email);
  }

  //* Validar campo
  function validarEmail(campoId,mensaje) {
    const campo = document.getElementById(campoId);
    const email = campo.value;

    if (email === ''){
      mostrarError(campo, 'Correo electronico obligatorio');
      return false; //? Validacion falla
    }else if (!isEmail(email)){
      mostrarError(campo,mensaje);
      return false; //? Validacion falla
    }else{
      eliminarError(campo);
      return true; //? Validacion exitosa
    }
  }

  //-- VALIDACION FECHA -----------------------
  function esMayorEdad(fecha) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const fechaFormateada = new Date(fecha);

    if ( currentDate.setFullYear(currentYear - 18) < fechaFormateada){
      console.log('es menor.')
      return false;
    } else {
      console.log('es mayor.')
      return true;
    }

  }

  function validarFecha(campoId,mensaje) {
    const campo = document.getElementById(campoId);
    const fecha = campo.value;

    if(fecha === ''){
      mostrarError(campo, mensaje);
      return false;
    } else if (!esMayorEdad(fecha)){
      mostrarError(campo,'Debe ser mayor de edad.');
      return false;
    } else {
      eliminarError(campo);
      return true;
    }
  }

  function validarPais(campoId, mensaje) {
    const input = document.getElementById(campoId);
    const indice = document.getElementById("pais").selectedIndex;
    if( indice == null || indice == 0 ) {
      mostrarError(input,mensaje);
      return false;
    } else{
      eliminarError(input);
      return true;
    }
  }


  // -- VALIDO LOS CAMPOS --------------------

  function validarCampo(campoId,mensaje) {
    const campo = document.getElementById(campoId);
    const value = campo.value;

    if (value === '' || value.length == 0 ){
      mostrarError(campo, mensaje);
      return  false; //? Indicamos que la validacion falló
    } else if ( /^\s+$/.test(value) ){
      mostrarError(campo, 'Caracter invalido');
      return  false; 
    } else{
      eliminarError(campo);
      // console.log(value);
      return true; //? Indicamos que la validacion fue exitosa
    }
  }

//--- VALIDO EL FORM --------------------
  const validarFormulario = () => {
    let validar = true;
    
    //* NOMBRE y APELLIDO
    validar = validarCampo('nombre','Campo obligatorio') && validar;  
    validar = validarCampo('apellido','Campo obligatorio') && validar; 
    //* EMAIL
    validar = validarEmail('email','Correo electronico no válido') && validar; 
    //* FECHA
    validar = validarFecha('fecha','Fecha no valida') && validar;
    validar = validarPais('pais','Opción no válida') && validar;

    return validar;
  }

  //-- SUBMIT DEL FORM ---------------
  formulario.addEventListener('submit',event => {
    event.preventDefault();

    if (!validarFormulario()){
      event.preventDefault();
      console.log("El formulario no es valido");
    }else{
      // event.preventDefault();
      console.log("El formulario es valido");
      formulario.submit();
      alert('Formulario enviado con éxito.');
    }

  })

})