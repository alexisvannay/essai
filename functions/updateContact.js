exports.handler = async (event) => {
  try {
    const { email, phone } = JSON.parse(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Contact mis à jour", email, phone })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur de mise à jour" })
    };
  }
};