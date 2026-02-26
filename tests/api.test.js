import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import request from 'supertest';

const stripeMock = {
  customers: {
    create: jest.fn(),
    update: jest.fn(),
    del: jest.fn(),
    retrieve: jest.fn(),
    list: jest.fn(),
    createSource: jest.fn(),
    listSources: jest.fn(),
  },
  paymentIntents: {
    create: jest.fn(),
    confirm: jest.fn(),
    list: jest.fn(),
    retrieve: jest.fn(),
  },
  refunds: {
    create: jest.fn(),
    list: jest.fn(),
  },
  tokens: {
    create: jest.fn(),
  },
  webhooks: {
    constructEvent: jest.fn(),
  },
};

jest.unstable_mockModule('../src/config/stripe.js', () => ({
  default: stripeMock,
}));

const { default: app } = await import('../src/api/index.js');

describe('Stripe API tests (mocked)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/customers/create creates a customer', async () => {
    stripeMock.customers.create.mockResolvedValue({
      id: 'cus_test_123',
      email: 'test@mail.com',
      name: 'Test User',
      phone: '999999999',
    });

    const response = await request(app)
      .post('/api/customers/create')
      .send({ email: 'test@mail.com', name: 'Test User', phone: '999999999' });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.data.id).toBe('cus_test_123');
  });

  test('GET /api/customers returns customers list', async () => {
    stripeMock.customers.list.mockResolvedValue({
      object: 'list',
      data: [{ id: 'cus_test_1' }, { id: 'cus_test_2' }],
      has_more: false,
      url: '/v1/customers',
    });

    const response = await request(app).get('/api/customers');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.data).toHaveLength(2);
  });

  test('GET /api/customers/:id returns one customer', async () => {
    stripeMock.customers.retrieve.mockResolvedValue({ id: 'cus_test_123' });

    const response = await request(app).get('/api/customers/cus_test_123');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.id).toBe('cus_test_123');
  });

  test('PUT /api/customers/update updates customer', async () => {
    stripeMock.customers.update.mockResolvedValue({
      id: 'cus_test_123',
      email: 'updated@mail.com',
      name: 'Updated User',
      phone: '988888888',
    });

    const response = await request(app)
      .put('/api/customers/update')
      .send({
        userId: 'cus_test_123',
        email: 'updated@mail.com',
        name: 'Updated User',
        phone: '988888888',
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.id).toBe('cus_test_123');
  });

  test('DELETE /api/customers/delete deletes customer', async () => {
    stripeMock.customers.del.mockResolvedValue({ id: 'cus_test_123', deleted: true });

    const response = await request(app)
      .delete('/api/customers/delete')
      .send({ userId: 'cus_test_123' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.id).toBe('cus_test_123');
  });

  test('POST /api/cards/create tokenizes card', async () => {
    stripeMock.tokens.create.mockResolvedValue({
      id: 'tok_test_123',
      card: {
        id: 'card_test_123',
        brand: 'visa',
        last4: '4242',
      },
    });

    const response = await request(app)
      .post('/api/cards/create')
      .send({
        number: '4242424242424242',
        exp_month: '12',
        exp_year: '2030',
        cvc: '123',
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.data.token_id).toBe('tok_test_123');
  });

  test('POST /api/cards/assign assigns card to customer', async () => {
    stripeMock.customers.createSource.mockResolvedValue({
      id: 'card_test_123',
      brand: 'visa',
      last4: '4242',
    });

    const response = await request(app)
      .post('/api/cards/assign')
      .send({ userId: 'cus_test_123', source: 'tok_test_123' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.cardId).toBe('card_test_123');
  });

  test('POST /api/cards/default updates default source', async () => {
    stripeMock.customers.update.mockResolvedValue({
      id: 'cus_test_123',
      default_source: 'card_test_123',
    });

    const response = await request(app)
      .post('/api/cards/default')
      .send({ userId: 'cus_test_123', default_source: 'card_test_123' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.id).toBe('cus_test_123');
  });

  test('GET /api/cards/:id lists customer cards', async () => {
    stripeMock.customers.listSources.mockResolvedValue({
      object: 'list',
      data: [{ id: 'card_1' }, { id: 'card_2' }],
      has_more: false,
      url: '/v1/customers/cus_test_123/sources',
    });

    const response = await request(app).get('/api/cards/cus_test_123');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toHaveLength(2);
  });

  test('POST /api/payments/create creates payment intent and converts amount to cents', async () => {
    stripeMock.paymentIntents.create.mockResolvedValue({
      id: 'pi_test_123',
      object: 'payment_intent',
      amount: 1500,
      customer: 'cus_test_123',
    });

    const response = await request(app)
      .post('/api/payments/create')
      .send({
        customer_id: 'cus_test_123',
        amount: 15,
        payment_method: 'pm_card_visa',
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.data.id).toBe('pi_test_123');
    expect(stripeMock.paymentIntents.create).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 1500,
        customer: 'cus_test_123',
      })
    );
  });

  test('POST /api/payments/refund returns 400 if chargeId is missing', async () => {
    const response = await request(app)
      .post('/api/payments/refund')
      .send({ amount: 10 });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toMatch(/chargeId/i);
  });

  test('GET /api/payments requires userId query param', async () => {
    const response = await request(app).get('/api/payments');

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toMatch(/userId/i);
  });

  test('GET /api/payments with userId lists payment intents', async () => {
    stripeMock.paymentIntents.list.mockResolvedValue({
      object: 'list',
      data: [{ id: 'pi_test_1' }, { id: 'pi_test_2' }],
      has_more: false,
      url: '/v1/payment_intents',
    });

    const response = await request(app).get('/api/payments?userId=cus_test_123&limit=2');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.data).toHaveLength(2);
    expect(stripeMock.paymentIntents.list).toHaveBeenCalledWith(
      expect.objectContaining({
        customer: 'cus_test_123',
        limit: 2,
      })
    );
  });

  test('GET /api/payments/:paymentIntentId returns one payment intent', async () => {
    stripeMock.paymentIntents.retrieve.mockResolvedValue({
      id: 'pi_test_123',
      object: 'payment_intent',
    });

    const response = await request(app).get('/api/payments/pi_test_123');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.id).toBe('pi_test_123');
  });

  test('POST /api/payments/confirm confirms payment intent', async () => {
    stripeMock.paymentIntents.confirm.mockResolvedValue({
      id: 'pi_test_123',
      status: 'succeeded',
    });

    const response = await request(app)
      .post('/api/payments/confirm')
      .send({ paymentId: 'pi_test_123' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.id).toBe('pi_test_123');
  });

  test('POST /api/payments/refund creates refund by charge', async () => {
    stripeMock.refunds.create.mockResolvedValue({
      id: 're_test_123',
      object: 'refund',
      charge: 'ch_test_123',
    });

    const response = await request(app)
      .post('/api/payments/refund')
      .send({ chargeId: 'ch_test_123', amount: 12.5, reason: 'requested_by_customer' });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.data.id).toBe('re_test_123');
    expect(stripeMock.refunds.create).toHaveBeenCalledWith(
      expect.objectContaining({
        charge: 'ch_test_123',
        amount: 1250,
      })
    );
  });

  test('GET /api/payments/refund/payment-intent/:paymentIntentId lists refunds', async () => {
    stripeMock.refunds.list.mockResolvedValue({
      object: 'list',
      data: [{ id: 're_1' }, { id: 're_2' }],
      has_more: false,
      url: '/v1/refunds',
    });

    const response = await request(app).get('/api/payments/refund/payment-intent/pi_test_123');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.data).toHaveLength(2);
    expect(stripeMock.refunds.list).toHaveBeenCalledWith(
      expect.objectContaining({ payment_intent: 'pi_test_123' })
    );
  });

  test('POST /api/webhooks/stripe returns 400 if stripe-signature header is missing', async () => {
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_secret';

    const response = await request(app)
      .post('/api/webhooks/stripe')
      .set('Content-Type', 'application/json')
      .send({ id: 'evt_test_123' });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toMatch(/stripe-signature/i);
  });

  test('POST /api/webhooks/stripe processes valid signed event', async () => {
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_secret';
    stripeMock.webhooks.constructEvent.mockReturnValue({
      type: 'refund.created',
      data: {
        object: { id: 're_test_123' },
      },
    });

    const response = await request(app)
      .post('/api/webhooks/stripe')
      .set('stripe-signature', 'sig_test_123')
      .set('Content-Type', 'application/json')
      .send('{"id":"evt_test_123"}');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.type).toBe('refund.created');
  });
});
