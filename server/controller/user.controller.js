const User = require("../models/user.model");

const test = (req, res) => {
  res.json({ message: "test" });
};
const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: "You can't update your account" });
  }
  try {
    if (req.body.password) {
      req.body.password = bcyrptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async () => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: "You can't delete your account" });
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { test, updateUser, deleteUser };
