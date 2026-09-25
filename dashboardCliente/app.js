let cortesAgendados = []

function limpar() {
    let agendamentos = document.querySelector("#container-agendamentos")
    agendamentos.innerHTML = ""
}

function carregarCortes() {
    limpar()

    if (cortesAgendados.length === 0) {
        return
    }

    cortesAgendados.map((corteAgendado) => {
    if (corteAgendado.status !== "Feito") {
        let agendamentos = document.querySelector("#container-agendamentos")
        agendamentos.innerHTML += `
        <div class="appointment-row">

                    <div class="appointment-service-icon">
                        ✂
                    </div>

                    <div class="appointment-row-info">

                        <strong>
                            ${corteAgendado.corte}
                        </strong>

                        <span>
                            ${corteAgendado.data} • ${corteAgendado.hora}
                        </span>

                    </div>
                    
                    <div class="agendamento-acoes">

                        <button class="btn-editar-agendamento" onclick="abrirModalEdit(${corteAgendado.id})">
                            Editar
                        </button>

                        <button onclick="confirmarExclusao(${corteAgendado.id})" class="btn-excluir-agendamento">
                            Excluir
                        </button>

                    </div>

                    <span class="status pending">
                        ${corteAgendado.status}
                    </span>

                    <strong>
                        R$ ${corteAgendado.preco}
                    </strong>

                </div>
                `}


})
} 

function abrirModalAdd() {
    body = document.querySelector("body")
    body.innerHTML += `
    <div class="modal-overlay" id="modal">

    <div class="modal">

        <div class="modal-header">

            <div>
                <span class="modal-label">BARBERFLOW</span>

                <h2>Novo agendamento</h2>

                <p>
                    Escolha o horário e os serviços.
                </p>
            </div>

            <button
                class="modal-fechar"
                onclick="fecharModal()"
            >
                ×
            </button>

        </div>


        <div class="modal-body">

            <!-- DATA E HORA -->

            <div class="modal-section">

                <span class="section-label">
                    Escolha quando
                </span>

                <div class="data-hora">

                    <div class="campo-box">

                        <label for="data">
                            Data
                        </label>

                        <input
                            type="date"
                            id="data"
                        >

                    </div>


                    <div class="campo-box">

                        <label for="hora">
                            Horário
                        </label>

                        <input
                            type="time"
                            id="hora"
                        >

                    </div>

                </div>

            </div>


            <!-- SERVIÇOS -->

            <div class="modal-section">

                <span class="section-label">
                    Serviços
                </span>


                <div class="campo-box">

                    <label for="corte">
                        Corte de cabelo
                    </label>

                    <select id="corte">

                        <option value="0">
                            Selecione o corte
                        </option>

                        <option value="Degradê" preco="30">
                            Degradê — R$ 30
                        </option>

                        <option value="Social" preco="25">
                            Social — R$ 25
                        </option>

                        <option value="Americano" preco="10">
                            Americano — R$ 10
                        </option>

                        <option value="Buzz cut" preco="25">
                            Buzz Cut — R$ 25
                        </option>

                    </select>

                </div>


                <div class="campo-box">

                    <label for="barba">
                        Barba
                    </label>

                    <select id="barba">

                        <option value="0">
                            Sem barba
                        </option>

                        <option value="Barba tradicional" preco="20">
                            Barba tradicional — R$ 20
                        </option>

                        <option value="Bigode" preco="15">
                            Bigode — R$ 15
                        </option>

                    </select>

                </div>

            </div>


            <!-- ADICIONAIS -->

            <div class="modal-section">

                <span class="section-label">
                    Adicionais
                </span>


                <label class="opcao-extra">

                    <input
                        type="checkbox"
                        id="navalhado"
                        value="5"
                    >

                    <div>
                        <strong>Navalhado</strong>

                        <span>
                            Acabamento com navalha
                        </span>
                    </div>

                    <b>
                        + R$ 5
                    </b>

                </label>


                <label class="opcao-extra">

                    <input
                        type="checkbox"
                        id="lavadoHidratado"
                        value="10"
                    >

                    <div>
                        <strong>
                            Lavado + hidratado
                        </strong>

                        <span>
                            Lavagem e hidratação
                        </span>
                    </div>

                    <b>
                        + R$ 10
                    </b>

                </label>

            </div>


            <!-- TOTAL -->

            <div class="total-box">

                <div>
                    <span>Total</span>

                    <small>
                        Valor do agendamento
                    </small>
                </div>

                <strong id="valorTotal">
                    R$ 0,00
                </strong>

            </div>

        </div>


        <div class="modal-footer">

            <button
                class="btn-cancelar"
                onclick="fecharModal()"
            >
                Cancelar
            </button>

            <button
                class="btn-salvar"
                onclick="cadastrarAgendamento()"
            >
                Confirmar agendamento
            </button>

        </div>

    </div>

</div>`

let corte = document.querySelector("#corte")
let barba = document.querySelector("#barba")
let navalhado = document.querySelector("#navalhado")
let lavadoHidratado = document.querySelector("#lavadoHidratado")

corte.addEventListener("change", calcularPreco)
barba.addEventListener("change", calcularPreco)
navalhado.addEventListener("change", calcularPreco)
lavadoHidratado.addEventListener("change", calcularPreco)
}

