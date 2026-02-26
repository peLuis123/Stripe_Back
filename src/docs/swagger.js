/**
 * @swagger
 * components:
 *  schemas:
 *      ApiErrorResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *                  example: false
 *              message:
 *                  type: string
 *                  example: email, name y phone son requeridos
 *              code:
 *                  type: string
 *                  nullable: true
 *                  example: resource_missing
 *          required:
 *              - status
 *              - message
 *
 *      CustomerCreateRequest:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              name:
 *                  type: string
 *              phone:
 *                  type: string
 *          required:
 *              - email
 *              - name
 *              - phone
 *
 *      CustomerUpdateRequest:
 *          type: object
 *          properties:
 *              userId:
 *                  type: string
 *              email:
 *                  type: string
 *              name:
 *                  type: string
 *              phone:
 *                  type: string
 *          required:
 *              - userId
 *
 *      CustomerDeleteRequest:
 *          type: object
 *          properties:
 *              userId:
 *                  type: string
 *          required:
 *              - userId
 *
 *      CardCreateRequest:
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
 *
 *      CardAssignRequest:
 *          type: object
 *          properties:
 *              userId:
 *                  type: string
 *              source:
 *                  type: string
 *          required:
 *              - userId
 *              - source
 *
 *      CardDefaultRequest:
 *          type: object
 *          properties:
 *              userId:
 *                  type: string
 *              default_source:
 *                  type: string
 *          required:
 *              - userId
 *              - default_source
 *
 *      PaymentCreateRequest:
 *          type: object
 *          properties:
 *              amount:
 *                  type: integer
 *                  description: Monto en unidad mínima (ej. centavos)
 *              customer_id:
 *                  type: string
 *              payment_method:
 *                  type: string
 *          required:
 *              - amount
 *              - customer_id
 *              - payment_method
 *
 *      PaymentConfirmRequest:
 *          type: object
 *          properties:
 *              paymentId:
 *                  type: string
 *          required:
 *              - paymentId
 *
 *      PaymentRefundRequest:
 *          type: object
 *          properties:
 *              chargeId:
 *                  type: string
 *                  description: ID del Charge (ch_...)
 *              amount:
 *                  type: integer
 *                  description: Monto a reembolsar en unidad mínima (opcional)
 *              reason:
 *                  type: string
 *                  enum: [duplicate, fraudulent, requested_by_customer]
 *                  description: Motivo opcional del reembolso
 *          required:
 *              - chargeId
 *
 *      CustomerItem:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *              email:
 *                  type: string
 *              name:
 *                  type: string
 *              phone:
 *                  type: string
 *
 *      CardTokenItem:
 *          type: object
 *          properties:
 *              token_id:
 *                  type: string
 *              card_id:
 *                  type: string
 *              card_brand:
 *                  type: string
 *              card_last4:
 *                  type: string
 *
 *      CardAssignItem:
 *          type: object
 *          properties:
 *              cardId:
 *                  type: string
 *              brand:
 *                  type: string
 *              last4:
 *                  type: string
 *
 *      DeleteItem:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *
 *      SuccessCustomerResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *                  example: true
 *              message:
 *                  type: string
 *                  example: Cliente creado correctamente
 *              data:
 *                  $ref: '#/components/schemas/CustomerItem'
 *
 *      SuccessListResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *                  example: true
 *              message:
 *                  type: string
 *                  example: Clientes listados correctamente
 *              data:
 *                  type: object
 *                  description: Respuesta cruda de Stripe (lista paginada)
 *
 *      SuccessCardTokenResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *                  example: true
 *              message:
 *                  type: string
 *                  example: Tarjeta tokenizada correctamente
 *              data:
 *                  $ref: '#/components/schemas/CardTokenItem'
 *
 *      SuccessCardAssignResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *                  example: true
 *              message:
 *                  type: string
 *                  example: Tarjeta añadida con éxito
 *              data:
 *                  $ref: '#/components/schemas/CardAssignItem'
 *
 *      SuccessDeleteResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *                  example: true
 *              message:
 *                  type: string
 *                  example: Usuario eliminado con éxito
 *              data:
 *                  $ref: '#/components/schemas/DeleteItem'
 *
 *      SuccessGenericStripeResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *                  example: true
 *              message:
 *                  type: string
 *              data:
 *                  type: object
 *                  description: Objeto devuelto por Stripe
 *
 *      WebhookSuccessResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: boolean
 *                  example: true
 *              message:
 *                  type: string
 *                  example: Webhook recibido correctamente
 *              data:
 *                  type: object
 *                  properties:
 *                      received:
 *                          type: boolean
 *                          example: true
 *                      type:
 *                          type: string
 *                          example: payment_intent.succeeded
 */

