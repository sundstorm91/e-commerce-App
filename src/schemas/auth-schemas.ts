import { z } from 'zod';

/* схема для регистрации */

export const registrationSchema = z.object({
    username: z.string().min(4, 'Имя слишком короткое'),
    email: z.string().email({message: 'Некорректный e-mail'}),
    password: z.string()
        .min(6, 'Пароль должен содержать более 6 символов')
        .regex(/[A-Z]/, 'Пароль должен содержать заглавную букву')
        .regex(/[0-9]/, 'Пароль должен содержать цифры'),
})

/* схема для авторизации */

export const loginSchema = z.object({
    email: z.string().email({message: 'Некорректный e-mail'}),
    password: z.string()
        .min(6, 'Пароль должен содержать более 6 символов'),

})

export type LoginFormData = z.infer<typeof loginSchema>

export type RegisterFormData = z.infer<typeof registrationSchema>