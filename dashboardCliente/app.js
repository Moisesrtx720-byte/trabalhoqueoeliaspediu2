let cortesAgendados = [
    {
        id: 1,
        nome: "João Silva",
        data: "20/09/2026",
        hora: "14:30",
        status: "agendado",
        preco: 35
    },

    {
        id: 2,
        nome: "Carlos Oliveira",
        data: "21/09/2026",
        hora: "15:00",
        status: "confirmado",
        preco: 50
    },

    {
        id: 3,
        nome: "Pedro Santos",
        data: "22/09/2026",
        hora: "16:30",
        status: "feito",
        preco: 60
    }
]

function carregarCortes() {
    let agendamentos = document.querySelector("#container-agendamentos")
    agendamentos.innerHTML = ""
    if (cortesAgendados.length === 0) {
        let agendamentos = document.querySelector("#container-agendamentos")
        agendamentos.innerHTML = "cadastre seu corte agora mesmo"
        return
    }

    cortesAgendados.map((corteAgendado) => {
    if (corteAgendado.status !== "feito") {
        agendamentos.innerHTML += `
        <div class="appointment-row">

                    <div class="appointment-service-icon">
                        ✂
                    </div>

                    <div class="appointment-row-info">

                        <strong>
                            ${corteAgendado.nome}
                        </strong>

                        <span>
                            ${corteAgendado.data} • ${corteAgendado.hora}
                        </span>

                    </div>
                    
                    <div class="agendamento-acoes">

                        <button class="btn-editar-agendamento" onclick="abrirModalEdit()">
                            Editar
                        </button>

                        <button onclick="excluir()" class="btn-excluir-agendamento">
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



carregarCortes()










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
                    Escolha seu corte e os serviços adicionais.
                </p>
            </div>

        </div>


        <div class="modal-body">

            <!-- Corte -->
            <div class="campo">

                <label for="corte">
                    Corte de cabelo
                </label>

                <select id="corte">

                    <option value="">
                        Selecione o corte
                    </option>

                    <option value="30.00">
                        Degradê — R$ 30,00
                    </option>

                    <option value="25.00">
                        Social — R$ 25,00
                    </option>

                    <option value="30.00">
                        Americano — R$ 30,00
                    </option>

                    <option value="30.00">
                        Low Fade — R$ 30,00
                    </option>

                    <option value="30.00">
                        Mid Fade — R$ 30,00
                    </option>

                    <option value="30.00">
                        High Fade — R$ 30,00
                    </option>

                    <option value="25.00">
                        Buzz Cut — R$ 25,00
                    </option>

                </select>

            </div>


            <!-- Barba -->
            <div class="campo">

                <label for="barba">
                    Barba
                </label>

                <select id="barba">

                    <option value="">
                        Selecione a barba
                    </option>

                    <option value="20.00">
                        Barba tradicional — R$ 20,00
                    </option>

                    <option value="25.00">
                        Barba desenhada — R$ 25,00
                    </option>

                    <option value="30.00">
                        Barba lenhador — R$ 30,00
                    </option>

                    <option value="20.00">
                        Barba baixa — R$ 20,00
                    </option>

                    <option value="15.00">
                        Bigode — R$ 15,00
                    </option>

                </select>

            </div>


            <!-- Opções adicionais -->
            <div class="campo">

                <label>
                    Opções adicionais
                </label>

                <div class="opcoes-adicionais">

                    <label class="opcao-extra">

                        <input
                            type="checkbox"
                            id="navalhado"
                            value="5.00"
                        >

                        <div>
                            <span>Navalhado</span>
                            <small>+ R$ 5,00</small>
                        </div>

                    </label>


                    <label class="opcao-extra">

                        <input
                            type="checkbox"
                            id="lavadoHidratado"
                            value="10.00"
                        >

                        <div>
                            <span>Lavado + hidratado</span>
                            <small>+ R$ 10,00</small>
                        </div>

                    </label>

                </div>

            </div>


            <!-- Total -->
            <div class="total">

                <span>Total</span>

                <strong id="valorTotal">
                    R$ 
                </strong>

            </div>

        </div>


        <div class="modal-footer">

            <button onclick="fecharModal()" class="btn-cancelar" id="cancelarModal">
                Cancelar
            </button>

            <button onclick="cadastrarAgendamento()" class="btn-salvar" id="salvarModal">
                Confirmar agendamento
            </button>

        </div>

    </div>

</div>`
}

function cadastrarAgendamento() {
    let corte  = document.querySelector("#corte").value
    let barba  = document.querySelector("#barba").value
    let navalhado  = document.querySelector("#navalhado").value
    let lavadoHidratado  = document.querySelector("#lavadoHidratado").value
    let precoFinal = calcularPreco(corte, barba, navalhado, lavadoHidratado)

    let novoCorteAgendado = {
        id: cortesAgendados.length + 1,
        corte: corte,
        barba: barba,
        navalhado: navalhado,
        lavado: lavadoHidratado,
        preco: precoFinal,
    }
    

    cortesAgendados.push(novoCorteAgendado)
    console.log(novoCorteAgendado);
    
    fecharModal()
    carregarCortes()
}

let corte = document.querySelector("#corte")
let barba = document.querySelector("#barba")
let navalhado = document.querySelector("#navalhado")
let lavadoHidratado = document.querySelector("#lavadoHidratado")

corte.addEventListener("change", calcularPreco)
barba.addEventListener("change", calcularPreco)
navalhado.addEventListener("change", calcularPreco)
lavadoHidratado.addEventListener("change", calcularPreco)

function calcularPreco() {
    let precoCorte = Number(corte.value)
    let precoBarba = Number(barba.value)
    let precoNavalhado = Number(navalhado.value)
    let precoLavadoHidratado = Number(lavadoHidratado.value)

    let precoFinal = precoCorte + precoBarba + precoNavalhado + precoLavadoHidratado

    return precoFinal
}

function fecharModal() {
    let modal = document.querySelector("#modal")
    let body = document.querySelector("body")
    body.removeChild(modal)
}

function editarAgendamento(id) {

    let agendamento = cortesAgendados.find(
        (agendamento) => agendamento.id === id
    )

    let body = document.querySelector("body")

    body.innerHTML += `

    <!-- MODAL -->
    <div class="modal-overlay" id="agendamento-modal">

        <div class="modal">

            <!-- HEADER -->
            <div class="modal-header">

                <div>

                    <span class="modal-label">
                        BARBERFLOW
                    </span>

                    <h2>Editar agendamento</h2>

                    <p>
                        Altere os serviços do agendamento.
                    </p>

                </div>

                <button
                    type="button"
                    class="modal-fechar"
                    onclick="fecharModal()"
                >
                    &times;
                </button>

            </div>


            <!-- CONTEÚDO -->
            <div class="modal-body">

                <!-- CORTE -->
                <div class="campo">

                    <label for="editar-corte">
                        Corte de cabelo
                    </label>

                    <select id="editar-corte">

                        <option value="">
                            Selecione o corte
                        </option>

                        <option value="degrade">
                            Degradê — R$ 30,00
                        </option>

                        <option value="social">
                            Social — R$ 25,00
                        </option>

                        <option value="americano">
                            Americano — R$ 30,00
                        </option>

                        <option value="low_fade">
                            Low Fade — R$ 30,00
                        </option>

                        <option value="mid_fade">
                            Mid Fade — R$ 30,00
                        </option>

                        <option value="high_fade">
                            High Fade — R$ 30,00
                        </option>

                        <option value="buzz_cut">
                            Buzz Cut — R$ 25,00
                        </option>

                    </select>

                </div>


                <!-- BARBA -->
                <div class="campo">

                    <label for="editar-barba">
                        Barba
                    </label>

                    <select id="editar-barba">

                        <option value="">
                            Selecione a barba
                        </option>

                        <option value="barba_tradicional">
                            Barba tradicional — R$ 20,00
                        </option>

                        <option value="barba_desenhada">
                            Barba desenhada — R$ 25,00
                        </option>

                        <option value="barba_lenhador">
                            Barba lenhador — R$ 30,00
                        </option>

                        <option value="barba_baixa">
                            Barba baixa — R$ 20,00
                        </option>

                        <option value="bigode">
                            Bigode — R$ 15,00
                        </option>

                    </select>

                </div>


                <!-- ADICIONAIS -->
                <div class="campo">

                    <label>
                        Opções adicionais
                    </label>

                    <div class="opcoes-adicionais">

                        <label class="opcao-extra">

                            <input
                                type="checkbox"
                                id="editar-navalhado"
                                value="5"
                            >

                            <div>

                                <span>
                                    Navalhado
                                </span>

                                <small>
                                    + R$ 5,00
                                </small>

                            </div>

                        </label>


                        <label class="opcao-extra">

                            <input
                                type="checkbox"
                                id="editar-lavado"
                                value="10"
                            >

                            <div>

                                <span>
                                    Lavado + hidratado
                                </span>

                                <small>
                                    + R$ 10,00
                                </small>

                            </div>

                        </label>

                    </div>

                </div>


                <!-- TOTAL -->
                <div class="total">

                    <span>
                        Total
                    </span>

                    <strong id="editar-valor-total">
                        R$ ${agendamento.preco}
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
                    onclick="salvarEdicaoAgendamento(${id})"
                >
                    Salvar alterações
                </button>

            </div>

        </div>

    </div>
    
`}

function excluir(id) {
    let index = cortesAgendados.findIndex((produto) => produto.id === id ) 
    let p = cortesAgendados.find((produto) => produto.id === id ) 

    cortesAgendados.splice(index, 1)
    carregarCortes()
}