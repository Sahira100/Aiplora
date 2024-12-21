const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Package = require("../models/Package");
const { checkPermissions } = require("../utils");
const Order = require("../models/Order");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  /*
  {
    items:[
      {
        packageId:sfjakjf23423fdlfkdsj
        quantity:2
      }
    ]
    ..others
  }
  */

  const { items: orderPackages } = req.body;

  if (!orderPackages || orderPackages.length < 1) {
    throw new BadRequestError("No packages provided");
  }

  let packages = [];
  let total = 0;

  for (const item of orderPackages) {
    const dbPackage = await Package.findOne({ _id: item.packageId });

    if (!dbPackage) {
      throw new NotFoundError(`No package with id: ${item.packageId}`);
    }

    if (!dbPackage.available) {
      throw new NotFoundError(
        `Package with id:${item.packageId} is not available`
      );
    }

    const orderPackage = {
      packageId: dbPackage._id,
      quantity: item.quantity,
      credits: dbPackage.credits,
      validDays: dbPackage.validDays,
      price: dbPackage.price,
    };

    packages = [...packages, orderPackage];

    total += dbPackage.price;
  }

  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    user: req.user.userId,
    total,
    packages,
    clientSecret: paymentIntent.client_secret,
  });

  res.status(StatusCodes.CREATED).json({ status: "success", data: { order } });
};

//*---------UNDER CONSTRUCTION-----------------
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    throw new BadRequestError("Please Provide paymentId");
  }

  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`);
  }

  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.purchaseDate = Date.now();
  order.status = "completed";
  await order.save();

  res.status(StatusCodes.OK).json({ status: "success", data: { order } });
};

module.exports = {
  createOrder,
  updateOrder,
};
