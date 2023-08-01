//Laves de encriptacion
// `La letra "e" es convertida para "enter"`
// `La letra "i" es convertida para "imes"`
// `La letra "a" es convertida para "ai"`
// `La letra "o" es convertida para "ober"`
// `La letra "u" es convertida para "ufat"`
let matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const copia = document.querySelector(".copiar");
const nocontent = document.querySelector(".nocontent");

function validarTexto() {
    let textoEscrito = textArea.value;
    let validador = textoEscrito.match(/^[a-z\s]*$/i);
    if (!validador || validador === 0) {
        alert("Solo se permiten letras minúsculas y sin acentos")
        location.reload();
        return true;
    }
}

function procesarTexto(encriptar) {
    if (!validarTexto()) {
        let texto = textArea.value.toLowerCase();
        let resultado = "";

        for (let i = 0; i < matrizCodigo.length; i++) {
            const codigoActual = encriptar ? matrizCodigo[i][0] : matrizCodigo[i][1];
            const reemplazo = encriptar ? matrizCodigo[i][1] : matrizCodigo[i][0];

            if (texto.includes(codigoActual)) {
                texto = texto.replaceAll(codigoActual, reemplazo);
            }
        }
        mensaje.value = texto;
        mensaje.style.display = "block";
        nocontent.style.display = "none";
        textArea.value = "";
        copia.style.display = "block";
    }
}

function btnEncriptar() {
    procesarTexto(true);
}

function btnDesencriptar() {
    procesarTexto(false);
}

function copiar() {
    mensaje.select();
    document.execCommand("copy");
    mensaje.value = "";
    mensaje.style.height = "auto"
    alert("Texto copiado con éxito");
}


// Ajuste de rows según tamaño de pantalla
function updateTextareaRows() {
    var windowWidth = window.innerWidth;
    var textareas = $('.text-area');

    textareas.each(function () {
        var textarea = $(this);
        textarea.attr('rows', windowWidth < 1024 ? 'auto' : '10');
    });
}

updateTextareaRows();
$(window).on('resize', updateTextareaRows);

// auto ajustar el textarea input
function autoAjustarTextarea(textareas) {
    textareas.each(function () {
        var textarea = $(this);

        if (!textarea.hasClass('autoHeightDone')) {
            textarea.addClass('autoHeightDone');

            var extraHeight = parseInt(textarea.css('padding-top')) + parseInt(textarea.css('padding-bottom')),
                h = textarea[0].scrollHeight - extraHeight;

            textarea.height('auto').height(h);

            textarea.on('input', function () {
                textarea.removeAttr('style');
                h = textarea.get(0).scrollHeight - extraHeight;
                textarea.height(h + 'px');
            });
        }
    });
}

function checkAndAdjustTextarea() {
    $(window).width() < 1024 ? autoAjustarTextarea($('.text-area')) : $('.text-area').removeClass('autoHeightDone').height('auto');
}
function ajustarTamano() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 1024) {
        mensaje.style.height = 'auto';
        mensaje.style.height = mensaje.scrollHeight + 'px';
    }
}


// Volver al height original luego de encriptar / desencriptar 
function restaurarAlturaOriginal() {
    var textareas = $('.text-area');

    textareas.each(function () {
        var textarea = $(this);
        var originalHeight = textarea.data('original-height');
        if (originalHeight !== undefined) {
            textarea.height(originalHeight);
        }
    });
}
$(function () {
    checkAndAdjustTextarea(); 
    $(window).on('resize', function () {
        checkAndAdjustTextarea();
    });
    $('.text-area').each(function () {
        var textarea = $(this);
        var originalHeight = textarea.height();
        textarea.data('original-height', originalHeight);
    });

    $('.btn').on('click', function () {
        restaurarAlturaOriginal();
    });
});
