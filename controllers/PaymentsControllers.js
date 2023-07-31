
require('dotenv').config();
const stripe = require('stripe')(process.env.VUE_APP_STRIPE_SECRET);
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: se registra el correo del usuario
 *              name:
 *                  type: string
 *                  description: Se registra el nombre del usuario
 *              description:
 *                  type: string
 *                  description: pequeña descripcion
 *              phone:
 *                  type: string
 *                  description: ingresar un numero para contacto
 *          required:
 *              - email
 *              - name
 *              - description
 *              - phone
 *          example:
 *              email: pedrorc2018@gmail.com
 *              name: pedro luis ramos calla
 *              description: Mi pequeña descripción
 *              phone: 958104634
 *      Cards:
 *          type: object
 *          properties:
 *              address_city:
 *                  type: string
 *                  description: Se registra la direccion del cliente
 *              address_country:
 *                  type: string
 *                  description: Se registra el pais del cliente
 *              address_line1:
 *                  type: string
 *                  description: se ingresa una pequeña referencia de la direccion del cliente
 *              address_zip:
 *                  type: string
 *                  description: se ingresa el codigo postal de la ciudad o estado del cliente
 *              number:
 *                  type: string
 *                  description: se ingresa el numero de la tarjeta del cliente
 *              exp_month:
 *                  type: string
 *                  description: Mes de vencimiento de la tarjeta del cliente
 *                  minimum: 2
 *              exp_year:
 *                  type: string
 *                  description: Año de vencimiento de la tarjeta del cliente
 *                  minimum: 4
 *              cvc:
 *                  type: string
 *                  description: Codigo de verificacion de la tarjeta del cliente
 *                  minimum: 3
 *          required:
 *              - address_city
 *              - address_country
 *              - address_zip
 *              - number
 *              - exp_month
 *              - exp_year
 *              - cvc
 *          example:
 *              address_city: ilo, Av. los angeles lt. 4
 *              address_country: Peru
 *              address_line1: frente al mercado municipal
 *              address_zip: 04000
 *              number: 4242424242424242
 *              exp_month: 12
 *              exp_year: 2024
 *              cvc: 332
 *      Payment:
 *          type: object
 *          properties:
 *              amount:
 *                  type: double
 *                  description: El monto a pagar
 *              description:
 *                  type: string
 *                  description: Descripcion del pedido
 *              CustomerId:
 *                  type: string
 *                  description: Capturar el Id del customer
 *          required:
 *              - amount
 *              - description
 *              - CustomerId
 *          example:
 *              amount: 50.5
 *              description: envio desde centro hasta mi casa
 *              CustomerId: cus_A1B23C4D5E
 */
