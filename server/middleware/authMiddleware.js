import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  // verify authorisation
  const { authorisation } = req.headers;

  if (!authorisation) {
    return res.status(401).json({ error: "Authorisation token required" });
  }

  // "BEARER <JWT>"
  const token = authorisation.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET); // returns payload

    req.user = await User.findOne({ _id }).select("_id"); // returns id only

    next();
  } catch (error) {
    res.status(401).json({ error: "Request not authorised" });
  }
};

export { protect };
