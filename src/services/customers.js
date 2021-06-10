export const STATES = {
  no: 'no',
  limited: 'limited',
  unlimited: 'unlimited',
  forbid: 'forbid',
};

export const LABELS = {
  no: 'Nėra',
  limited: 'Terminuota',
  unlimited: 'Sutinka',
  forbid: 'Nesutinka',
};


export function modelToState(model) {
  if (!model) {
    return STATES.no;
  }
  if (model.isAgreed === false) {
    return STATES.forbid;
  }
  if (model.expiryDate) {
    return STATES.limited;
  }
  return STATES.unlimited;
}

export function stateToModel(state, expiryDate) {
  switch (state) {
    case STATES.forbid:
      return { isAgreed: false };
    case STATES.unlimited:
      return { isAgreed: true };
    case STATES.limited:
      return {
        isAgreed: true,
        expiryDate: expiryDate || null,
      };
    default:
      return null;
  }
}