function cadastrarAgendamento() {
    let corte  = document.querySelector("#corte").value
    let barba  = document.querySelector("#barba").value
    let navalhado  = document.querySelector("#navalhado").value
    let lavadoHidratado  = document.querySelector("#lavadoHidratado").value
    let data = document.querySelector("#data").value
    let hora = document.querySelector("#hora").value

    let precoFinal = calcularPreco()

    if(validarAgendamentoAdd() === false) {
        return
    }

    let novoCorteAgendado = {
        id: cortesAgendados.length + 1,
        hora: hora,
        data: data,
        status: "Pendente",
        corte: corte,
        barba: barba,
        navalhado: navalhado,
        lavado: lavadoHidratado,
        preco: precoFinal,
    }

    cortesAgendados.push(novoCorteAgendado)
    console.log(novoCorteAgendado);
    
    fecharModal()
    limpar()
    carregarCortes()
    sucessoAdd()
}

function calcularPreco() {
    let corte = document.querySelector("#corte")
    let barba = document.querySelector("#barba")
    let navalhado = document.querySelector("#navalhado")
    let lavado = document.querySelector("#lavadoHidratado")

    let precoCorte = Number(corte.options[corte.selectedIndex].getAttribute("preco"))
    let precoBarba = Number(barba.options[barba.selectedIndex].getAttribute("preco"))

    let precoFinal = precoCorte + precoBarba + (navalhado.checked ? Number(navalhado.value) : 0) + (lavado.checked ? Number(lavado.value) : 0)
    document.querySelector("#valorTotal").innerText = `R$ ${precoFinal},00`

    return precoFinal
}

function fecharModal() {
    let modal = document.querySelector("#modal")
    let body = document.querySelector("body")
    body.removeChild(modal)
}

