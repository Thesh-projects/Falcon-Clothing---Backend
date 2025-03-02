import Shipping from '../models/shipping.js';
import Order from '../models/order.js';


export const createShipping = async (req, res) => {
  try {
    const { order, address, shippingMethod, trackingNumber } = req.body;

    const existingOrder = await Order.findById(order);
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const existingShipping = await Shipping.findOne({ order });
    if (existingShipping) {
      return res.status(400).json({ message: 'Shipping record already exists for this order' });
    }

    const newShipping = new Shipping({
      order,
      address,
      shippingMethod,
      trackingNumber,
    });

    await newShipping.save();

    existingOrder.status = 'Shipped';
    await existingOrder.save();

    res.status(201).json({ message: 'Shipping record created successfully', shipping: newShipping });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const getShippings = async (req, res) => {
  try {
    const shippings = await Shipping.find().populate('order', 'orderId');
    res.status(200).json({ shippings });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const getShippingById = async (req, res) => {
  try {
    const { id } = req.params;

    const shipping = await Shipping.findById(id).populate('order', 'orderId');
    if (!shipping) {
      return res.status(404).json({ message: 'Shipping record not found' });
    }

    res.status(200).json({ shipping });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const updateShipping = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedShipping = await Shipping.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedShipping) {
      return res.status(404).json({ message: 'Shipping record not found' });
    }

    res.status(200).json({ message: 'Shipping record updated successfully', shipping: updatedShipping });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const deleteShipping = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedShipping = await Shipping.findByIdAndDelete(id);

    if (!deletedShipping) {
      return res.status(404).json({ message: 'Shipping record not found' });
    }

    res.status(200).json({ message: 'Shipping record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};