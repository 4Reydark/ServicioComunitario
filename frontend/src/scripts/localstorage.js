export const saveDataToLocalStorage = (data) => {
    localStorage.setItem('empleado', JSON.stringify(data));
};

export const deleteDataToLocalStorage = () => {
    localStorage.removeItem('empleado');
};

export const getDataToLocalStorage = () => {
    return JSON.parse(localStorage.getItem('empleado'));
};

export const getAntiguedad=(fechaAntigua)=>{
    const fechaActual = new Date();
    const gechaAntigua  = new Date(fechaAntigua);
    const milisegundosEnUnAnio = 1000 * 60 * 60 * 24 * 365.25; // Considera los años bisiestos
    const res = Math.floor((fechaActual-gechaAntigua)/milisegundosEnUnAnio);
    const msg = res==1 ?' año':' años';
    return res+msg
}

export default {saveDataToLocalStorage,getDataToLocalStorage};