function abrirModalEdit(id) {
    let agendamento = cortesAgendados.find((agendamento) => agendamento.id === id)
    let body = document.querySelector("body")

    body.innerHTML += `<!-- MODAL -->
<div class="modal-overlay" id="modal">

    <div class="modal">

        <!-- HEADER -->
        <div class="modal-header">

            <div>
                <span class="modal-label">BARBERFLOW</span>

                <h2>Editar agendamento</h2>

                <p>
                    Altere o horário e os serviços.
                </p>
            </div>

            <button
                type="button"
                class="modal-fechar"
                onclick="fecharModal()"
            >
                ×
            </button>
        </div>


        <!-- CONTEÚDO -->
        <div class="modal-body">

            <!-- DATA E HORA -->
            <div class="modal-section">

                <span class="section-label">
                    Escolha quando
                </span>

                <div class="data-hora">

                    <div class="campo-box">

                        <label for="editar-data">
                            Data
                        </label>

                        <input
                            type="date"
                            id="editar-data"
                        >

                    </div>


                    <div class="campo-box">

                        <label for="editar-hora">
                            Horário
                        </label>

                        <input
                            type="time"
                            id="editar-hora"
                        >

                    </div>

                </div>

            </div>


            <!-- SERVIÇOS -->
            <div class="modal-section">

                <span class="section-label">
                    Serviços
                </span>


                <div class="campo-box">

                    <label for="editar-corte">
                        Corte de cabelo
                    </label>

                    <select id="editar-corte">

                        <option value="0">
                            Selecione o corte
                        </option>

                        <option value="Degradê" preco="30">
                            Degradê — R$ 30
                        </option>

                        <option value="Social" preco="25">
                            Social — R$ 25
                        </option>

                        <option value="Americano" preco="10">
                            Americano — R$ 10
                        </option>

                        <option value="Buzz cut" preco="25">
                            Buzz Cut — R$ 25
                        </option>

                    </select>

                </div>


                <div class="campo-box">

                    <label for="editar-barba">
                        Barba
                    </label>

                    <select id="editar-barba">

                        <option value="0">
                            Sem barba
                        </option>

                        <option value="Barba tradicional" preco="20">
                            Barba tradicional — R$ 20,00
                        </option>

                        <option value="Bigode" preco="15">
                            Bigode — R$ 15,00
                        </option>

                    </select>

                </div>

            </div>


            <!-- ADICIONAIS -->
            <div class="modal-section">

                <span class="section-label">
                    Adicionais
                </span>


                <label class="opcao-extra">

                    <input
                        type="checkbox"
                        id="editar-navalhado"
                        value="5"
                    >

                    <div>

                        <strong>
                            Navalhado
                        </strong>

                        <span>
                            Acabamento com navalha
                        </span>

                    </div>

                    <b>
                        + R$ 5
                    </b>

                </label>


                <label class="opcao-extra">

                    <input
                        type="checkbox"
                        id="editar-lavadoHidratado"
                        value="10"
                    >

                    <div>

                        <strong>
                            Lavado + hidratado
                        </strong>

                        <span>
                            Lavagem e hidratação
                        </span>

                    </div>

                    <b>
                        + R$ 10
                    </b>

                </label>

            </div>


            <!-- TOTAL -->
            <div class="total-box">

                <div>

                    <span>
                        Total
                    </span>

                    <small>
                        Valor do agendamento
                    </small>

                </div>

                <strong id="editar-valorTotal">
                    R$ 0,00
                </strong>

            </div>

        </div>


        <!-- FOOTER -->
        <div class="modal-footer">

            <button
                type="button"
                class="btn-cancelar"
                onclick="fecharModal()"
            >
                Cancelar
            </button>

            <button
                type="button"
                class="btn-salvar"
                onclick="editarAgendamento(${id})"
            >
                Salvar alterações
            </button>

        </div>

    </div>

</div>`

    document.querySelector("#editar-corte").value = agendamento.corte
    document.querySelector("#editar-barba").value = agendamento.barba
    document.querySelector("#editar-data").value = agendamento.data
    document.querySelector("#editar-hora").value = agendamento.hora

    let corte = document.querySelector("#editar-corte")
    let barba = document.querySelector("#editar-barba")
    let navalhado = document.querySelector("#editar-navalhado")
    let lavadoHidratado = document.querySelector("#editar-lavadoHidratado")
    document.querySelector("#editar-valorTotal").innerText = `R$ ${agendamento.preco},00`

    corte.addEventListener("change", calcularPrecoEdicao)
    barba.addEventListener("change", calcularPrecoEdicao)
    navalhado.addEventListener("change", calcularPrecoEdicao)
    lavadoHidratado.addEventListener("change", calcularPrecoEdicao)
}

function editarAgendamento(id) {
    let index = cortesAgendados.findIndex((produto) => produto.id === id)
    let corte  = document.querySelector("#editar-corte").value
    let barba  = document.querySelector("#editar-barba").value
    let navalhado  = document.querySelector("#editar-navalhado").value
    let lavadoHidratado  = document.querySelector("#editar-lavadoHidratado").value
    let data = document.querySelector("#editar-data").value
    let hora = document.querySelector("#editar-hora").value
    let precoFinal = calcularPrecoEdicao()

    if(validarAgendamentoEdit() === false) {
        return
    }

    cortesAgendados[index] = {
    id: index,
    hora: hora,
    data: data,
    status: "Pendente",
    corte: corte,
    barba: barba,
    navalhado: navalhado,
    lavadoHidratado: lavadoHidratado,
    preco: precoFinal,
    }
    
    fecharModal()
    limpar()
    carregarCortes()
    sucessoEdit()
}


function excluir(id) {
    let index = cortesAgendados.findIndex((produto) => produto.id === id )
    cortesAgendados.splice(index, 1)
    document.querySelector("#confirmacao").remove()

    carregarCortes()
    sucessoExclusao()
}

function calcularPrecoEdicao() {
    let corte = document.querySelector("#editar-corte")
    let barba = document.querySelector("#editar-barba")
    let navalhado = document.querySelector("#editar-navalhado")
    let lavadoHidratado = document.querySelector("#editar-lavadoHidratado")

    let precoCorte = Number(corte.options[corte.selectedIndex].getAttribute("preco"))
    let precoBarba = Number(barba.options[barba.selectedIndex].getAttribute("preco"))

    let precoFinal = precoCorte + precoBarba +
        (navalhado.checked ? Number(navalhado.value) : 0) +
        (lavadoHidratado.checked ? Number(lavadoHidratado.value) : 0)
    
    document.querySelector("#editar-valorTotal").innerText = `R$ ${precoFinal},00`
    return precoFinal

}

