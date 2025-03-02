import Payment from '../models/payment.js';
import Order from '../models/order.js';

export const createPayment = async (req, res) => {
  try {
    const { user, order, paymentMethod, amount, transactionId } = req.body;

    const existingOrder = await Order.findById(order);
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const newPayment = new Payment({
      user,
      order,
      paymentMethod,
      amount,
      transactionId,
    });

    await newPayment.save();

    existingOrder.status = 'Paid';
    await existingOrder.save();

    res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('user', 'firstName lastName').populate('order', 'orderId');
    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id).populate('user', 'firstName lastName').populate('order', 'orderId');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment status updated successfully', payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};