/**
 * @swagger
 * /customers:
 *  post:
 *      summary: Registrar un nuev o usuario en STRIPE
 *      description: Esta ruta nos ayuda a registrar un nuevo usuario en nuestra plataforma de stripe
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: new user created successfully!
 * /customers/{id}/update:
 *  post:
 *      summary: Actualizar un usuario en STRIPE
 *      tags: [User]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ingrese el Id del usuario que desea Actualizar
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Usuario actualizado con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: user not found
 * /customers/{id}/source:
 *  post:
 *      summary: Añadir una tarjeta nueva a un usuario
 *      tags: [User]
 *      parameters:
 *       - in: path
 *         name: id
 *         description: Se ingrese el ID del usuario al cual vamos a agregar la nueva tarjeta
 *         required: true
 *         schema:
 *          type: string
 *      requestBody:
 *          required: true
 *          description: Se ingrese el tokemId de la tarjeta creada
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          TokenId:
 *                              type: string
 *                              example: tok_1A2B3C4D5E
 *      responses:
 *          200:
 *              description: La tarjeta fue añadida correctamente
 *
 *          400:
 *              description: Id invalido, el usuario no se encuentra registrado
 *          404:
 *              description: Order not found
 * /customers/{id}/cardDefault:
 *  post:
 *      summary: Añadir un metodo de pago(tarjeta de credito) por defecto
 *      tags: [User]
 *      parameters:
 *       - in: path
 *         name: id
 *         description: Se ingrese el ID del usuario al cual vamos a agregar el metodo de pago por defecto
 *         required: true
 *         schema:
 *          type: string
 *      requestBody:
 *          required: true
 *          description: Se ingrese el cardId de la tarjeta la cual vamos a añadir
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          CardId:
 *                              type: string
 *                              example: card_1AB23C4D5E
 *      responses:
 *          200:
 *              description: Todas las tarjetas de un usuario especifico
 *          400:
 *              description: Id invalido, el usuario no se encuentra registrado
 *          404:
 *              description: Order not found
 * /userslist/{id}/user:
 *  get:
 *      summary: listar un usuario en STRIPE
 *      tags: [User]
 *      parameters:
 *       - in: path
 *         name: id
 *         description: Ingrese el Id del usuario que desea Buscar
 *         type: string
 *         required: true
 *      responses:
 *          200:
 *              description: all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: user not found
 * /userslist:
 *  get:
 *      summary: listar todos los usuarios en STRIPE
 *      tags: [User]
 *      responses:
 *          200:
 *              description: all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 * /customers/{id}/listSources:
 *  get:
 *      summary: listar las tarjetas de un usuario
 *      tags: [User]
 *      parameters:
 *       - in: path
 *         name: id
 *         description: Se ingrese el ID del usuario que se desea ver las tarjetas
 *         required: true
 *         schema:
 *          type: string
 *      requestBody:
 *          required: true
 *          description: Se ingrese el numero de tarjetas por paginacion
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          limit:
 *                              type: integer
 *                              example: 10
 *      responses:
 *          200:
 *              description: Todas las tarjetas de un usuario especifico
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Cards'
 *          400:
 *              description: Id invalido, el usuario no se encuentra registrado
 *          404:
 *              description: Order not found
 * /customers/{id}/delete:
 *  delete:
 *      summary: Eliminar un usuario
 *      tags: [User]
 *      description: Con esta ruta eliminamos un usuario de nuestra plataforma de stripe
 *      parameters:
 *       - in: path
 *         name: id
 *         description: Se ingrese el ID del usuario a eliminar
 *         required: true
 *         schema:
 *          type: string
 *      responses:
 *          200:
 *              description: Usuario eliminado con exito
 *          400:
 *              description: Id invalido, el usuario no se encuentra registrado
 *          404:
 *              description: Order not found
 * /customer/token/create:
 *  post:
 *      summary: Crear y Tokenizar una tarjeta de credito
 *      description: Esta ruta nos ayuda a crear y tokenizar una tarjeta de credito
 *      tags: [Cards]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Cards'
 *      responses:
 *          200:
 *              description: tarjeta tokenizada con exito!
 * /payment_intents/create:
 *  post:
 *      summary: Crear un intento de pago en nuestra plataforma stripe
 *      description: Esta ruta nos ayuda a crear un intento de pago en nuestra plataforma de Stripe
 *      tags: [Payment]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Payment'
 *      responses:
 *          200:
 *              description: new Payment created successfully!
 *
 *          400:
 *              description: Id invalido, el usuario no se encuentra registrado
 *          404:
 *              description: Order not found
 * /payment_intents/{id}/confirm:
 *  post:
 *      summary: Confirmar un pago
 *      tags: [Payment]
 *      parameters:
 *       - in: path
 *         name: id
 *         description: Se ingrese el PaymentId el cual vamos a confirmar el pago
 *         required: true
 *         schema:
 *          type: string
 *      requestBody:
 *          required: true
 *          description: Se ingresa el CardId de la tarjeta con la que realizaremos el pago correspondiente
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          CardId:
 *                              type: string
 *                              example: card_1A2B3C4D5E
 *      responses:
 *          200:
 *              description: La tarjeta fue añadida correctamente
 *
 *          400:
 *              description: Id invalido, el usuario no se encuentra registrado
 *          404:
 *              description: Order not found
 *
 */



class PaymentsController {

