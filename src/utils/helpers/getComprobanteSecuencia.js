import data from "../../SecuancialComprobantes.json";

export const getComprobanteSecuencia = (voucherType = "B01") => {
  return voucherType + data[voucherType];
};
