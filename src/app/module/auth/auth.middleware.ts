import { rateLimit } from "express-rate-limit";


//limitador de requisição para barrar ataques de força bruta
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    limit: 5, // 5 tentativas
    standardHeaders: true,
    legacyHeaders: false,
    ipv6Subnet: 56
})