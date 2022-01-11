const { PrismaClient } = require("@prisma/client");
const { createHash } = require("crypto");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const prisma = new PrismaClient();

const create = async (req, res) => {
  try {
    const password = createHash("sha512", req.body.password).digest("hex");
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password,
      },
    });

    user.password = undefined;

    res.status(StatusCodes.CREATED).json(user);
    console.log(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(StatusCodes.BAD_REQUEST);
  } finally {
    await prisma.$disconnect();
  }
};

const deleteById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    //si existe
    await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    console.log(error);

    res.sendStatus(StatusCodes.BAD_REQUEST);
  } finally {
    await prisma.$disconnect();
  }
};

const getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(StatusCodes.ACCEPTED).json(users);
    console.log(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(StatusCodes.BAD_REQUEST);
  } finally {
    await prisma.$disconnect();
  }
};

const getById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.ACCEPTED).json(user);
    console.log(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(StatusCodes.BAD_REQUEST);
  } finally {
    await prisma.$disconnect();
  }
};

//funcion que retorna una promesa de prisma
function getUserById(id) {
  return prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
}

const update = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    const userUpdate = await prisma.user.update({
      where: {
        id: req.param.id,
      },
      data: {
        ...req.body,
      },
    });

    res.status(StatusCodes.OK).json(userUpdate);
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
};

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  update,
};
