(function () {
    "use strict";

    var regalo = document.getElementById("regalos");

    document.addEventListener("DOMContentLoaded", function () {

        if (document.getElementById('mapa')) {
            var map = L.map('mapa').setView([-34.900411, -56.18391], 17);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([-34.900411, -56.18391]).addTo(map)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup()
                .bindTooltip("Un Tooltip")
                .openTooltip();
        }
        //Campo datos usuarios
        var nombre = document.getElementById("nombre"),
            apellido = document.getElementById("apellido"),
            email = document.getElementById("email");
        //CAMPOS PASES
        var pase_dia = document.getElementById("pase_dia"),
            pase_dosdia = document.getElementById("pase_dosdia"),
            pase_completo = document.getElementById("pase_completo");
        //botones y divs
        var calcular = document.getElementById("btnpagar"),
            errorDiv = document.getElementById("error"),
            botonregistro = document.getElementById("botonregistro"),
            lista_productos = document.getElementById("lista-productos"),
            suma = document.getElementById("suma-total")
        //EXTRAS
        var camisas = document.getElementById("camisa_evento");
        var etiquetas = document.getElementById("etiquetas");

        //botonregistro.disable = true; //-
        calcular.addEventListener("click", calcularMontos);

        pase_dia.addEventListener("blur", mostrarDias);
        pase_dosdia.addEventListener("blur", mostrarDias);
        pase_completo.addEventListener("blur", mostrarDias);

        nombre.addEventListener("blur", validarCampos);
        apellido.addEventListener("blur", validarCampos);
        email.addEventListener("blur", validarCampos);
        email.addEventListener("blur", validarEmail);

        function validarCampos() {
            if (this.value == "") {
                errorDiv.style.display = ("block");
                errorDiv.innerHTML = ("Este campo es obligatorio");
                this.style.border = ("1px solid red");
                errorDiv.style.border = ("1px solid red")
            } else {
                errorDiv.style.display = "none"
                this.style.border = ("2px solid #ccc")

            }
        }

        function validarEmail() {
            if (this.value.indexOf("@") > -1) {
                this.style.border = "1px solid #ccc";
            } else {
                errorDiv.style.display = ("block");
                errorDiv.innerHTML = ("Debe tener el caracter especial ¨@¨");
                this.style.border = ("1px solid red");
                errorDiv.style.border = ("1px solid red")

            }
        }

        function calcularMontos(event) {
            event.preventDefault();
            if (regalo.value === "") {
                alert("Debes elegir un regalo")
                regalo.focus();
                console.log("has hecho click");

            } else {
                console.log("Ya has elegido el regalo");
                var boletosDias = parseInt(pase_dia.value, 10) || 0,
                    boletos2Dias = parseInt(pase_dosdia.value, 10) || 0,
                    boletoCompleto = parseInt(pase_completo.value, 10) || 0,
                    cantCamisas = parseInt(camisas.value, 10) || 0,
                    cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

                var totalPagar = (boletosDias * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
                console.log("El total a pagar es: " + totalPagar);
                var listadoProductos = [];

                if (boletosDias >= 1) {
                    listadoProductos.push(boletosDias + " Pases por día");
                }
                if (boletos2Dias >= 1) {
                    listadoProductos.push(boletos2Dias + " Pases por 2 días");
                }
                if (boletoCompleto >= 1) {
                    listadoProductos.push(boletoCompleto + " Pases Completo");
                }
                if (cantCamisas >= 1) {
                    listadoProductos.push(cantCamisas + " Camisas");
                }
                if (cantEtiquetas >= 1) {
                    listadoProductos.push(cantEtiquetas + " Etiquetas");
                }
                console.log(listadoProductos);

                lista_productos.style.display = "block"
                lista_productos.innerHTML = "";
                for (var i = 0; i < listadoProductos.length; i++) {
                    lista_productos.innerHTML += listadoProductos[i] + "<br/>";
                }
                suma.innerHTML = "$ " + totalPagar.toFixed(2);
                botonregistro.disable = false; //-
             
                document.getElementById("total_pedido").value = totalPagar;
             

                
                
            }
        }

        function mostrarDias() {
            var boletosDias = parseInt(pase_dia.value, 10) || 0,
                boletos2Dias = parseInt(pase_dosdia.value, 10) || 0,
                boletoCompleto = parseInt(pase_completo.value, 10) || 0;

            var diasElegidos = [];
            if (boletosDias > 0) {
                diasElegidos.push("viernes");
            }
            if (boletos2Dias > 0) {
                diasElegidos.push("viernes", "sabado");
            }
            if (boletoCompleto > 0) {
                diasElegidos.push("viernes", "sabado", "domingo");
            }
            for (var i = 0; i < diasElegidos.length; i++) {
                document.getElementById(diasElegidos[i]).style.display = "block";
            }
        }
        //AGREGADO DE UNA PREGUNTA DE UDEMY
        var url = window.location.pathname;
        var filename = url.substring(url.lastIndexOf('/') + 1);

        if (filename == "registro.php") {
            botonregistro.disabled = true;

        }
    });
})();
$(function () {
    //LETTERING
    $(".nombre-sitio").lettering();
    //AGREGAR CLASE A MENU
    $(`body.conferencia .navegacion-principal a:contains("Conferencia")`).addClass("activo");
    $(`body.calendario .navegacion-principal a:contains("Calendario")`).addClass("activo");
    $(`body.invitados .navegacion-principal a:contains("Invitados")`).addClass("activo");

    //MENU FIJO
    var alturaventana = $(window).height();
    var barraAltura = $(".barra").innerHeight();
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > alturaventana) {
            $(".barra").addClass("fixed");
            $("body").css({
                "margin-top": barraAltura + "px"
            });
        } else {
            $(".barra").removeClass("fixed");
            $("body").css({
                "margin-top": "0px"
            });
        }

    });
    //MENU RESPONSIVE
    $(".menu-movil").on("click", function () {
        $(".navegacion-principal").slideToggle();
    });
    // PROGRAMA DE CONFERENCIA
    $(".programa-evento .info-curso:first").show();
    $(".menu-programa a:first").addClass("activo");

    $(".menu-programa a").on("click", function () {
        $(".menu-programa a").removeClass("activo");
        $(this).addClass("activo");
        $(".ocultar").hide();
        var enlace = $(this).attr("href");
        $(enlace).fadeIn(1000);
        return false;

    });

    //ANIMACIONES PARA LOS NUMEROS
    $(".resumen-evento li:nth-child(1) p").animateNumber({
        number: 6
    }, 1200);
    $(".resumen-evento li:nth-child(2) p").animateNumber({
        number: 15
    }, 1200);
    (function () {
        "use strict";

        var regalo = document.getElementById("regalos");

        document.addEventListener("DOMContentLoaded", function () {

            var map = L.map('mapa').setView([-34.900411, -56.18391], 17);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([-34.900411, -56.18391]).addTo(map)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup()
                .bindTooltip("Un Tooltip")
                .openTooltip();
            //Campo datos usuarios
            var nombre = document.getElementById("nombre"),
                apellido = document.getElementById("apellido"),
                email = document.getElementById("email");
            //Campo pases
            var pase_dia = document.getElementById("pase_dia"),
                pase_dosdia = document.getElementById("pase_dosdia"),
                pase_completo = document.getElementById("pase_completo");
            //botones y divs
            var calcular = document.getElementById("btnpagar"),
                errorDiv = document.getElementById("error"),
                botonregistro = document.getElementById("botonregistro"),
                lista_productos = document.getElementById("lista-productos"),
                suma = document.getElementById("suma-total")
            //EXTRAS
            var camisas = document.getElementById("camisa_evento");
            var etiquetas = document.getElementById("etiquetas");

            calcular.addEventListener("click", calcularMontos);

            pase_dia.addEventListener("blur", mostrarDias);
            pase_dosdia.addEventListener("blur", mostrarDias);
            pase_completo.addEventListener("blur", mostrarDias);

            nombre.addEventListener("blur", validarCampos);
            apellido.addEventListener("blur", validarCampos);
            email.addEventListener("blur", validarCampos);
            email.addEventListener("blur", validarEmail);

            function validarCampos() {
                if (this.value == "") {
                    errorDiv.style.display = ("block");
                    errorDiv.innerHTML = ("Este campo es obligatorio");
                    this.style.border = ("1px solid red");
                    errorDiv.style.border = ("1px solid red")
                } else {
                    errorDiv.style.display = "none"
                    this.style.border = ("2px solid #ccc")

                }
            }

            function validarEmail() {
                if (this.value.indexOf("@") > -1) {
                    this.style.border = "1px solid #ccc";
                } else {
                    errorDiv.style.display = ("block");
                    errorDiv.innerHTML = ("Debe tener el caracter especial ¨@¨");
                    this.style.border = ("1px solid red");
                    errorDiv.style.border = ("1px solid red")

                }
            }

            function calcularMontos(event) {
                event.preventDefault();
                if (regalo.value === "") {
                    alert("Debes elegir un regalo")
                    regalo.focus();

                } else {
                    console.log("Ya has elegido el regalo");
                    var boletosDias = parseInt(pase_dia.value, 10) || 0,
                        boletos2Dias = parseInt(pase_dosdia.value, 10) || 0,
                        boletoCompleto = parseInt(pase_completo.value, 10) || 0,
                        cantCamisas = parseInt(camisas.value, 10) || 0,
                        cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

                    var totalPagar = (boletosDias * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
                    console.log("El total a pagar es: " + totalPagar);
                    var listadoProductos = [];

                    if (boletosDias >= 1) {
                        listadoProductos.push(boletosDias + " Pases por día");
                    }
                    if (boletos2Dias >= 1) {
                        listadoProductos.push(boletos2Dias + " Pases por 2 días");
                    }
                    if (boletoCompleto >= 1) {
                        listadoProductos.push(boletoCompleto + " Pases Completo");
                    }
                    if (cantCamisas >= 1) {
                        listadoProductos.push(cantCamisas + " Camisas");
                    }
                    if (cantEtiquetas >= 1) {
                        listadoProductos.push(cantEtiquetas + " Etiquetas");
                    }
                    console.log(listadoProductos);

                    lista_productos.style.display = "block"
                    lista_productos.innerHTML = "";
                    for (var i = 0; i < listadoProductos.length; i++) {
                        lista_productos.innerHTML += listadoProductos[i] + "<br/>";
                    }
                    suma.innerHTML = "$ " + totalPagar.toFixed(2);
                }
            }

            function mostrarDias() {
                var boletosDias = parseInt(pase_dia.value, 10) || 0,
                    boletos2Dias = parseInt(pase_dosdia.value, 10) || 0,
                    boletoCompleto = parseInt(pase_completo.value, 10) || 0;

                var diasElegidos = [];
                if (boletosDias > 0) {
                    diasElegidos.push("viernes");
                }
                if (boletos2Dias > 0) {
                    diasElegidos.push("viernes", "sabado");
                }
                if (boletoCompleto > 0) {
                    diasElegidos.push("viernes", "sabado", "domingo");
                }
                for (var i = 0; i < diasElegidos.length; i++) {
                    document.getElementById(diasElegidos[i]).style.display = "block";
                }
            }

        });
    })();
    $(function () {
        // PROGRAMA DE CONFERENCIA
        $(".programa-evento .info-curso:first").show();
        $(".menu-programa a:first").addClass("activo");

        $(".menu-programa a").on("click", function () {
            $(".menu-programa a").removeClass("activo");
            $(this).addClass("activo");
            $(".ocultar").hide();
            var enlace = $(this).attr("href");
            $(enlace).fadeIn(1000);
            return false;

        });

        //ANIMACIONES PARA LOS NUMEROS
        $(".resumen-evento li:nth-child(1) p").animateNumber({
            number: 6
        }, 1200);
        $(".resumen-evento li:nth-child(2) p").animateNumber({
            number: 15
        }, 1200);
        $(".resumen-evento li:nth-child(3) p").animateNumber({
            number: 3
        }, 1200);
        $(".resumen-evento li:nth-child(4) p").animateNumber({
            number: 9
        }, 1200);


        //CUENTA REGRESIVA
        $('.cuenta-regresiva').countdown('2021/01/01 09:11:00', function (event) {
            $('#dias').html(event.strftime('%D'));
            $('#horas').html(event.strftime('%H'));
            $('#minutos').html(event.strftime('%M'));
            $('#segundos').html(event.strftime('%S'));

        });


    });
    //colorbox
    $(".invitado-info").colorbox({
        inline: true,
        width: "50%"
    });

});