    async onlycustom (req, res) {
        const id = req.params.id
        try {
            const customer = await stripe.customers.retrieve(
                id
            );
            if (customer) {
                res.send({
                    data: customer,
                    status: true,
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "el usuario no existe intente nuevamente" + id,
                status: false,
            })
        }

    }
    async customers (req, res) {
        try {
            const customer = await stripe.customers.create({
                email: req.body.email,
                name: req.body.name,
                //description: req.body.description,
                phone: req.body.phone,
            })
            if (customer) {
                res.send({
                    id: customer.id,
                    email: customer.email,
                    status: true,
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "Verifique que todos los datos sean correctos",
                status: false,
            })
        }

    }
    async update (req, res) {
        try {
            const customer = await stripe.customers.update(
                req.body.userId,
                {
                    email: req.body.email,
                    name: req.body.name,
                    //description: req.body.description,
                    phone: req.body.phone,
                }
            );
            if (customer) {
                res.send({
                    message: 'Customer updated successfully',
                    id: customer.id,
                    email: customer.email,
                    status: true,
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "Verifique que los datos sean correctos",
                status: false,
            })
        }

    }
    async deleteCard (req, res) {
        try {
            const deleted = await stripe.customers.deleteSource(
                req.body.userId,
                //'cus_NEfK7Tlo3E7dDJ',
                req.body.source);
            //'card_1MfWPnIo7cwSV9VQZzl0N3kl'
            if (deleted) {
                res.send({
                    message: 'Customer deleted successfully',
                    status: true,
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "La tarjeta no existe",
                status: false,
            })
        }



    }
    async delete (req, res) {
        try {
            const deleted = await stripe.customers.del(
                req.params.id,
            );
            if (deleted) {
                res.send({
                    message: 'usuario eliminado con exito',
                    status: true,
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "el usuario no existe",
                status: false,
            })
        }


    }

    async token (req, res) {
        try {
            const token = await stripe.tokens.create({
                card: {
                    number: req.body.number,
                    exp_month: req.body.exp_month,
                    exp_year: req.body.exp_year,
                    cvc: req.body.cvc,
                },
            });
            if (token) {
                res.send({
                    token_id: token.id,
                    card_id: token.card.id,
                    card_brand: token.card.brand,
                    card_last4: token.card.last4,
                    status: true,
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "los datos ingresados son incorrectos",
                status: false,
            })
        }
    }
    async source (req, res) {
        try {
            const card = await stripe.customers.createSource(
                req.body.userId,
                { source: req.body.source }
            );
            if (card) {
                res.send({
                    message: 'Tarjeta añadida con exito',

                    cardId: card.id,
                    status: true,
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "verifique que el usuario este registrado",
                status: false,
            })
        }

    }
    async cardDefault (req, res) {
        try {
            const customer = await stripe.customers.update(
                req.body.userId,
                {
                    default_source: req.body.default_source,
                }

            );
            if (customer) {
                res.send({
                    message: 'Metodo de pago Actualizado con exito',
                    data: customer,
                    status: true,
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "Valida los datos de la tarjeta",
                status: false,
            })
        }
    }
    //se visualiza los Datos de solo una tarjeta
    async listSources (req, res) {
        try {
            const cards = await stripe.customers.listSources(
                req.params.id,
                {
                    object: 'card',
                    limit: 10
                }
            );
            if (cards) {
                res.status(201).send({
                    data: cards.data,
                    status: true,
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "El usuario no tiene una cuenta registrada",
                status: false,
            })
        }



    }
    async created (req, res) {
        try {
            const customerId = req.body.customer_id;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: req.body.amount,
                currency: "EUR",
                payment_method_types: ['card'],
                payment_method: req.body.payment_method,
                //payment_method: 'card_1Mg8wlIo7cwSV9VQ2Gl3Rm03',
                customer: customerId,
            });

            if (paymentIntent) {

                res.send({
                    status: true,
                    data: paymentIntent,
                    id: paymentIntent.id,
                    customer: paymentIntent.customer
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "verifique que la tarjeta ingresada sea valida",
                status: false,
            })
        }

    }
    async confirm (req, res) {
        try {
            const paymentIntent = await stripe.paymentIntents.confirm(
                req.body.paymentId,
            );
            if (paymentIntent) {
                res.send({
                    status: true,
                    data: paymentIntent,

                })
            }
        } catch (error) {
            res.status(404).json({
                message: "verifique que el payment intent ahya sido creado",
                status: false,
            })
        }
    }
    async userList (req, res) {
        try {
            const customer = await stripe.customers.list({
                limit: 10,
            });
            if (customer) {
                res.send({
                    data: customer,
                })
            }
        } catch (error) {
            res.status(404).json({
                message: "Verifique que las keys esten ingresadas correctamente",
                status: false,
            })
        }

    }
}
module.exports = PaymentsController