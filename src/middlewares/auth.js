const adminAuth = (req, res, next) => {
  console.log("Authenticating Admin");
  const token = "xyzabc";
  const isAdmin = token === "xyz";
  if (!isAdmin) {
    res.status(401).send("Not an admin");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Authenticating User");
  const token = "xyz";
  const isUser = token === "xyz";
  if (!isUser) {
    res.status(401).send("Not an User");
  } else {
    next();
  }
};

export { adminAuth, userAuth };
