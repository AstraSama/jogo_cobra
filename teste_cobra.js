let aux = "";
let aux_inicio = "";
let aux_corpo = "";
let comida = "";
let fruta = [];
let inicio = [];
let aux_controle = [];
let aux_controle2 = "";  // uma variável auxiliar para a variavel de controle
let resposta = "";
let aux_comida = 0;

const LinkedList = require('./LinkedList');
const list = new LinkedList();

// TODO
// - mover o corpo junto, utilizando lista encadeada
// - atualizar o movimento dos espaços vazios
// - fazer morte.
let campo = [
    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"], //1
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"], //12 x 12
];
let campo_controle = [
    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", "Q", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
]


const setInterval = require('timers').setInterval;
const keypress = require('keypress');

for(let i = 0; i < campo.length; i++) { // imprimir imagem inicial do campo
    console.log(
        campo_controle[i].join(" ") + "\n" 
    )
}

keypress(process.stdin);
process.stdin.setRawMode(true);
do {
    process.stdin.on('keypress', function(key) { // captar resposta do usuário
        if(!resposta) {
            resposta = key;

        }

        aux = resposta;
        
    })

    const intervalo = setInterval(function() {
        for(let i = 0; i < campo.length; i++) { // verifica quantas comidas tem
            for(let j = 0; j < campo.length; j++) {
                if(campo[i][j].includes("X")) {
                    aux_comida++;
                }
            }
        }

        comida = aux_comida; // salva a quantidade de comidas para atualizar a aux_comida
        aux_comida = 0;

        if(comida >= 0 && comida < 5) { // verifica a quantidade de comidas atuais
            do {
            fruta.push(Math.floor(Math.random() * 10)); // gera coordenadas aleatórias
            fruta.push(Math.floor(Math.random() * 10));

            if( // verifica se não está nos limites
                fruta[0] == 0 || 
                fruta[0] == 11 ||
                fruta[1] == 0 || 
                fruta[1] == 11
            ) {
                fruta.pop();
                fruta.pop();
                comida--;
            }

            comida++;            
                
            } while(comida < 5);

            campo_controle[fruta[0]][fruta[1]] = "X";

            fruta.pop();
            fruta.pop();
        }
        
        
        
        for(let i = 0; i < campo.length; i++) {  // achar a cabeça da cobra
            for(let j = 0; j < campo.length; j++) {
                if(campo_controle[i][j].includes("Q")) {
                    inicio.push(i);
                    inicio.push(j);
                    // console.log(inicio);

                }
            }
        }
        
        
        
        
        if(aux == 'w') { // se apertar w para ir para cima
            if(!list) { //FIXME deve-se atualizar o valor de Q,  verifica se ja tem a auxiliar do inicio da cabeça 
                list.append(inicio); // salva o primeiro elemento
                aux_inicio = inicio;
                
            }

            aux_controle2 = inicio[0] - 1;
            aux_controle.push([aux_controle2, inicio[1]]);
            
            if(campo_controle[inicio[0] - 1][inicio[1]] == " ") { //se para onde mover for espaço livre
                list.setElement(0, aux_controle); //TODO váriavel de posição, vai atualizar o primeiro elemento
                aux_inicio = list.getElement(0); // vai armazenar o primeiro elemento da lista
        
                if(list.length == 1) { // verifica o espaço envolta se é livre ou limite
                    campo[inicio[0]][inicio[1]] = " ";
                    
                } else if(list.length > 1){ //FIXME o lenght não funciona na lista. verifica o tamanho da lista, para ver se tem corpo
                    for(let i = 1; i <list.length; i++) {
                        aux_corpo = list.getElement(i);
                        list.setElement(i, aux_inicio);
                        aux_inicio = aux_corpo;
        
                    }
                }
                aux_controle.pop();
                aux_controle.pop();
        
            } else if(campo[inicio[0] - 1][inicio[1]] == "X"){ //TODO adicionar ao corpo
                aux_corpo = list.getElement(0);
                list.setElement(0, aux_controle);
        
                for(let i = 1; i <list.length; i++) {
                    list.setElement(i, aux_corpo);
                    list.setElement(i, aux_inicio);
                    aux_inicio = aux_corpo;
        
                }
        
                aux_comida--;
                aux_controle.pop();
                aux_controle.pop();
                inicio[0] -= 1;
                
            }
        
            
            // console.log(inicio);
            resposta = "";
            inicio.pop();
            inicio.pop(); // s é [0] + 1 e [1]
            
        } else if(aux == 's') { // se apertar w para ir para cima
            if(!list) { //FIXME deve-se atualizar o valor de Q,  verifica se ja tem a auxiliar do inicio da cabeça 
                list.append(inicio); // salva o primeiro elemento
                aux_inicio = inicio;
                
            }
        
            // console.log(aux_inicio);
            aux_controle2 = inicio[0] + 1;
            aux_controle.push([aux_controle2, inicio[1]]);
            
            if(campo[inicio[0] + 1][inicio[1]] == " ") { //se para onde mover for espaço livre
                list.setElement(0, aux_controle); //TODO váriavel de posição, vai atualizar o primeiro elemento
                aux_inicio = list.getElement(0); // vai armazenar o primeiro elemento da lista
        
                if(list.length == 1) { // verifica o espaço envolta se é livre ou limite
                    campo[inicio[0]][inicio[1]] = " ";
                    
                } else if(list.length > 1){ //verifica o tamanho da lista, para ver se tem corpo
                    for(let i = 1; i <list.length; i++) {
                        aux_corpo = list.getElement(i);
                        list.setElement(i, aux_inicio);
                        aux_inicio = aux_corpo;
        
                    }
                }
                aux_controle.pop();
                aux_controle.pop();
        
            } else if(campo[inicio[0] + 1][inicio[1]] == "X"){ //TODO adicionar ao corpo
                aux_corpo = list.getElement(0);
                list.setElement(0, aux_controle);
        
                for(let i = 1; i <list.length; i++) {
                    list.setElement(i, aux_corpo);
                    list.setElement(i, aux_inicio);
                    aux_inicio = aux_corpo;
        
                }
        
                aux_comida--;
                aux_controle.pop();
                aux_controle.pop();
                inicio[0] -= 1;
                
            }
        
            
            // console.log(inicio);
            resposta = "";
            inicio.pop();
            inicio.pop(); // d é [0] e [1] + 1
            
        } else if(aux == 'd') { // se apertar w para ir para cima
            if(!list) { //FIXME deve-se atualizar o valor de Q,  verifica se ja tem a auxiliar do inicio da cabeça 
                list.append(inicio); // salva o primeiro elemento
                aux_inicio = inicio;
                
            }
        
            // console.log(aux_inicio);
            aux_controle2 = inicio[1] + 1;
            aux_controle.push([aux_controle2, inicio[1]]);
            
            if(campo[inicio[0]][inicio[1] + 1] == " ") { //se para onde mover for espaço livre
                list.setElement(0, aux_controle); //TODO váriavel de posição, vai atualizar o primeiro elemento
                aux_inicio = list.getElement(0); // vai armazenar o primeiro elemento da lista
        
                if(list.length == 1) { // verifica o espaço envolta se é livre ou limite
                    campo[inicio[0]][inicio[1]] = " ";
                    
                } else if(list.length > 1){ //verifica o tamanho da lista, para ver se tem corpo
                    for(let i = 1; i <list.length; i++) {
                        aux_corpo = list.getElement(i);
                        list.setElement(i, aux_inicio);
                        aux_inicio = aux_corpo;
        
                    }
                }
                aux_controle.pop();
                aux_controle.pop();
        
            } else if(campo[inicio[0]][inicio[1] + 1] == "X"){ //TODO adicionar ao corpo
                aux_corpo = list.getElement(0);
                list.setElement(0, aux_controle);
        
                for(let i = 1; i <list.length; i++) {
                    list.setElement(i, aux_corpo);
                    list.setElement(i, aux_inicio);
                    aux_inicio = aux_corpo;
        
                }
        
                aux_comida--;
                aux_controle.pop();
                aux_controle.pop();
                inicio[0] -= 1;
                
            }
        
            
            // console.log(inicio);
            resposta = "";
            inicio.pop();
            inicio.pop(); // a é [0] e [1] - 1
            
        } else if(aux == 'a') { // se apertar w para ir para cima
            if(!list) { //FIXME deve-se atualizar o valor de Q,  verifica se ja tem a auxiliar do inicio da cabeça 
                list.append(inicio); // salva o primeiro elemento
                aux_inicio = inicio;
                
            }
        
            // console.log(aux_inicio);
            aux_controle2 = inicio[1] - 1;
            aux_controle.push([aux_controle2, inicio[1]]);
            
            if(campo[inicio[0]][inicio[1] - 1] == " ") { //se para onde mover for espaço livre
                list.setElement(0, aux_controle); //TODO váriavel de posição, vai atualizar o primeiro elemento
                aux_inicio = list.getElement(0); // vai armazenar o primeiro elemento da lista
        
                if(list.length == 1) { // verifica o espaço envolta se é livre ou limite
                    campo[inicio[0]][inicio[1]] = " ";
                    
                } else if(list.length > 1){ //verifica o tamanho da lista, para ver se tem corpo
                    for(let i = 1; i <list.length; i++) {
                        aux_corpo = list.getElement(i);
                        list.setElement(i, aux_inicio);
                        aux_inicio = aux_corpo;
        
                    }
                }
                aux_controle.pop();
                aux_controle.pop();
        
            } else if(campo[inicio[0]][inicio[1] - 1] == "X"){ //TODO adicionar ao corpo
                aux_corpo = list.getElement(0);
                list.setElement(0, aux_controle);
        
                for(let i = 1; i <list.length; i++) {
                    list.setElement(i, aux_corpo);
                    list.setElement(i, aux_inicio);
                    aux_inicio = aux_corpo;
        
                }
        
                aux_comida--;
                aux_controle.pop();
                aux_controle.pop();
                inicio[0] -= 1;
                
            }
        
            
            // console.log(inicio);
            resposta = "";
            inicio.pop();
            inicio.pop(); // a é [0] e [1] - 1
            
        } else if(aux == "e") {
        process.exit();
        } else {
            resposta = "";
            inicio.pop();
            inicio.pop();
        }

        for(let i = 0; i < campo_controle.length; i++) {
            for(let j = 0; j < campo_controle.length; j++) {
                for(let k = 1; k < campo_controle.length; k++) {
                    if(campo[i][j] == list.getElement(0)) {
                        campo[i][j] = "Q";

                    } else if(campo[i][j] == list.getElement(k)) {
                        campo[i][j] = "o";

                    } else if(campo_controle[i][j] != "_" && campo_controle[i][j] != "|") {
                        campo[i][j] = " ";

                    }
                }
            }
        }
        

        for(let i = 0; i < campo.length; i++) {
                console.log(
                    campo[i].join(" ") + "\n"
                )
            }
    }, 1000);
    

} while(aux);
