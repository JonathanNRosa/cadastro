const form = document.getElementById("cadastro-form");

// Função para buscar endereço no Viacep
async function buscarEndereco(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) throw new Error("Erro ao buscar CEP");
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado!");
      return;
    }

    document.getElementById("logradouro").value = data.logradouro || "";
    document.getElementById("bairro").value = data.bairro || "";
    document.getElementById("cidade").value = data.localidade || "";
    document.getElementById("uf").value = data.uf || "";

    salvarFormulario(); 
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("cep").addEventListener("blur", (e) => {
  const cep = e.target.value.replace(/\D/g, ""); 
  if (cep.length === 8) {
    buscarEndereco(cep);
  }
});

function salvarFormulario() {
  const dados = {};
  [...form.elements].forEach((el) => {
    if (el.name) dados[el.name] = el.value;
  });
  localStorage.setItem("cadastroUsuario", JSON.stringify(dados));
}

function restaurarFormulario() {
  const dados = JSON.parse(localStorage.getItem("cadastroUsuario"));
  if (dados) {
    [...form.elements].forEach((el) => {
      if (el.name && dados[el.name]) {
        el.value = dados[el.name];
      }
    });
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  salvarFormulario();
  alert("Dados salvos com sucesso!");
});

// Iniciar
window.addEventListener("load", restaurarFormulario);
