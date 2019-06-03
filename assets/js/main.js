jQuery(document).ready(function ($) {

    setTimeout(function () {
        $('body').attr('data-state', 'on');
    }, 10);



    /* swiper */

    var boxValorDoacao = new Swiper('.swiper-container.boxes-doacao', {
        allowTouchMove: false,
        spaceBetween: 25,
        slidesPerView: 4,
        slidesPerGroup: 1,
        breakpoints: {
            1340: {
                allowTouchMove: true,
                grabCursor: true,
                slidesPerView: 2.5,
                slidesPerGroup: 2.5,
                slidesOffsetAfter: 50,
                initialSlide: 4
            },
            755: {
                allowTouchMove: true,
                grabCursor: true,
                slidesPerView: 1.5,
                slidesPerGroup: 1.5,
                slidesOffsetAfter: 50,
                initialSlide: 1
            },
            450: {
                allowTouchMove: true,
                grabCursor: true,
                slidesPerView: 1.25,
                slidesPerGroup: 1.25,
                slidesOffsetAfter: 50,
                initialSlide: 1
            },
            360: {
                allowTouchMove: true,
                grabCursor: true,
                slidesPerView: 1.2,
                slidesPerGroup: 1.2,
                slidesOffsetAfter: 30,
                spaceBetween: 15,
                initialSlide: 1,
            }
        }
    });

    var depoimentos = new Swiper('.depoimentos .swiper-container', {
        allowTouchMove: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true,
        speed: 0,
        navigation: {
            nextEl: '.depoimentos .swiper-button-next',
            prevEl: '.depoimentos .swiper-button-prev',
        },
    });

    var destinoDoacao = new Swiper('.destino-doacao .swiper-container', {
        allowTouchMove: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        direction: 'vertical',
        grabCursor: true,
        spaceBetween: 100,
        navigation: {
            nextEl: '.destino-doacao .swiper-button-next',
            prevEl: '.destino-doacao .swiper-button-prev',
        },
    });




    $('#outro-valor').on('blur', function (e) {
        r = $(this).val();
        if (r == '' || parseInt(r) < 5) {
            $(this).val('5,00');
            $(".outro-valor .box-btn-doar").data("valor", 5);
        } else {
            $(this).val(parseInt(r).toFixed(2).replace('.', ','));
            $(".outro-valor .box-btn-doar").data("valor", parseInt(r).toFixed(2).replace('.', ',').replace(',00', ''));
        }
    });

    $('#outro-valor').on('keyup', function (e) {
        if (e.keyCode == 13) {
            r = $(this).val();
            if (r == '' || parseInt(r) < 5) {
                $(this).val('5,00');
                $(".outro-valor .box-btn-doar").data("valor", 5);
            } else {
                $(this).val(parseInt(r).toFixed(2).replace('.', ','));
                $(".outro-valor .box-btn-doar").data("valor", parseInt(r).toFixed(2).replace('.', ',').replace(',00', ''));
            }

            $("#box-outro-valor").submit();
        }
    });

    $(".box:not(.outro-valor) .box-btn-doar").click(function () {
        $("#valor-doacao").val($(this).data("valor")).trigger('change');
    });

    $("#valor-doacao").change(function () {
        $(".valor-escolhido").html($(this).val() + '<span>,00</span>');
        $(".valor-escolhido").removeClass("xlarge-number");
        $(".valor-escolhido").removeClass("large-number");

        if ($(this).val() >= 160) {
            $(".valor-escolhido").addClass("large-number");
        }
        if ($(this).val() > 999) {
            $(".valor-escolhido").addClass("xlarge-number");
        }
    });

    var etapa2Frequencia = false;
    var etapa2Pagamento = false;

    $('input[type=radio][name=frequencia]').change(function () {
        etapa2Frequencia = true;
        if (this.value == 'pontual') {
            $(".mensal").hide();
            $("label[for='boleto']").removeClass("disabled");
            concluirEtapa2();
        } else if (this.value == 'mensal') {
            $(".mensal").show();
            $("label[for='boleto']").addClass("disabled");
            $("label[for='cartao']").trigger("click");
        }
    });

    $('input[type=radio][name=pagamento]').change(function () {
        //        if (this.value == 'boleto') {
        //            alert("Allot Thai Gayo Bhai");
        //        } else if (this.value == 'cartao') {
        //            alert("Transfer Thai Gayo");
        //        }
        etapa2Pagamento = true;
        concluirEtapa2();
    });

    $('input[type=radio][name=frequencia]').click(function () {
        if (etapa2Frequencia == true) {
            concluirEtapa2();
        }
    });

    $('input[type=radio][name=pagamento]').click(function () {
        if (etapa2Pagamento == true) {
            concluirEtapa2();
        }
    });


    $(".editar-dados").click(function () {
        if ($(".etapa-2").is(":visible")) {
            $(".etapa-2").hide();
            $(".etapa-1").show();
            $(".editar-dados").hide();
        } else if ($(".etapa-3").is(":visible")) {
            $(".etapa-3").hide();
            $(".etapa-2").show();
        }
    });


    function concluirEtapa1() {
        $(".etapa-1").hide();
        $(".etapa-2").show();
        $(".editar-dados").show();
    }


    function concluirEtapa2() {
        clearTimeout(a);
        a = setTimeout(function () {
            if (etapa2Frequencia && etapa2Pagamento) {
                //ok
                $(".etapa-2 .right").hide();
                if ($('input[type=radio][name=pagamento]:checked').val() == "cartao") {
                    $(".etapa-2 .right.pagamento-cartao").show();
                } else {
                    $(".etapa-2 .right.pagamento-boleto").show();
                }
            }
        }, 500);
    }



    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#uf").val("");
        $("#cidade").val("");
        $("#bairro").val("");
        $("#rua").val("");
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function () {
        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');
        //Verifica se campo cep possui valor informado.
        if (cep != "") {
            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;
            //Valida o formato do CEP.
            if (validacep.test(cep)) {
                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
                    if (!("erro" in dados)) {
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        $("#cep").tooltipster('content', "CEP não encontrado");
                        $("#cep").tooltipster('open');
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                $(this).tooltipster('content', "CEP inválido");
                $(this).tooltipster('open');
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });

    $("#cep").focus(function () {
        $(this).tooltipster('close');
    });

    $(".campo select").click(function () {
        $(this).toggleClass("active");
    });

    $(".campo select").blur(function () {
        $(this).removeClass("active");
    });




    /* mascara e validação */

    $('#outro-valor').mask('000000000000000,00', {
        reverse: true
    });

    $('#cep').mask('00000-000', {
        reverse: true
    });

    $('#cpf').mask('000.000.000-00', {
        reverse: true
    });

    $('#uf').mask('SS', {
        reverse: false
    });

    $('#numero').mask('0#', {
        reverse: false
    });

    $('#codigo-cartao').mask('0000', {
        reverse: false
    });

    $('#numero-cartao').mask('0000 0000 0000 0000', {
        reverse: false
    });

    $('#nascimento').mask('00/00/0000');

    $('#nome, #cidade, #bairro, #nome-cartao').mask('Z', {
        translation: {
            'Z': {
                pattern: /[A-zÀ-ú' ]/,
                recursive: true
            }
        }
    });

    var SPMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        spOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };
    $('#telefone').mask(SPMaskBehavior, spOptions);




    $("#box-outro-valor input").tooltipster({
        animation: 'fade',
        updateAnimation: 'null',
        trigger: 'custom',
        position: 'bottom'
    });

    $("#form-etapa-1 input").tooltipster({
        animation: 'fade',
        updateAnimation: 'null',
        trigger: 'custom',
        position: 'bottom'
    });

    $("#form-etapa-2 input").tooltipster({
        animation: 'fade',
        updateAnimation: 'null',
        trigger: 'custom',
        position: 'bottom'
    });


    $("#box-outro-valor").validate({
        errorPlacement: function (error, element) {
            element.addClass("formError");
            var ele = element,
                err = error.text();
            if (err != null && err !== '') {
                ele.tooltipster('content', err);
                ele.tooltipster('open');
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("formError").removeClass(errorClass).addClass(validClass).tooltipster('close');
        },
        submitHandler: function (form) {
            $("#valor-doacao").val($(".box.outro-valor .box-btn-doar").data("valor")).trigger('change');
            $(".valor-escolhido").html($("#valor-doacao").val() + '<span>,00</span>');
        }
    });


    $("#form-etapa-1").validate({
        rules: {
            cpf: {
                required: true,
                cpf: true,
                minlength: 11
            },
            nome: {
                required: true,
                nomeCompleto: true,
                minlength: 2
            },
            email: {
                required: true,
                minlength: 2,
                email: true,
            },
            telefone: {
                required: true,
                minlength: 14
            },
            nascimento: {
                required: true,
                dtNascimento: true,
                maiorIdade: true,
                minlength: 7
            },
        },
        messages: {
            cpf: {
                minlength: "CPF inválido",
            },
            nome: {
                minlength: "Nome inválido",
            },
            email: {
                minlength: "Email inválido",
            },
            telefone: {
                minlength: "Telefone inválido",
            },
            nascimento: {
                minlength: "Data inválida",
            },
        },
        errorPlacement: function (error, element) {
            element.addClass("formError");
            var ele = element,
                err = error.text();
            if (err != null && err !== '') {
                ele.tooltipster('content', err);
                ele.tooltipster('open');
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("formError").removeClass(errorClass).addClass(validClass).tooltipster('close');
        },
        submitHandler: function (form) {
            concluirEtapa1();
        }
    });

    $("#form-etapa-2").validate({
        rules: {
            nome_cartao: {
                required: true,
                nomeCompleto: true,
                minlength: 2
            },
            numero_cartao: {
                required: true,
                minlength: 17,
                maxlength: 19,
                cartaoCredito: true,
            },
            mes_cartao: {
                required: true,
            },
            ano_cartao: {
                required: true,
            },
        },
        messages: {
            nome_cartao: {
                nomeCompleto: "Insira o nome impresso no cartão",
                minlength: "Insira o nome impresso no cartão",
            },
            numero_cartao: {
                minlength: "Cartão inválido",
                maxlength: "Cartão inválido",
            },
        },
        errorPlacement: function (error, element) {
            element.addClass("formError");
            var ele = element,
                err = error.text();
            if (err != null && err !== '') {
                ele.tooltipster('content', err);
                ele.tooltipster('open');
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("formError").removeClass(errorClass).addClass(validClass).tooltipster('close');
        },
        submitHandler: function (form) {
            concluirEtapa2();
        }
    });


    $("#numero-cartao").keyup(function () {
        var cartao = creditCardTypeFromNumber($(this).val());

        $(".card").css("opacity", "0.3");
        $(".card." + cartao).css("opacity", "1");
    });

    function creditCardTypeFromNumber(num) {
        // Sanitise number
        num = num.replace(/[^\d]/g, '');

        var regexps = {
            'elo': /(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369|(6503[1-3])|(6500(3[5-9]|4[0-9]|5[0-1]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(650(48[5-9]|49[0-9]|50[0-9]|51[1-9]|52[0-9]|53[0-7]))|(6505(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(6507(2[0-7]))|(650(90[1-9]|91[0-9]|920))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[1-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8]))|(506(699|77[0-8]|7[1-6][0-9))|(509([0-9][0-9][0-9])))/,
            'mastercard': /^5[1-5][0-9]{14}/,
            'visa': /^4[0-9]{12}(?:[0-9]{3})/,
            'amex': /^3[47][0-9]{13}/,
            'diners': /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
        };

        for (var card in regexps) {
            if (num.match(regexps[card])) {
                return card;
            }
        }
    }

    // ROLAGEM DE PAGINA SUAVE
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            event.stopPropagation();
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        // $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            // return false;
                        } else {
                            //  $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            // $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
    //FIM - ROLAGEM DE PAGINA SUAVE


});
