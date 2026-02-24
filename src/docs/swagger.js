/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: Correo del cliente
 *              name:
 *                  type: string
 *                  description: Nombre del cliente
 *              phone:
 *                  type: string
 *                  description: Número de contacto
 *          required:
 *              - email
 *              - name
 *              - phone
 *          example:
 *              email: pedrorc2018@gmail.com
 *              name: Pedro Luis Ramos Calla
 *              phone: 958104634
 *      UserUpdate:
 *          type: object
 *          properties:
 *              userId:
 *                  type: string
 *                  description: ID del customer en Stripe
 *              email:
 *                  type: string
 *              name:
 *                  type: string
 *              phone:
 *                  type: string
 *          required:
 *              - userId
 *      CardCreate:
 *          type: object
 *          properties:
 *              number:
 *                  type: string
 *              exp_month:
 *                  type: string
 *              exp_year:
 *                  type: string
 *              cvc:
 *                  type: string
 *          required:
 *              - number
 *              - exp_month
 *              - exp_year
 *              - cvc
 *          example:
 *              number: 4242424242424242
 *              exp_month: 12
 *              exp_year: 2028
 *              cvc: 332
 *      CardAssign:
 *          type: object
 *          properties:
 *              userId:
 *                  type: string
 *              source:
 *                  type: string
 *          required:
 *              - userId
 *              - source
 *          example:
 *              userId: cus_A1B23C4D5E
 *              source: tok_1A2B3C4D5E
 *      CardDefault:
 *          type: object
 *          properties:
 *              userId:
 *                  type: string
 *              default_source:
 *                  type: string
 *          required:
 *              - userId
 *              - default_source
 *          example:
 *              userId: cus_A1B23C4D5E
 *              default_source: card_1AB23C4D5E
 *      PaymentCreate:
 *          type: object
 *          properties:
 *              amount:
 *                  type: integer
 *                  description: Monto del pago
 *              customer_id:
 *                  type: string
 *                  description: ID del customer en Stripe
 *              payment_method:
 *                  type: string
 *                  description: ID del método de pago/tarjeta
 *          required:
 *              - amount
 *              - customer_id
 *              - payment_method
 *          example:
 *              amount: 5000
 *              customer_id: cus_A1B23C4D5E
 *              payment_method: card_1AB23C4D5E
 *      PaymentConfirm:
 *          type: object
 *          properties:
 *              paymentId:
 *                  type: string
 *                  description: ID del payment_intent
 *          required:
 *              - paymentId
 *          example:
 *              paymentId: pi_1N2aB3cD4e
 */

/**
 * @swagger
 * /api/customers/create:
 *  post:
 *      summary: Crear cliente en Stripe
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Cliente creado correctamente
 *
 * /api/customers/update:
 *  put:
 *      summary: Actualizar cliente en Stripe
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserUpdate'
 *      responses:
 *          200:
 *              description: Cliente actualizado correctamente
 *
 * /api/customers/delete:
 *  delete:
 *      summary: Eliminar cliente en Stripe
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Cliente eliminado correctamente
 *
 * /api/customers/{id}:
 *  get:
 *      summary: Obtener cliente por ID
 *      tags: [User]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del customer
 *      responses:
 *          200:
 *              description: Cliente encontrado
 *
 * /api/customers:
 *  get:
 *      summary: Listar clientes
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Lista de clientes
 *
 * /api/cards/create:
 *  post:
 *      summary: Crear token de tarjeta
 *      tags: [Cards]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CardCreate'
 *      responses:
 *          200:
 *              description: Tarjeta tokenizada correctamente
 *
 * /api/cards/assign:
 *  post:
 *      summary: Asignar tarjeta a cliente
 *      tags: [Cards]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CardAssign'
 *      responses:
 *          200:
 *              description: Tarjeta asignada correctamente
 *
 * /api/cards/default:
 *  post:
 *      summary: Definir tarjeta por defecto
 *      tags: [Cards]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CardDefault'
 *      responses:
 *          200:
 *              description: Tarjeta por defecto actualizada
 *
 * /api/cards/{id}:
 *  get:
 *      summary: Listar tarjetas por customer ID
 *      tags: [Cards]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del customer
 *      responses:
 *          200:
 *              description: Tarjetas del cliente
 *
 * /api/payments/create:
 *  post:
 *      summary: Crear intento de pago
 *      tags: [Payment]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PaymentCreate'
 *      responses:
 *          200:
 *              description: Pago creado correctamente
 *
 * /api/payments/confirm:
 *  post:
 *      summary: Confirmar intento de pago
 *      tags: [Payment]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PaymentConfirm'
 *      responses:
 *          200:
 *              description: Pago confirmado correctamente
 */
