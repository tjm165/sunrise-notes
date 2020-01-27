import React, { useEffect } from "react";

import { Modal } from "semantic-ui-react";

export default function MyModal({ functions, onClose, ...rest }) {
  useEffect(() => {
    functions.setModalState(true);
    return () => functions.setModalState(false);
  });

  return <Modal onClose={onClose} {...rest} />;
}
