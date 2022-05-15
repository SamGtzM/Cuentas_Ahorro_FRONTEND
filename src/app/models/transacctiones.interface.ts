export interface transacctionesI{
    id_transacction:           number;
    tipo_transacction:         string;
    id_tipo_transacction:      number;
    id_cuenta:                 number;
    estado:                    string;
    numero_cuenta:             string;
    saldo:                     DoubleRange;
    id_terminal:               number;
    nombre_terminal:           string;
    id_usuario:                number;
    nombre_completo:           string;
    email:                     string;
    fecha_movimiento:          Date;
}
