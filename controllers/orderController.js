import Order from '../models/order.js';

export const createOrder = async (req, res) => {
  try {
    const { orderId, email, orderedItems, paymentId, status, name, address, phone } = req.body;

    const existingOrder = await Order.findOne({ orderId });
    if (existingOrder) {
      return res.status(400).json({ message: 'Order with this ID already exists' });
    }

    const newOrder = new Order({
      orderId,
      email,
      orderedItems,
      paymentId,
      status,
      name,
      address,
      phone,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.orderId) {
      const existingOrder = await Order.findOne({ orderId: updateData.orderId });
      if (existingOrder && existingOrder._id.toString() !== id) {
        return res.status(400).json({ message: 'Order with this ID already exists' });
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};