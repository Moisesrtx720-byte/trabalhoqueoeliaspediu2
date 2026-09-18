const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "123@",
    senha: "1234",
    idade: 28,
    cargo: "admin",
    ativo: true,
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "123@",
    senha: "123",
    idade: 31,
    cargo: "user",
    ativo: true,
  },
  {
    id: 3,
    nome: "Pedro Santos",
    email: "pedro.santos@email.com",
    senha: "pedro@2026",
    idade: 24,
    cargo: "user",
    ativo: false,
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    senha: "ana321",
    idade: 29,
    cargo: "user",
    ativo: true,
  },
  {
    id: 5,
    nome: "Lucas Ferreira",
    email: "lucas.ferreira@email.com",
    senha: "lucas123",
    idade: 35,
    cargo: "user",
    ativo: true,
  },
  {
    id: 6,
    nome: "Carla Souza",
    email: "carla.souza@email.com",
    senha: "carla456",
    idade: 27,
    cargo: "admin",
    ativo: false,
  },
  {
    id: 7,
    nome: "Rafael Lima",
    email: "rafael.lima@email.com",
    senha: "rafael789",
    idade: 33,
    cargo: "user",
    ativo: true,
  },
  {
    id: 8,
    nome: "Juliana Alves",
    email: "juliana.alves@email.com",
    senha: "ju12345",
    idade: 26,
    cargo: "admin",
    ativo: true,
  },
  {
    id: 9,
    nome: "Bruno Martins",
    email: "bruno.martins@email.com",
    senha: "bruno@123",
    idade: 38,
    cargo: "admin",
    ativo: false,
  },
  {
    id: 10,
    nome: "Fernanda Rocha",
    email: "fernanda.rocha@email.com",
    senha: "fernanda2026",
    idade: 30,
    cargo: "user",
    ativo: true,
  },
  {
    id: 11,
    nome: "Fernanda Rocha",
    email: "moisesrtx720@gmail.com",
    senha: "123",
    idade: 30,
    cargo: "user",
    ativo: true,
  },
];

function autenticarCliente() {
    let email = document.querySelector("#email").value
    let senha = document.querySelector("#senha").value

    let usuarioEncontrado = usuarios.find((usuario) => email === usuario.email && senha === usuario.senha)

    if(usuarioEncontrado === undefined) {
        let mensagemErroUsuario = document.querySelector("#erroUsuarioEncontrado")
        mensagemErroUsuario.innerText = "Usuário não encontrado"
        return
    }

    if(usuarioEncontrado.cargo === "admin") {
        window.location.href="../dashboardAdministrador/admin.html"
        return
    }

    window.location.href="../dashboardCliente/dashboard.html"
}
