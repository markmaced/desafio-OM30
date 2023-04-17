export const cnsValidation = {
  methods: {
      validateCNS(cns) {
        cns = cns.replace(/\D/g, '');
        cns = cns.trim();
      if (cns.length !== 15) {
        return false;
      }

      let dv, resto, soma;
      soma = parseInt(cns[0]) * 15 +
            parseInt(cns[1]) * 14 +
            parseInt(cns[2]) * 13 +
            parseInt(cns[3]) * 12 +
            parseInt(cns[4]) * 11 +
            parseInt(cns[5]) * 10 +
            parseInt(cns[6]) * 9 +
            parseInt(cns[7]) * 8 +
            parseInt(cns[8]) * 7 +
            parseInt(cns[9]) * 6 +
            parseInt(cns[10]) * 5 +
            parseInt(cns[11]) * 4 +
            parseInt(cns[12]) * 3 +
            parseInt(cns[13]) * 2 +
            parseInt(cns[14]) * 1;

      resto = soma % 11;


      if (resto !== 0) {
        return false;
      } else {
        return true;
      }
    },
    validateCNSPrimary(cns){
      cns = cns.replace(/\D/g, '');
      if (cns.trim().length !== 15) {
        return false;
      }
  
      let soma = 0;
      let resto, dv;
      let pis = "";
      let resultado = "";
      pis = cns.substring(0, 11);
  
      soma =
        parseInt(pis.substring(0, 1)) * 15 +
        parseInt(pis.substring(1, 2)) * 14 +
        parseInt(pis.substring(2, 3)) * 13 +
        parseInt(pis.substring(3, 4)) * 12 +
        parseInt(pis.substring(4, 5)) * 11 +
        parseInt(pis.substring(5, 6)) * 10 +
        parseInt(pis.substring(6, 7)) * 9 +
        parseInt(pis.substring(7, 8)) * 8 +
        parseInt(pis.substring(8, 9)) * 7 +
        parseInt(pis.substring(9, 10)) * 6 +
        parseInt(pis.substring(10, 11)) * 5;
  
      resto = soma % 11;
      dv = 11 - resto;
  
      if (dv === 11) {
        dv = 0;
      }
  
      if (dv === 10) {
        soma =
          parseInt(pis.substring(0, 1)) * 15 +
          parseInt(pis.substring(1, 2)) * 14 +
          parseInt(pis.substring(2, 3)) * 13 +
          parseInt(pis.substring(3, 4)) * 12 +
          parseInt(pis.substring(4, 5)) * 11 +
          parseInt(pis.substring(5, 6)) * 10 +
          parseInt(pis.substring(6, 7)) * 9 +
          parseInt(pis.substring(7, 8)) * 8 +
          parseInt(pis.substring(8, 9)) * 7 +
          parseInt(pis.substring(9, 10)) * 6 +
          parseInt(pis.substring(10, 11)) * 5 +
          2;
  
        resto = soma % 11;
        dv = 11 - resto;
        resultado = pis + "001" + dv.toString();
      } else {
        resultado = pis + "000" + dv.toString();
      }
      if (cns !== resultado) {
        return false;
      } else {
        return true;
      }
    }
  }
}
