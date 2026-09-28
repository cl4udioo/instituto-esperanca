// =====================================================
// MENU MOBILE
// =====================================================

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        const menuAberto = menu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", menuAberto);

        menuToggle.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );
    });

    // Fecha o menu ao clicar em um link
    const linksMenu = menu.querySelectorAll("a");

    linksMenu.forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        });
    });
}


// =====================================================
// MODO ESCURO
// =====================================================

const btnTema = document.getElementById("btn-tema");

function atualizarBotaoTema() {
    if (!btnTema) return;

    const modoEscuro =
        document.documentElement.getAttribute("data-theme") === "dark";

    btnTema.textContent = modoEscuro
        ? "☀️ Modo claro"
        : "🌙 Modo escuro";

    btnTema.setAttribute(
        "aria-label",
        modoEscuro
            ? "Ativar modo claro"
            : "Ativar modo escuro"
    );
}


// Recupera preferência salva
const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
}

atualizarBotaoTema();


// Alterna o tema
if (btnTema) {
    btnTema.addEventListener("click", () => {
        const modoEscuro =
            document.documentElement.getAttribute("data-theme") === "dark";

        if (modoEscuro) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("tema", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("tema", "dark");
        }

        atualizarBotaoTema();
    });
}


// =====================================================
// PROJETOS
// =====================================================

const listaProjetos = document.getElementById("lista-projetos");

const projetos = [
    {
        titulo: "Campanha de Alimentos",
        descricao:
            "Arrecadação e distribuição de alimentos para famílias em situação de vulnerabilidade.",
        categoria: "Solidariedade"
    },

    {
        titulo: "Apoio Educacional",
        descricao:
            "Ações voltadas ao incentivo à educação e ao desenvolvimento de crianças e jovens.",
        categoria: "Educação"
    },

    {
        titulo: "Ação Comunitária",
        descricao:
            "Atividades e eventos destinados ao fortalecimento da comunidade.",
        categoria: "Comunidade"
    }
];

if (listaProjetos) {

    projetos.forEach((projeto) => {

        const card = document.createElement("article");

        card.classList.add("project-card");

        card.innerHTML = `
            <span class="badge">${projeto.categoria}</span>

            <h3>${projeto.titulo}</h3>

            <p>${projeto.descricao}</p>

            <a
                href="cadastro.html"
                class="button button-secondary">
                Quero participar
            </a>
        `;

        listaProjetos.appendChild(card);
    });
}


// =====================================================
// FORMULÁRIO
// =====================================================

const formulario = document.getElementById("cadastro-form");
const feedback = document.getElementById("form-feedback");

if (formulario) {

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();

        // Verifica se todos os campos obrigatórios
        // estão preenchidos corretamente
        if (!formulario.checkValidity()) {

            formulario.classList.add("was-validated");

            mostrarErros();

            if (feedback) {
                feedback.textContent =
                    "Verifique os campos destacados e tente novamente.";

                feedback.className = "form-feedback error";
            }

            const primeiroInvalido =
                formulario.querySelector(":invalid");

            if (primeiroInvalido) {
                primeiroInvalido.focus();
            }

            return;
        }


        // Obtém os dados do formulário
        const dadosFormulario = new FormData(formulario);

        const cadastro = {
            nome: dadosFormulario.get("nome"),
            email: dadosFormulario.get("email"),
            cpf: dadosFormulario.get("cpf"),
            telefone: dadosFormulario.get("telefone"),
            cep: dadosFormulario.get("cep"),
            estado: dadosFormulario.get("estado"),
            mensagem: dadosFormulario.get("mensagem"),
            termos: dadosFormulario.get("termos") === "on",
            data: new Date().toLocaleString("pt-BR")
        };


        // Recupera cadastros existentes
        const cadastros =
            JSON.parse(localStorage.getItem("cadastros")) || [];


        // Adiciona o novo cadastro
        cadastros.push(cadastro);


        // Salva no localStorage
        localStorage.setItem(
            "cadastros",
            JSON.stringify(cadastros)
        );


        // Mostra mensagem de sucesso
        if (feedback) {

            feedback.textContent =
                "Cadastro realizado com sucesso! Obrigado por participar.";

            feedback.className = "form-feedback success";
        }


        // Limpa o formulário
        formulario.reset();

        formulario.classList.remove("was-validated");

        limparErros();
    });
}


// =====================================================
// VALIDAÇÃO DOS CAMPOS
// =====================================================

function mostrarErros() {

    const campos = [
        {
            id: "nome",
            erro: "erro-nome",
            mensagem: "Informe seu nome completo."
        },

        {
            id: "email",
            erro: "erro-email",
            mensagem: "Informe um e-mail válido."
        },

        {
            id: "cpf",
            erro: "erro-cpf",
            mensagem: "Informe um CPF válido."
        },

        {
            id: "telefone",
            erro: "erro-telefone",
            mensagem: "Informe um telefone válido."
        },

        {
            id: "cep",
            erro: "erro-cep",
            mensagem: "Informe um CEP válido."
        },

        {
            id: "estado",
            erro: "erro-estado",
            mensagem: "Selecione seu estado."
        }
    ];


    campos.forEach((campo) => {

        const elemento = document.getElementById(campo.id);
        const mensagem = document.getElementById(campo.erro);

        if (!elemento || !mensagem) return;


        if (!elemento.checkValidity()) {

            elemento.setAttribute("aria-invalid", "true");

            mensagem.textContent = campo.mensagem;

        } else {

            elemento.setAttribute("aria-invalid", "false");

            mensagem.textContent = "";
        }
    });


    // Validação dos termos
    const termos = document.getElementById("termos");

    if (termos && !termos.checkValidity()) {

        termos.setAttribute("aria-invalid", "true");

    } else if (termos) {

        termos.setAttribute("aria-invalid", "false");
    }
}


// =====================================================
// LIMPAR ERROS
// =====================================================

function limparErros() {

    const mensagens = document.querySelectorAll(".error-message");

    mensagens.forEach((mensagem) => {
        mensagem.textContent = "";
    });


    const campos = document.querySelectorAll(
        "input, select, textarea"
    );

    campos.forEach((campo) => {
        campo.removeAttribute("aria-invalid");
    });
}


// =====================================================
// VALIDAÇÃO EM TEMPO REAL
// =====================================================

if (formulario) {

    const camposFormulario =
        formulario.querySelectorAll(
            "input, select, textarea"
        );


    camposFormulario.forEach((campo) => {

        campo.addEventListener("blur", () => {

            if (!campo.checkValidity()) {

                campo.setAttribute(
                    "aria-invalid",
                    "true"
                );

            } else {

                campo.setAttribute(
                    "aria-invalid",
                    "false"
                );
            }
        });


        campo.addEventListener("input", () => {

            if (campo.checkValidity()) {

                campo.setAttribute(
                    "aria-invalid",
                    "false"
                );

            }
        });
    });
}