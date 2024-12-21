const Package = require("../models/Package");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
//*Create package
const createPackage = async (req, res) => {
  const packageData = req.body;
  const package = await Package.create(packageData);
  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", data: { package } });
};

//*Get all packages
const getAllPackages = async (req, res) => {
  let packages = await Package.find({});

  if (req.user.role != "admin") {
    packages = packages.filter((package) => package.available);
  }

  res
    .status(StatusCodes.OK)
    .json({ status: "success", data: { packages, count: packages.length } });
};

//*Get single package
const getSinglePackage = async (req, res) => {
  const { id: packageId } = req.params;

  let package = await Package.findOne({ _id: packageId });

  if (!package) {
    throw new NotFoundError(`No product with id : ${packageId}`);
  }

  res.status(StatusCodes.OK).json({ status: "success", data: { package } });
};

const updatePackage = async (req, res) => {
  const { id: packageId } = req.params;
  const { available } = req.body;

  if (!packageId || !available) {
    throw new BadRequestError("Please provide availability");
  }

  const package = await Package.findOne({ _id: packageId });

  if (!package) {
    throw new NotFoundError(`No product with id : ${packageId}`);
  }

  package.available = available;
  await package.save();

  res.status(StatusCodes.OK).json({ status: "success", data: { package } });
};

module.exports = {
  createPackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
};
