module.exports = async (policyContext, config, { strapi }) => {
  const requesterId = policyContext.state.user.id; // Nous récupérons l'id de la personne qui fait la requête
  if (policyContext.request.params.id) {
    const offerId = policyContext.request.params.id; // Nous récupérons l'id du restaurant à supprimer dans les params
    const offer = await strapi.entityService.findOne(
      "api::offer.offer",
      offerId,
      {
        populate: ["owner"],
      }
    ); // Nous allons chercher le restaurant en questions et nous déployons sa clef owner
    if (requesterId === offer.owner.id) {
      // Si l'id de la personne qui fait la requête est différent de l'id du propriétaire, nous renvoyons une erreur
      return true;
    } else {
      // Sinon nous passons au controller de la route
      return false;
    }
  } else {
    console.log(policyContext.request.body);
    const ownerId = JSON.parse(policyContext.request.body.data).owner;
    console.log(ownerId);
    if (requesterId !== ownerId) {
      return false;
    } else {
      return true;
    }
  }
};