function validarAgendamentoAdd() {
    let corte  = document.querySelector("#corte").value
    let data = document.querySelector("#data").value
    let hora = document.querySelector("#hora").value
    let preco = calcularPreco()

    if(corte === "" || data === "" || hora === "") {
        erroCamposVazios()
        return false
    }

    if(preco <= 0) {
        erroPreco()
        return false
    }

    let dataHoraEscolhida = new Date(`${data}T${hora}`)
    let agora = new Date()

    if(dataHoraEscolhida < agora) {
        erroAgendamentoAtrasado()
        return false
    }

    return true
}

function validarAgendamentoEdit() {
    let corte  = document.querySelector("#editar-corte").value
    let data = document.querySelector("#editar-data").value
    let hora = document.querySelector("#editar-hora").value
    let preco = calcularPrecoEdicao()

    if(corte === "" || data === "" || hora === "") {
        erroCamposVazios()
        return false
    }

    if(preco <= 0) {
        erroPreco()
        return false
    }

    let dataHoraEscolhida = new Date(`${data}T${hora}`)
    let agora = new Date()

    if(dataHoraEscolhida < agora) {
        erroAgendamentoAtrasado()
        return false
    }

    return true
}

function erroCamposVazios() {

    let container = document.querySelector("#container-avisos")

    container.innerHTML += `
        <div class="aviso aviso-erro">
            <div class="aviso-conteudo">
                <strong>Campos obrigatórios</strong>
                <span>Preencha todos os campos necessários.</span>
            </div>

            <button class="aviso-fechar" onclick="this.parentElement.remove()">×</button>
        </div>
    `
}

function erroPreco() {

    let container = document.querySelector("#container-avisos")

    container.innerHTML += `
        <div class="aviso aviso-erro">
            <div class="aviso-conteudo">
                <strong>Serviço não selecionado</strong>
                <span>Escolha pelo menos um serviço.</span>
            </div>

            <button class="aviso-fechar" onclick="this.parentElement.remove()">×</button>
        </div>
    `
}

function erroAgendamentoAtrasado() {

    let container = document.querySelector("#container-avisos")

    container.innerHTML += `
        <div class="aviso aviso-erro">
            <div class="aviso-conteudo">
                <strong>Horário inválido</strong>
                <span>Escolha uma data e horário futuros.</span>
            </div>

            <button class="aviso-fechar" onclick="this.parentElement.remove()">×</button>
        </div>
    `
}

function sucessoAdd() {

    let container = document.querySelector("#container-avisos")

    container.innerHTML += `
        <div class="aviso aviso-sucesso">
            <div class="aviso-conteudo">
                <strong>Agendamento criado</strong>
                <span>Seu agendamento foi cadastrado com sucesso.</span>
            </div>

            <button class="aviso-fechar" onclick="this.parentElement.remove()">×</button>
        </div>
    `
}

function sucessoEdit() {

    let container = document.querySelector("#container-avisos")

    container.innerHTML += `
        <div class="aviso aviso-sucesso">
            <div class="aviso-conteudo">
                <strong>Agendamento atualizado</strong>
                <span>As alterações foram salvas com sucesso.</span>
            </div>

            <button class="aviso-fechar" onclick="this.parentElement.remove()">×</button>
        </div>
    `
}

function sucessoExclusao() {

    let container = document.querySelector("#container-avisos")

    container.innerHTML += `
        <div class="aviso aviso-sucesso">

            <div class="aviso-conteudo">
                <strong>Agendamento excluído</strong>
                <span>O agendamento foi removido com sucesso.</span>
            </div>

            <button 
                class="aviso-fechar"
                onclick="this.parentElement.remove()">
                ×
            </button>

        </div>
    `
}

function confirmarExclusao(id) {
    let container = document.querySelector("#container-avisos")

    container.innerHTML += `
        <div class="confirmacao-overlay" id="confirmacao">
            <div class="confirmacao">
                
                <div class="confirmacao-conteudo">
                    <strong>Excluir agendamento?</strong>
                    <span>Essa ação não poderá ser desfeita.</span>
                </div>

                <div class="confirmacao-acoes">
                    <button
                        class="btn-cancelar-exclusao"
                        onclick="this.closest('.confirmacao-overlay').remove()">
                        Cancelar
                    </button>

                    <button
                        class="btn-confirmar-exclusao"
                        onclick="excluir(${id})">
                        Excluir
                    </button>
                </div>

            </div>
        </div>
    `
}

carregarCortes()