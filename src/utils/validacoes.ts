export const validarEmail = (email: string): boolean => {
    return /[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validarSenha = (senha: string): boolean => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,12}$/.test(senha)
}

export const validarMaiorIdade = (dataString: string): boolean => {
    if (dataString.length !== 10) return false

    const [dia, mes, ano] = dataString.split('/').map(Number)
    const hoje = new Date()
    const nascimento = new Date(ano, mes - 1 , dia)

    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const diferencaMeses = hoje.getMonth() - nascimento.getMonth()

    if (diferencaMeses < 0 || (diferencaMeses === 0 && hoje.getDate() < nascimento.getDate())){
        idade--
    }

    return idade >= 18
} 

export const validarTelefone = (telefoneStr: string): boolean => {
    const telefoneConfigurado = apenasNumeros(telefoneStr)

    if (telefoneConfigurado.length !== 10 && telefoneConfigurado.length !== 11){
        return false
    }

    if (/^(\d)\1+$/.test(telefoneConfigurado)){
        return false
    }

    if (telefoneConfigurado.length === 11 && telefoneConfigurado.charAt(2) !== '9'){
        return false
    }

    return true
}

export const validarCpf = (cpfStr: string): boolean => {
    const cpf = apenasNumeros(cpfStr)

    if (cpf.length !== 11) return false

    if(/^(\d)\1+$/.test(cpf)) return false

    let soma = 0
    let resto

    for (let i = 1; i <=9; i++){
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf.substring(9,10))) return false
    
    soma = 0

    for (let i = 1; i <= 10; i++){
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf.substring(10,11))) return false

    return true
}

export const validarCep = (cepStr: string): boolean => {
    return apenasNumeros(cepStr).length === 8
}

export const apenasNumeros = (texto: string): string => {
    if (!texto) return ""
    return texto.replace(/\D/g, '')
}

export const formatarDataParaBanco = (dataBr: string) => {
    if (!dataBr || !dataBr.includes('/')) return dataBr
    const [dia, mes, ano] = dataBr.split('/')
    return `${ano}-${mes}-${dia}`
}