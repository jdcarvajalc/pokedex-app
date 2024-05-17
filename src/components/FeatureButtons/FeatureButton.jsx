import { buttonStyles } from "../../utils/featureButtonStyles";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalStyle } from "../../utils/modalStyles";

const FeatureButton = (props) => {
    // destructuring the props object
    const { buttonType, ModalContent, selectedElement } = props;

    const appliedStyles = buttonStyles[buttonType];
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    switch (buttonType) {
        case "stats":
            return (
                <>
                    <button onClick={handleOpen} style={appliedStyles}>
                        Estadísticas
                    </button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            {
                                <ModalContent
                                    setOpen={setOpen}
                                    selectedElement={selectedElement}
                                />
                            }
                        </Box>
                    </Modal>
                </>
            );

        case "types":
            return (
                <>
                    <button onClick={handleOpen} style={appliedStyles}>
                        Tipos
                    </button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            {
                                <ModalContent
                                    setOpen={setOpen}
                                    selectedElement={selectedElement}
                                />
                            }
                        </Box>
                    </Modal>
                </>
            );
        default:
            break;
    }
};

export default FeatureButton;
