// Definição da classe Node
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Definição da classe LinkedList
class LinkedList {
    constructor() {
        this.head = null;
    }

    // Método para adicionar um novo nó no final da lista
    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    // Método para exibir os elementos da lista
    display() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }

    // Método para ver um elemento específico na lista
    getElement(index) {
        let current = this.head;
        let count = 0;
        while (current) {
            if (count === index) {
                return current.data;
            }
            count++;
            current = current.next;
        }
        return null; // Retorna null se o índice estiver fora dos limites da lista
    }

    setElement(index, newData) {
        let current = this.head;
        let count = 0;
        while (current) {
            if (count === index) {
                current.data = newData;
                return true; // Retorna true se o valor for alterado com sucesso
            }
            count++;
            current = current.next;
        }
        return false; // Retorna false se o índice estiver fora dos limites da lista
    }
}

// Exportando a classe LinkedList para uso em outros arquivos
module.exports = LinkedList;
