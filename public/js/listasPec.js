var ementa = "";
var numero = localStorage.getItem('pecNum');
var ano    = localStorage.getItem('pecAno');
var id     = localStorage.getItem('pecId');
$.ajax({
    "type": "GET",
    "url": `https://dadosabertos.camara.leg.br/api/v2/proposicoes?siglaTipo=PEC&numero=${numero}&ano=${ano ? ano : 2018}`,
    "success": function(response) {
        response.dados.forEach(element => {
            preencherPecs(element);
            getAutores(element.id);
        });
        // id = response.dados[0].id;
        // getAutores(id);
        // getTramitacoes(id);
        // getMessages()
        // document.getElementById('numPec').innerHTML = 'PEC ' + numero + ' / ' + (ano ? ano : 2018);
        // document.getElementById('ementa').innerHTML += response.dados[0].ementa;
    }
});

function preencherPecs(pec){
    var ul = document.getElementById('pecs');
    ul.innerHTML += `   
        <li class="collection-item">
            <div> <h3>PEC ${pec.numero}/${pec.ano}</h3>
                <a>Autor(es): <span id="autores-${pec.id}"></span><a>
                <a href="#" class="secondary-content"><i onclick='setDados(${JSON.stringify(pec)})' class="material-icons">send</i>
                </a>
            </div></li>
    `

}

function setDados(pec){
    localStorage.setItem('pecNum', pec.numero);
    localStorage.setItem('pecAno', pec.ano);
    localStorage.getItem('pecId', pec.id);
    window.location.href = './dadosPec.html';
}
function getAutores(id) {
    $.ajax({
        "type": "GET",
        "crossDomain": true,
        "url": `https://dadosabertos.camara.leg.br/api/v2/proposicoes/${id}/autores`,
        "success": function(response) {
            var autores = response.dados;
            var result = '';
            if (autores) {
                autores.forEach(function(autor, index) {
                    if (index > 0) result += ", ";
                    result += autor.nome;
                });
            }
            console.log(autores);
            console.log(result);
            document.getElementById('autores-' + id).innerHTML = result;
        }
    });
}