/**
 * @swagger
 * /api/customers/create:
 *  post:
 *      summary: Crear cliente en Stripe
 *      tags: [Customers]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CustomerCreateRequest'
 *      responses:
 *          201:
 *              description: Cliente creado correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessCustomerResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/customers/update:
 *  put:
 *      summary: Actualizar cliente en Stripe
 *      tags: [Customers]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CustomerUpdateRequest'
 *      responses:
 *          200:
 *              description: Cliente actualizado correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessCustomerResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/customers/delete:
 *  delete:
 *      summary: Eliminar cliente en Stripe
 *      tags: [Customers]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CustomerDeleteRequest'
 *      responses:
 *          200:
 *              description: Cliente eliminado correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessDeleteResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/customers/{id}:
 *  get:
 *      summary: Obtener cliente por ID
 *      tags: [Customers]
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *          type: string
 *      responses:
 *          200:
 *              description: Cliente obtenido correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessGenericStripeResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          404:
 *              description: Cliente no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/customers:
 *  get:
 *      summary: Listar clientes
 *      tags: [Customers]
 *      responses:
 *          200:
 *              description: Clientes listados correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessListResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
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
 *                      $ref: '#/components/schemas/CardCreateRequest'
 *      responses:
 *          201:
 *              description: Tarjeta tokenizada correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessCardTokenResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/cards/assign:
 *  post:
 *      summary: Asignar tarjeta a un cliente
 *      tags: [Cards]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CardAssignRequest'
 *      responses:
 *          200:
 *              description: Tarjeta añadida correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessCardAssignResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/cards/default:
 *  post:
 *      summary: Definir tarjeta por defecto de un cliente
 *      tags: [Cards]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CardDefaultRequest'
 *      responses:
 *          200:
 *              description: Método de pago actualizado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessGenericStripeResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/cards/{id}:
 *  get:
 *      summary: Listar tarjetas por customer ID
 *      tags: [Cards]
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *          type: string
 *      responses:
 *          200:
 *              description: Tarjetas listadas correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessGenericStripeResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          404:
 *              description: Cliente no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/payments/create:
 *  post:
 *      summary: Crear intento de pago
 *      tags: [Payments]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PaymentCreateRequest'
 *      responses:
 *          201:
 *              description: Intento de pago creado correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessGenericStripeResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          402:
 *              description: Error de pago/tarjeta
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/payments:
 *  get:
 *      summary: Listar PaymentIntents por usuario
 *      tags: [Payments]
 *      parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *          type: string
 *         description: ID del customer en Stripe (cus_...)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *          type: integer
 *         description: Cantidad de registros (máximo 100)
 *      responses:
 *          200:
 *              description: Pagos obtenidos correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessGenericStripeResponse'
 *          400:
 *              description: userId faltante o inválido
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/payments/{paymentIntentId}:
 *  get:
 *      summary: Obtener un PaymentIntent por ID
 *      tags: [Payments]
 *      parameters:
 *       - in: path
 *         name: paymentIntentId
 *         required: true
 *         schema:
 *          type: string
 *      responses:
 *          200:
 *              description: Pago obtenido correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessGenericStripeResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          404:
 *              description: Pago no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/payments/confirm:
 *  post:
 *      summary: Confirmar intento de pago
 *      tags: [Payments]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PaymentConfirmRequest'
 *      responses:
 *          200:
 *              description: Pago confirmado correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessGenericStripeResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          402:
 *              description: Error de pago/tarjeta
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/payments/refund:
 *  post:
 *      summary: Crear reembolso de pago
 *      tags: [Payments]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PaymentRefundRequest'
 *      responses:
 *          201:
 *              description: Reembolso creado correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessGenericStripeResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          404:
 *              description: Pago o cargo no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/payments/refund/payment-intent/{paymentIntentId}:
 *  get:
 *      summary: Listar reembolsos por PaymentIntent
 *      tags: [Payments]
 *      parameters:
 *       - in: path
 *         name: paymentIntentId
 *         required: true
 *         schema:
 *          type: string
 *      responses:
 *          200:
 *              description: Reembolsos obtenidos correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessGenericStripeResponse'
 *          400:
 *              description: Datos inválidos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *
 * /api/webhooks/stripe:
 *  post:
 *      summary: Recibir eventos de Stripe Webhooks
 *      tags: [Webhooks]
 *      description: Endpoint para eventos firmados por Stripe. Requiere cabecera stripe-signature.
 *      responses:
 *          200:
 *              description: Webhook recibido y procesado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/WebhookSuccessResponse'
 *          400:
 *              description: Firma inválida o faltante
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 *          500:
 *              description: Falta configuración del webhook secret
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiErrorResponse'
 */
