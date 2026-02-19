const profileEditValidations = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "email",
    "age",
    "gender",
    "description",
    "PhotoURL",
    "skills",
  ];

  const isAllowed = Object.keys(req).every((key) =>
    allowedFields.includes(key),
  );
  if (!isAllowed) {
    throw new Error("Invalid update fields");
  } else {
    return isAllowed;
  }
};

export default profileEditValidations;
