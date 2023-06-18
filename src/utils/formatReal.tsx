export function formatReal(valor: Number){
    return valor.toLocaleString('pt-br', {minimumFractionDigits: 2});
}